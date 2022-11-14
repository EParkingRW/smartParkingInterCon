import 'dotenv/config';
import Response from '../../system/helpers/Response';
import UserService from '../../services/userServices';
import { decode } from '../../system/security/jwt';

export const isAuth = (req, _, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = decode(token); 
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next();
};

export const protectedRoute = async (req, res, next) => {
  if (!req.isAuth) {
    return Response.error(res, 401, { message: 'unauthorized' });
  }
  const { userId } = req;
  try {
    const user = await UserService.findByPk(userId);

    const foundUser:any = user;
    if (!foundUser.status) {
      return Response.error(res, 401, {
        message: 'logged out, login and try again',
      });
    }
    req.me = foundUser;
    // {
    //   userId: foundUser.id,
    //   active: foundUser.active,
    //   status: foundUser.status,
    // };
    return next();
  } catch (err) {
    return Response.error(res, 401, {
      message: 'invalid token,login to get one',
    });
  }
};

export const isStaff = (req, _, next) => {
  const { me } = req;
  return next();
};

export const isVerified = (req,res)=>{
  
}
