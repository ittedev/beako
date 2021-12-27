// Copyright 2021 itte.dev. All rights reserved. MIT license.
// This module is browser compatible.
import { BearkoObject } from './types.ts'
import { invade } from './invade.ts'

export async function receive(obj: BearkoObject, key: string | string[]): Promise<Record<string, unknown>> {
  const keys = Array.isArray(key) ? key : [key]
  const values = await Promise.all(keys.map(key => {
    if (obj[key] === undefined) {
      return new Promise(resolve => {
        invade(obj, key, ['bom', resolve])
      })
    } else {
      return obj[key]
    }
  }))
  return keys.reduce((obj, key, index) => {
    obj[key] = values[index]
    return obj
  }, {} as Record<string, unknown>)
  // return Object.fromEntries(keys.map((key, index) => [key, values[index]]))
}
