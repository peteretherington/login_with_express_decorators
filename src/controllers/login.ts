import { Request, Response } from 'express';

import { controller, get, post, bodyValidator } from './decorators';
import { ROOT, LOGOUT } from './routes';

@controller('')
export class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <div>
        <h1>Login</h1>
        <form method="POST">
          <div>
            <label>Email</label>
            <input name="email"/>
          </div>
          <div>
            <label>Password</label>
            <input name="password" type="password"/>
          </div>
          <button>Submit</button>
        </form>
      </div>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email == 'jimmy@heaters.com' && password == 'darts') {
      req.session = { loggedIn: true };
      res.redirect(ROOT);
    } else {
      res.send(`
        <div>
          <p>Invalid email or password.</p>
        </div>
      `);
    }
  }

  @get(LOGOUT)
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect(ROOT);
  }
}
