// deno-lint-ignore-file no-explicit-any
import type { VirtualTree } from '../virtual_dom/types.ts'
import type {
  Variables,
  TreeTemplate,
  CustomElementTemplate,
  Cache
} from '../template_engine/types.ts'
import { Entity } from './entity.ts'

export const special = Symbol.for('Beako Special')

export type Patcher = (stack: Variables) => VirtualTree

export interface ComponentTemplate extends CustomElementTemplate {
  isForce?: boolean // Evaluate as an component without verifying whether it is a component
  cache?: string | Component | unknown
}

export type Main = (entity: Entity) => Variables | Record<string, unknown> | void | Promise<Variables | Record<string, unknown> | void>

export interface ComponentOptions {
  mode?: ShadowRootMode
  delegatesFocus?: boolean
  localeOnly?: boolean
}

export interface Component {
  patcher?: Patcher
  template?: TreeTemplate
  data: Main | Variables
  options: {
    mode: ShadowRootMode
    delegatesFocus?: boolean
    localeOnly?: boolean
  }
}

export function instanceOfComponent(object: any): object is Component {
  return typeof object === 'object' &&
    object !== null &&
    (object.template || object.patcher) &&
    object.data &&
    object.options
}

export interface SpecialCache extends Cache {
  [special]: Array<Element | DocumentFragment | ShadowRoot | EventTarget>
}

export type Module = {
  [Symbol.toStringTag]: 'Module'
  default?: unknown
  [attr: string]: unknown
}

export function instanceOfModule(object: any): object is Module {
  return  typeof object === 'object' &&
    object !== null &&
    'default' in object &&
    (object as Module)[Symbol.toStringTag] === 'Module'
}
