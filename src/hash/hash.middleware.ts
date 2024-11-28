import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HashMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const saltRound = 10;
    const password = req.body.password;
    req.body.password = await bcrypt.hash(password, saltRound);
    next();
  }
}
