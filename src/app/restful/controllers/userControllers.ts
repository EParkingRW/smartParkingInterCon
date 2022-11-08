import bcrypt from 'bcryptjs';
import UserService from '../../services/userServices';
import { signinToken, decode } from '../../system/security/jwt';
import Response from '../../system/helpers/Response';
import emailMocks from '../../system/utils/emailMocks';
import sendEmail from '../../system/utils/nodemailer';

export default class AuthControllers {
  static async register(req, res) {
        const newUser = req.body;
        try {
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username || newUser.email;
            const userExist = await UserService.findByEmail(newUser.email);
            if (userExist?.toJSON()) {
            return Response.error(res, 400, { message: 'user exists' });
            }
            newUser.password = await bcrypt.hash(newUser.password, 12);
            let user = await UserService.create(newUser);
            user = await user.save();

            const createdUser = user.toJSON();
            const userData = {
              id: createdUser.id,
              email: createdUser.email,
              fullName: createdUser.fullName,
              userName: createdUser.userName,
            };
            const token = signinToken(
                userData,
                process.env.EMAIL_JWT_SECRET,
            );
            const emailOptions = {
              email: createdUser.email,
              message: await emailMocks.verifyAccount({
                  ...userData,
                  token,
              }),
              subject: 'Account Verification Link',
            };
            sendEmail(emailOptions)
            return Response.success(res, 201, {
                message: `Dear ${createdUser.fullName}, verify your email`,
                user: userData,
            });
        } catch (error) {
            return Response.error(res, 500, {
                error: error.message,
                message: 'something went wrong',
            });
        }
    }

  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      let user = await UserService.findByEmail(email);
      if (!user) {
        return Response.error(res, 404, {
          message: 'Invalid username or password',
        });
      }
      const foundUser = user.toJSON();
      const isEqual = await bcrypt.compare(
        password,
        foundUser.password,
      );
      if (!isEqual) {
        return Response.error(res, 404, {
          message: 'Invalid username or password',
        });
      }
      if (!foundUser.active) {
        return Response.error(res, 401, {
          message: 'email is not verified',
          active: foundUser.active,
        });
      }
      user.set('status', 1); // update user to online status
      user = await user.save();
      const inUser = user.toJSON();
      const userData = {
        userId: inUser.id,
        email: inUser.email,
        firstName: inUser.firstName,
        status: inUser.status,
        active: inUser.active,
        student: inUser.student,
        avatarId: inUser.avatarId,
        allowed: false,
      };
      const emails = process.env?.ALLOWED_EMAILS?.split(',');
      if (emails?.includes(userData.email)) {
        userData.allowed = true;
      }
      const token = signinToken(userData);
      return Response.success(res, 200, {
        message: 'login successfully',
        user: userData,
        token,
      });
    } catch (error) {
      const message = error ? error.message : 'something went wrong';
      return Response.error(res, 500, { message });
    }
  }

  static async confirmAccount(req, res) {
    const { token } = req.body;
    try {
      const decodedToken: any = decode(
        token,
        process.env.EMAIL_JWT_SECRET,
      );
      if (!decodedToken) {
        return Response.error(res, 400, {
          message: 'Your verification link may have expired.',
        });
      }
      const user: any = await UserService.findByPk(decodedToken.id);
      if (!user) {
        return Response.error(res, 401, {
          message: 'user not found, signup',
        });
      }

      const foundUser = user.toJSON();

      if (foundUser.active) {
        return Response.success(res, 200, {
          message: 'user verified, login',
          user: {
            active: true,
          },
        });
      }
      user.active = true;
      await user.save();

      return Response.success(res, 200, {
        message: 'verified successfully',
        user: {
          active: true,
        },
      });
    } catch (err) {
      const message = err.message || 'something went wrong';
      return Response.error(res, 500, { message });
    }
  }

  static async getProfile(req, res) {
    if (!req.isAuth) {
      return Response.error(res, 404, {
        message: "you aren't logged in",
      });
    }
    try {
      const user: any = await UserService.findByPk(req.userId);
      user.password = undefined;
      return Response.success(res, 201, {
        message: 'your profile',
        profile: user,
      });
    } catch (error) {
      const message = error.message || 'something went wrong';
      return Response.error(res, 500, { message });
    }
  }

  static async forgettingPassword(req, res) {
    let { email } = req.body;
    email = email.toLowerCase().trim();
    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        return Response.error(res, 401, {
          message: 'user not found, signup',
        });
      }

      const inUser = user.toJSON();
      const userData = {
        id: inUser.id,
        email: inUser.email,
        fullName: inUser.fullName,
      };
      const token = signinToken(
        userData,
        process.env.EMAIL_JWT_SECRET,
      );
      const emailOptions = {
        email: inUser.email,
        message: await emailMocks.forgetPassword({
          ...inUser,
          token,
        }),
        subject: 'Reset Password Link',
      };
      sendEmail(emailOptions);
      return Response.success(res, 201, {
        message: 'check your email',
      });
    } catch (error) {
      const message = error.message || 'something went wrong';
      return Response.error(res, 500, { message });
    }
  }

  static async resetingPassword(req, res) {
    const { password, token } = req.body;
    try {
      const decoded: any = decode(token);
      const { id } = decoded;
      let user = await UserService.findByPk(id);
      if (!user) {
        return Response.error(res, 401, {
          message: 'user not found, signup',
        });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      user.set({ password: hashPassword });
      user = await user.save();
      return Response.success(res, 201, {
        message: 'password updated',
      });
    } catch (err) {
      if (
        err.message === 'jwt malformed' ||
        err.message === 'invalid token' ||
        err.message === 'jwt expired'
      ) {
        return Response.error(res, 400, {
          message: 'You are using Incorrect or Expired Link!',
          error: err.message,
        });
      }
      return Response.error(res, 500, {
        message: 'server errror',
        error: err.message,
      });
    }
  }

  static async logOut(req, res) {
    const {
      me: { userId },
    } = req;
    try {
      let user = await UserService.findByPk(userId);
      user.set('status', 0); // update login status
      user = await user.save();
      const outUser = user.toJSON();
      return Response.success(res, 201, {
        message: 'logout successfully',
        user: {
          id: outUser.id,
          firstName: outUser.firstName,
        },
      });
    } catch (error) {
      const message = error.message || 'something went wrong';
      return Response.error(res, 500, { message });
    }
  }

}
