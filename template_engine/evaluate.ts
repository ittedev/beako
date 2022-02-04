// Copyright 2022 itte.dev. All rights reserved. MIT license.
// This module is browser compatible.
import {
  RealElement,
  VirtualElement,
  VirtualTree
} from '../virtual_dom/types.ts'
import {
  isRef,
  Variables,
  Template,
  instanceOfTemplate,
  LiteralTemplate,
  ArrayTemplate,
  ObjectTemplate,
  VariableTemplate,
  UnaryTemplate,
  BinaryTemplate,
  AssignTemplate,
  FunctionTemplate,
  HashTemplate,
  GetTemplate,
  DrawTemplate,
  JoinTemplate,
  FlagsTemplate,
  IfTemplate,
  ForTemplate,
  ElementTemplate,
  HasChildrenTemplate,
  TreeTemplate,
  GroupTemplate,
  HandlerTemplate,
  FlatTemplate,
  Cache,
  Ref,
  Evaluate,
  CoreTemplate,
  Evaluator
} from './types.ts'
import { Loop } from './loop.ts'
import { pickup } from './pickup.ts'

export function evaluate(template: Template, stack: Variables = [], cache: Cache = {}): unknown {
  return evaluator[template.type](template, stack, cache)
}

export const evaluator = {
  literal: (
    (template: LiteralTemplate, _stack: Variables, _cache: Cache): unknown => template.value
  ) as Evaluate,

  array: (
    (template: ArrayTemplate, stack: Variables, cache: Cache): unknown =>
      template.values.map((value: Template) => evaluate(value, stack, cache))
  ) as Evaluate,

  object: (
    (template: ObjectTemplate, stack: Variables, cache: Cache): unknown =>
    template.entries
      .map(entry => entry.map(value => evaluate(value, stack, cache)))
      .reduce((obj, [key, value]) => {
        obj[key as string | number] = value
        return obj
      }, {} as Record<string, unknown>)
    // Object.fromEntries(template.entries.map(entry => entry.map(value => evaluate(value, stack))))
  ) as Evaluate,

  variable: ((template: VariableTemplate, stack: Variables, _cache: Cache): unknown => {
    const [, index] = pickup(stack, template.name)
    if (index >= 0) {
      return { record: stack[index], key: template.name, [isRef]: true } as Ref
    }
    return undefined
  }) as Evaluate,

  unary: (
    (template: UnaryTemplate, stack: Variables, cache: Cache): unknown =>
      operateUnary(template.operator, evaluate(template.operand, stack, cache))
  ) as Evaluate,

  binary: (
    (template: BinaryTemplate, stack: Variables, cache: Cache): unknown => {
      const left = evaluate(template.left, stack, cache)
      if (noCut(template.operator, left)) {
        return operateBinary(template.operator, left, evaluate(template.right, stack, cache))
      } else {
        return left
      }
    }
  ) as Evaluate,

  assign: ((template: AssignTemplate, stack: Variables, cache: Cache): unknown => {
    const value = evaluate(template.left, stack, cache) as Ref
    if (!value) {
      throw Error(template.left ? (template.left as VariableTemplate).name : 'key' + ' is not defined')
    }

    const { record, key } = value
    const right = evaluate(template.right, stack, cache)
    if (template.operator.length > 1) {
      const operator = template.operator.slice(0, -1)
      if (noCut(operator, record[key])) {
        return record[key] = operateBinary(operator, record[key], right)
      } else {
        return record[key]
      }
    } else {
      return record[key] = right
    }
  }) as Evaluate,

  ['function']: (
    (template: FunctionTemplate, stack: Variables, cache: Cache): unknown => {
      if (template.name.type === 'get' && (template.name as GetTemplate).value.type === 'hash') {
        // method
        const value = evaluate((template.name as GetTemplate).value, stack, cache) as Ref
        if (!value) {
          throw Error(evaluate(((template.name as GetTemplate).value as HashTemplate).key, stack, cache) as string + ' is not defined')
        }
        const f = value.record[value.key]
        if (typeof f === 'function') {
          return f.apply(value.record, template.params.map(param => evaluate(param, stack, cache)))
        }
      } else {
        // other
        const f = evaluate(template.name, stack, cache)
        if (typeof f === 'function') {
          return f(...template.params.map(param => evaluate(param, stack, cache)))
        }
      }
      throw Error(template.name.toString() + ' is not a function')
    }
  ) as Evaluate,

  hash: (
    (template: HashTemplate, stack: Variables, cache: Cache): unknown => ({
      record: evaluate(template.object, stack, cache) as Record<PropertyKey, unknown>,
      key: evaluate(template.key, stack, cache) as PropertyKey,
      [isRef]: true
    } as Ref)
  ) as Evaluate,

  get: (
    (template: GetTemplate, stack: Variables, cache: Cache): unknown => {
      const value = evaluate(template.value, stack, cache) as Ref
      return value ? value.record[value.key] : value
    }
  ) as Evaluate,

  flat: (
    (template: FlatTemplate, stack: Variables, cache: Cache): unknown => {
      const values = template.values.flatMap(
          (value: Template | string) => typeof value === 'string' ? [value] : flatwrap(evaluate(value, stack, cache)) as Array<string | VirtualElement | RealElement | number>
        )
        .filter(value => value !== '')
        .reduce<Array<string | VirtualElement | RealElement | number>>((result, child) => {
          const len = result.length
          if (len && typeof child === 'string' && typeof result[len - 1] === 'string') {
            result[len - 1] += child
          } else {
            result.push(child)
          }
          return result
        }, [])

      if (values.length === 1 && typeof values[0] === 'string') {
        return values[0]
      } else {
        return values
      }
    }
  ) as Evaluate,

  draw: (
    (template: DrawTemplate, stack: Variables, cache: Cache): unknown => {
      const value = evaluate(template.value, stack, cache)
      // if (value instanceof EventTarget) { // real element
      //   const el = {
      //     el: value
      //   } as RealElement
      //   return el
      // } else
      if (typeof value === 'object') {
        if (instanceOfTemplate(value)) { // expand
          if (value.type === 'tree') {
            value.type = 'group'
            const result = evaluate(value, stack, cache)
            value.type = 'tree'
            return result
          } else {
            return evaluate(value, stack, cache)
          }
        } else {
          return JSON.stringify(value)
        }
      } else {
        return value === null || value === undefined ? '' : value + ''
      }
    }
  ) as Evaluate,

  join: (
    (template: JoinTemplate, stack: Variables, cache: Cache): string => {
      return template.values.reduce<string>((result: string, value: unknown | Template, index: number) => {
        if (instanceOfTemplate(value)) {
          const text = evaluate(value, stack, cache)
          return result + (index ? template.separator : '') + (typeof text === 'object' ? JSON.stringify(text) : text as string)
        } else {
          return result + (index ? template.separator : '') + value
        }
      }, '')
    }
  ) as Evaluate,

  flags: (
    (template: FlagsTemplate, stack: Variables, cache: Cache): Array<string> => {
      const value = evaluate(template.value, stack, cache)

      if (typeof value === 'string') {
        return value.split(/\s+/)
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return value
        } else if (value) {
          return Object.keys(value).filter(key => (value as Record<string, unknown>)[key])
        }
      }
      return []
    }) as Evaluate,

  ['if']: (
    (template: IfTemplate, stack: Variables, cache: Cache): unknown =>
      evaluate(template.condition, stack, cache) ? evaluate(template.truthy, stack, cache) : template.falsy ? evaluate(template.falsy, stack, cache) : null
    ) as Evaluate,

  for: (
    (template: ForTemplate, stack: Variables, cache: Cache): unknown => {
      const array = evaluate(template.array, stack, cache)
      let entries: Array<[unknown, unknown]>
      if (typeof array === 'object' && array !== null) {
        if (Symbol.iterator in array) {
          if ('entries' in array) {
            entries = [...(array as Array<unknown> | Set<unknown> | Map<unknown, unknown> /* or TypedArray etc */).entries()]
          } else {
            let i = 0
            entries = []
            for (const value of array as Iterable<unknown>){
              entries.push([i++, value])
            }
          }
        } else {
          entries = Object.entries(array)
        }
      } else {
        entries = [[0, array]] // or errer?
      }
      return entries.flatMap(([key, value], index) => {
        const loop = new Loop(key, value, index, entries, stack)
        const result = (flatwrap(evaluate(template.value, stack.concat([template.each ? { [template.each]: value, loop } : { loop }]), cache)) as Array<string | VirtualElement | RealElement | number>)
          .filter(child => typeof child !== 'number')
        if (typeof loop.value === 'object') {
          result
            .filter(child => typeof child === 'object')
            .forEach(child => (child as VirtualElement).key = loop.value)
        }
        return result
      })
    }
  ) as Evaluate,

  element: (
    (template: ElementTemplate, stack: Variables, cache: Cache): VirtualElement => {
      const el = evaluator.tree(template as TreeTemplate, stack, cache) as VirtualElement
      el.tag = template.tag

      if (template.is) {
        el.is = typeof template.is === 'string' ? template.is : evaluate(template.is, stack, cache) as string
      }
      evaluateProps(template, stack, cache, el)

      return el
    }
  ) as Evaluate,

  tree: (
    (template: TreeTemplate, stack: Variables, cache: Cache): VirtualTree => {
      const children = evaluateChildren(template, stack, cache)
      return children.length ? { children } : {}
    }
  ) as Evaluate,

  group: (
    (template: GroupTemplate, stack: Variables, cache: Cache): Array<unknown> => evaluateChildren(template, stack, cache)
  ) as Evaluate,

  handler: (
    (template: HandlerTemplate, stack: Variables, cache: Cache): EventListener => {
      if (!cache.handler) {
        cache.handler = new WeakMap<HandlerTemplate, Array<[Variables, EventListener]>>()
      }
      if (!cache.handler.has(template)) {
        cache.handler.set(template, [])
      }
      const thisHandlerCache = cache.handler.get(template) as Array<[Variables, EventListener]>
      for (const cache of thisHandlerCache) {
        if (compareCache(cache[0], stack)) {
          return cache[1]
        }
      }
      const handler = (event: Event) => evaluate(template.value, [...stack, { event }], cache) as void
      thisHandlerCache.push([stack, handler])
      return handler
    }
  ) as Evaluate

} as Evaluator

