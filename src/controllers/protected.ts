import { NextFunction, Request, Response } from 'express';

import { controller, get, use } from './decorators';
import { ROOT } from './routes';

@controller('')
export class RootController {
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send(`
      <div>
        <h1>Protected</h1>
        <p>Only Jimmy Heaters can see this.</p>
        <a href="${ROOT}">Home</a>
      </div>
    `);
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send(`
    <div>
      <p>Not permitted.</p>
    </div>
  `);
}
