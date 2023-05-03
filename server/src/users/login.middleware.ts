import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;
    console.log(code, 'code ');
    const { access_token } = await getAccessTokenFromCode(code);
    console.log(access_token);
    next();
  }
}

async function getAccessTokenFromCode(code: any) {
  console.log('code', code);
  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `http://localhost:${process.env.PORT}/user/google-callback`,
        code: code,
      },
    });
    return { access_token: data.access_token };
  } catch (err: any) {
    // console.log('error: ', err);
    return { err };
  }
}