export function evaluateChildren(template: HasChildrenTemplate, stack: Variables, cache: Cache): Array<string | VirtualElement | RealElement | number> {
  const children = (template.children || []) as Array<Template | string>

  // Cache number
  let i = 0
  if (children.length) {
    if ((cache.groups ?? (cache.groups = [new WeakMap<Template, number>(), 0]))[0].has(template)) {
      i = cache.groups[0].get(template) as number
    } else {
      i = cache.groups[1] = cache.groups[1] + children.length
      cache.groups[0].set(template, i)
    }
  }

  const result = children
    .flatMap((child, index) => {
      if (instanceOfTemplate(child)) {
        const result = (flatwrap(evaluate(child, stack, cache)) as Array<string | VirtualElement | RealElement | number>)
        switch ((child as CoreTemplate).type) {
          case 'if': case 'for': case 'group':
            result.push(i - index)
        }
        return result
      } else {
        return [child] as Array<string | VirtualElement | RealElement | number>
      }
    })
  if (typeof result[result.length - 1] === 'number') {
    result.pop()
  }
  return result
}

export function evaluateProps(template: ElementTemplate, stack: Variables, cache: Cache, ve: VirtualElement): void {
  if (template.style) {
    ve.style = typeof template.style === 'string' ? template.style : evaluate(template.style, stack, cache) as string
  }

  if (template.bools) {
    for (const key in template.bools) {
      if (!key.startsWith('@')) { // Remove syntax attributes
        const value = template.bools[key]
        const result = typeof value === 'string' ? value : evaluate(value as Template, stack, cache)
        if (result) {
          (ve.props ?? (ve.props = {}))[key] = result
        }
      }
    }
  }

  if (template.props) {
    if (!ve.props) {
      ve.props = {}
    }
    for (const key in template.props) {
      if (!key.startsWith('@')) { // Remove syntax attributes
        const value = template.props[key]
        ve.props[key] = typeof value === 'string' ? value : evaluate(value as Template, stack, cache)
      }
    }
  }

  if (template.class) {
    template.class.forEach(value =>
      ve.class = (ve.class || []).concat(Array.isArray(value) ? value as Array<string> : evaluate(value, stack, cache) as Array<string>)
    )
  }

  if (template.part) {
    template.part.forEach(value =>
      ve.part = (ve.part || []).concat(Array.isArray(value) ? value as Array<string> : evaluate(value, stack, cache) as Array<string>)
    )
  }

  if (template.on) {
    if (!ve.on) {
      ve.on = {}
    }
    for (const type in template.on) {
      ve.on[type] = template.on[type].map(listener => evaluate(listener, stack, cache) as EventListener)
    }
  }
}

