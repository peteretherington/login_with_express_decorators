import 'reflect-metadata';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { AppRouter } from '../../AppRouter';
import { Methods } from './methods';
import { Metadata } from './metadata';

export function controller(routePrefix: string) {
  return function (target: any): void {
    const router = AppRouter.getInstance();

    for (const key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(Metadata.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        Metadata.method,
        target.prototype,
        key,
      );
      const middlewares =
        Reflect.getMetadata(Metadata.middleware, target.prototype, key) || [];
      const requestBodyProps =
        Reflect.getMetadata(Metadata.validator, target.prototype, key) || [];

      const validator = bodyValidators(requestBodyProps);

      if (path && method) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler,
        );
      }
    }
  };
}

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request. Missing body');
      return;
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res
          .status(422)
          .send(`Invalid request. Missing "${key}" on request body.`);
        return;
      }
    }

    next();
  };
}
