// Copyright 2022 itte.dev. All rights reserved. MIT license.
// This module is browser compatible.
import { Component } from './types.ts'
import { VirtualTree, LinkedVirtualTree } from '../virtual_dom/types.ts'
import { Variables } from '../template_engine/types.ts'
import { reach } from '../data_binding/reach.ts'
import { unwatch } from '../data_binding/unwatch.ts'
import { evaluate } from '../template_engine/evaluate.ts'
import { patch } from '../virtual_dom/patch.ts'
import { builtin } from './builtin.ts'

export class Entity {
  private _stack?: Variables | null
  private _component: Component
  private _host: Element
  private _tree: LinkedVirtualTree
  private _props: Record<string, unknown> = {}
  private _constructor: Promise<void>
  
  constructor( component: Component, host: Element, tree: LinkedVirtualTree ) {
    this._component = component
    this._host = host
    this._tree = tree as LinkedVirtualTree
    this._patch = this._patch.bind(this)
    // this._on = this._on.bind(this)
    // this._off = this._off.bind(this)

    const data = typeof this._component.data === 'function' ? this._component.data(this) : this._component.data;
    this._constructor = (async () => {
      const result = await data
      const stack = result ? Array.isArray(result) ? result : [result] : []
      this._stack = [builtin, this._props, ...stack]
      reach(stack, this._patch)
      this._patch()
      stack.forEach(data => {
        if (typeof data === 'object' && data !== null) {
          for (const name in data) {
            if (
              typeof data[name] === 'function' && // The value is function
              isNaN(name as unknown as number) && // The name is not number
              !(name in this._host) // Do not override same property name
            ) {
              // deno-lint-ignore ban-types
              const method = (data[name] as Function).bind(this)
              Object.defineProperty(this._host, name, {
                get () { return method }
              })
            }
          }
        }
      })
    })().then()
  }

  setProp(name: string, value: unknown) {
    // console.log('setProp:', name, value)
    switch (name) {
      case 'is': case 'class': case 'part': case 'style': return
      default: {
        const old = this._props[name]
        if (old !== value) {
          unwatch(old, this._patch)
          this._props[name] = value
          reach(this._props[name], this._patch)
          this._patch()
        }
      }
    }
  }

  _unwatch() {
    unwatch(this._stack, this._patch)
  }

  get component(): Component { return this._component }
  get host(): Element { return this._host }
  get root(): ShadowRoot { return this._tree.node as ShadowRoot }
  get props(): Record<string, unknown> { return this._props }
  get patch() { return this._patch }
  // get on() { return this._on }
  // get off() { return this._off }
  get whenConstructed() {
    return (): Promise<void> | null => this._constructor
  }

  private _patch (): void {
    if (this._stack && this._tree && this._component.template) {
      // patch(this._tree, evaluate(this._component.template, this.stack) as VirtualTree)
      const tree = evaluate(this._component.template, this._stack) as VirtualTree
      patch(this._tree, tree)
    }
  }

  // private _on(type: string, listener: EventListener): void
  // private _on(type: string, listener: EventListener, options: EventListenerOptions): void
  // private _on(type: string, listener: EventListener, useCapture: boolean): void
  // private _on(type: string, listener: (e: CustomEvent) => void): void
  // private _on(type: string, listener: (e: CustomEvent) => void, useCapture: boolean): void
  // private _on(type: string, listener: (e: CustomEvent) => void, options: EventListenerOptions): void
  // private _on(type: string, listener: EventListener | ((e: CustomEvent) => void), options: boolean | EventListenerOptions = false): void {
  //   this._host.addEventListener(type, listener as EventListener, options)
  // }

  // private _off(type: string, listener: EventListener): void
  // private _off(type: string, listener: EventListener, options: EventListenerOptions): void
  // private _off(type: string, listener: EventListener, useCapture: boolean): void
  // private _off(type: string, listener: (e: CustomEvent) => void): void
  // private _off(type: string, listener: (e: CustomEvent) => void, useCapture: boolean): void
  // private _off(type: string, listener: (e: CustomEvent) => void, options: EventListenerOptions): void
  // private _off(type: string, listener: EventListener | ((e: CustomEvent) => void), options: boolean | EventListenerOptions = false): void {
  //   this._host.removeEventListener(type, listener as EventListener, options)
  // }
}
