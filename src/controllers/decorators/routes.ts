import 'reflect-metadata';
import { RequestHandler } from 'express';

import { Methods } from './methods';
import { Metadata } from './metadata';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(Metadata.path, path, target, key);
      Reflect.defineMetadata(Metadata.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
