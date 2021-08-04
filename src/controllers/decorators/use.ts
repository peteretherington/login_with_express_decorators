import 'reflect-metadata';
import { RequestHandler } from 'express';

import { Metadata } from './metadata';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string): void {
    const middlewares =
      Reflect.getMetadata(Metadata.middleware, target, key) || [];
    Reflect.defineMetadata(
      Metadata.middleware,
      [...middlewares, middleware],
      target,
      key,
    );
  };
}
