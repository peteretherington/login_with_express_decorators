import { Request, Response } from 'express';

import { controller, get } from './decorators';
import { ROOT, LOGIN, LOGOUT, PROTECTED } from './routes';

@controller('')
export class RootController {
  @get(ROOT)
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
          <div>
            <h1>Home</h1>
            <p>You are logged in</p>
            <ul>
              <li><a href="${PROTECTED}">Protected</a></li>
              <li><a href="${LOGOUT}">Logout</a></li>
            </ul>
          </div>
        `);
    } else {
      res.send(`
          <div>
            <h1>Home</h1>
            <p>You are not logged in.</p>
            <a href="${LOGIN}">Login</a>
          </div>
        `);
    }
  }
}
