// Copyright 2022 itte.dev. All rights reserved. MIT license.
// This module is browser compatible.
import { Variables, TreeTemplate, CustomElementTemplate, Cache } from '../template_engine/types.ts'
import { Entity } from './entity.ts'

export const special = Symbol('Beako-special')

export interface ComponentTemplate extends CustomElementTemplate {
  isForce?: boolean // Evaluate as an component without verifying whether it is a component
  cache?: string | Component
}

export type ComponentConstructor = (entity: Entity) => Variables | Record<string, unknown> | void | Promise<Variables | Record<string, unknown> | void>

export interface ComponentOptions {
  mode?: ShadowRootMode
  delegatesFocus?: boolean
  localeOnly?: boolean
}

export interface Component {
  template: TreeTemplate
  data: ComponentConstructor | Variables
  options: {
    mode: ShadowRootMode
    delegatesFocus?: boolean
    localeOnly?: boolean
  }
}

// deno-lint-ignore no-explicit-any
export function instanceOfComponent(object: any): object is Component {
  return typeof object === 'object' && object.template && object.data && object.options
}

export interface SpecialCache extends Cache {
  [special]: {
    host: Element,
    root: ShadowRoot
  }
}