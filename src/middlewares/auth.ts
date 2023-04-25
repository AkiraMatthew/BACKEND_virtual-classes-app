import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../services/jwtService';
import { userService } from '../services/userService';
import { JwtPayload } from 'jsonwebtoken';
import { UserInstance } from '../models/User';

// code fixed

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null;
}

export function ensureAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res
            .status(401)
            .json({ message: 'Unauthorized access: no token was found' });
    }

    const token = authorizationHeader.replace(/Bearer /, '');

    jwtService.verifyToken(token, (err, decoded) => {
        if (err || typeof decoded === 'undefined') {
            return res
                .status(401)
                .json({ message: 'Unauthorized access: invalid token' });
        }

        userService.findByEmail((decoded as JwtPayload).email).then((user) => {
            req.user = user;
            next();
        });
    });
}

export function ensureAuthViaQuery(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const { token } = req.query;

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Unauthorized access: no token was found' });
    }

    if (typeof token !== 'string') {
        return res
            .status(400)
            .json({ message: `The token argument must be of type 'string'` });
    }

    // Import the jwtService module and verifyToken method
    jwtService.verifyToken(token, async (err: any, decoded: any) => {
        // add types for err and decoded
        if (err || typeof decoded === 'undefined') {
            return res
                .status(401)
                .json({ message: 'Unauthorized access: invalid token' });
        }

        const user = await userService.findByEmail(
            (decoded as JwtPayload).email
        );
        req.user = user;
        next();
    });
}
/*export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const { token } = req.query;

  if(!token) {
    return res.status(401).json({ message: 'Unauthorized access: no token was found' })
  };

  if(typeof token !== 'string'){
    return res.status(401).json({ message: `The token argument must be of type 'string' `})
  };

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Unauthorized access: invalid token' })
    };

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  })
}*/

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
