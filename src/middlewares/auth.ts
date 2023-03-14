import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

// code fix

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
  }
  
  export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization
  
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
    }
  
    const token = authorizationHeader.replace(/Bearer /, '')
  
    jwtService.verifyToken(token, (err, decoded) => {
      if (err || typeof decoded === 'undefined') {
        return res.status(401).json({ message: 'Não autorizado: token inválido' })
      }
  
      userService.findByEmail((decoded as JwtPayload).email).then(user => {
        req.user = user
        next()
      })
    })
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////


/*export interface AuthenticatedRequest extends Request{
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization;

    if(authorizationHeader === undefined) {
        return res.status(401).json({
            message: 'Unauthorized access: no token was found'
        });
    }

    // Bearer 'token' -> // Bearer ewredsewrwe
    const token = authorizationHeader.replace(/Bearer/, '');
    console.log(token);

    jwtService.verifyToken(token, (err, decoded) => {
        if(err || typeof decoded === undefined) {
            return res.status(401).json({
                message: 'Unauthorized access: invalid token'
            });
        }

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user;
            next()
        })
    })
}*/