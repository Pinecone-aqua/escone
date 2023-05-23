import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      const { access_token } = await getAccessTokenFromCode(code);
      next();
    } catch (error) {
      return error;
    }
  }
}
async function getAccessTokenFromCode(code: any) {
  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/google-callback`,
        code: code,
      },
    });
    return { access_token: data.access_token };
  } catch (err: any) {
    return { err };
  }
}
