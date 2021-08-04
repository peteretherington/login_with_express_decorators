import 'reflect-metadata';

import { Metadata } from './metadata';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string): void {
    Reflect.defineMetadata(Metadata.validator, keys, target, key);
  };
}