function compareCache(
  cache: Variables,
  stack: Variables,
  cacheIndex: number = cache.length - 1,
  stackIndex: number = stack.length - 1
): boolean {
  const [cacheLoop, newCacheIndex] = pickup(cache, 'loop', cacheIndex) as [Loop | undefined, number]
  const [stackLoop, newStackIndex] = pickup(stack, 'loop', stackIndex) as [Loop | undefined, number]

  if (!cacheLoop && !stackLoop) return true
  if (!cacheLoop || !stackLoop) return false

  return cacheLoop.index === stackLoop.index &&
    cacheLoop.key === stackLoop.key &&
    cacheLoop.value === stackLoop.value &&
    compareCache(cache, stack, newCacheIndex - 1,  newStackIndex - 1)
}

function flatwrap(value: unknown): Array<unknown> {
  return value === null || value === undefined ?
    [] :
    Array.isArray(value) ? value : [value]
}

// deno-lint-ignore no-explicit-any
export function operateUnary(operator: string, operand: any) {
  switch (operator) {
    case 'void': return void operand
    case 'typeof': return typeof operand
    case '+': return +operand
    case '-': return -operand
    case '~': return ~operand
    case '!': return !operand
    default: throw Error(operator + ' does not exist')
  }
}

// deno-lint-ignore no-explicit-any
export function noCut(operator: string, left: any): boolean {
  switch (operator) {
    case '&&': return !!left
    case '||': return !left
    case '??': return left === null || left === undefined
    default: return true
  }
}

// deno-lint-ignore no-explicit-any
export function operateBinary(operator: string, left: any, right: any) {
  switch (operator) {
    // Arithmetic operators
    case '+': return left + right
    case '-': return left - right
    case '/': return left / right
    case '*': return left * right
    case '%': return left % right
    case '**': return left ** right

    // Relational operators
    case 'in': return left in right
    case 'instanceof': return left instanceof right
    case '<': return left < right
    case '>': return left > right
    case '<=': return left <= right
    case '>=': return left >= right

    // Equality operators
    case '==': return left == right
    case '!=': return left != right
    case '===': return left === right
    case '!==': return left !== right

    // Bitwise shift operators
    case '<<': return left << right
    case '>>': return left >> right
    case '>>>': return left >>> right

    // Binary bitwise operators
    case '&': return left & right
    case '|': return left | right
    case '^': return left ^ right

    // Binary logical operators
    case '&&': return left && right
    case '||': return left || right
    case '??': return left ?? right

    // Other operators
    default: throw Error(operator + ' does not exist')
  }
}