// Copyright 2022 itte.dev. All rights reserved. MIT license.
// This module is browser compatible.
import {
  TemporaryNode,
  TemporaryText,
  TemporaryElement,
  Token,
  TokenField,
  TokenType,
  instanceOfTemporaryElement
} from './types.ts'
import { Lexer, unescape } from './lexer.ts'
import { isPrimitive, noClose } from './is_primitive.ts'

export function dom(html: string): TemporaryNode | undefined
export function dom(lexer: Lexer): TemporaryNode | undefined
export function dom(html: Lexer | string): TemporaryNode | undefined {
  const lexer = typeof html === 'string' ? new Lexer(html, 'html') : html
  const text = { text: lexer.skip() } as TemporaryText
  while (lexer.nextIs()) {
    if (lexer.nextIs('<!--')) {
      lexer.expand('comment', () => {
        lexer.skip()
        lexer.must('-->')
      })
      text.text += lexer.skip()
      continue
    } else {
      break
    }
  }
  if (lexer.nextIs('start')) {
    const next = el(lexer)
    if (next) {
      if (instanceOfTemporaryElement(next)) {
        text.next = next
      } else {
        text.text = (next as TemporaryText).text
        if (next.next) {
          text.next = next.next
        }
      }
    }
  }
  return text.text ? text : text.next ? text.next : undefined
}

export function el(lexer: Lexer): TemporaryNode | undefined {
  const el = { tag: (lexer.pop() as Token)[1].slice(1).toLocaleLowerCase() } as TemporaryElement
  const attrs = attr(lexer)
  if (attrs.length) {
    el.attrs = attrs
  }
  if (noClose(el.tag)) {
    if (lexer.nextIs('/')) {
      lexer.pop()
    }
    lexer.must('>')
  } else if (lexer.nextIs('/') && !isPrimitive(el.tag)) {
    lexer.pop()
    lexer.must('>')
  } else {
    lexer.must('>')
    const child = dom(lexer)
    if (child) {
      el.child = child
    }
    // Not supported: p, dt, dd, li, option, thead, tfoot, th, tr, td, rt, rp, optgroup, caption
    if (lexer.must('end')[1].slice(2) !== el.tag) {
      throw Error('End tag is required.')
    }
    lexer.must('>')
  }
  const next = dom(lexer)
  if (next) {
    el.next = next
  }
  if (el.tag === 'script') { // skip <script>
    return el.next ? el.next : el
  } else {
    return el
  }
}

function attr(lexer: Lexer): Array<[string, string, string]> {
  const attrs = [] as Array<[string, string, string]>
  lexer.expand('attr', () => {
    lexer.skip()
    while (lexer.nextIs()) {
      if (lexer.nextIs('>')) {
        break
      } else {
        const attr = new Array(3) as [string, string, string]
        if (lexer.nextIs('name')) {
          attr[0] = (lexer.pop() as Token)[1]
          if (lexer.nextIs('assign')) {
            attr[1] = (lexer.must('assign') as Token)[1]
          } else if (lexer.nextIs('name') || lexer.nextIs('>') || lexer.nextIs('/')) {
            attr[1] = '='
            attr[2] = attr[0]
          } else {
            throw Error('assign is required.')
          }
        } else {
          if (lexer.nextIs('on')) {
            attr[0] = (lexer.pop() as Token)[1]
            attr[1] = 'on'
          } else if (lexer.nextIs('@')) {
            attr[0] = (lexer.pop() as Token)[1]
            attr[1] = '@'
          } else {
            break
          }
          if (attr[0] === '@else') {
            attr[2] = attr[0]
          } else {
            const token = (lexer.must('assign') as Token)
            if (token[1] !== '=') {
              throw Error('= is required.')
            }
          }
        }
        if (attr[2] === undefined) {
          if (lexer.nextIs('"')) {
            attr[2] = string(lexer, 'double', (lexer.pop() as Token)[0])
          } else if (lexer.nextIs("'")) {
            attr[2] = string(lexer, 'single', (lexer.pop() as Token)[0])
          }
        }
        attrs.push(attr)
        lexer.skip()
      }
    }
  })
  return attrs
}

function string(lexer: Lexer, field: TokenField, type: TokenType): string {
  let text = '' as string
  lexer.expand(field, () => {
    loop: while (true) {
      text += lexer.skip()
      const token = lexer.pop() as Token
      switch (token[0]) {
        case type: break loop
        case 'return': throw Error('Newline cannot be used')
        case 'escape':
          text += unescape(token[1])
          continue
      }
    }
  })
  return text
}