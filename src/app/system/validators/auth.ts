import Joi from 'joi';
import Response from '../helpers/Response';

export default class AuthValidator {
    static async register(req, res, next) {
        const schema = Joi.object().keys({
          fullName: Joi.string().required(),
          userName: Joi.string().required(),
          email: Joi.string().required().email(),
          phoneNumber: Joi.string().required(),
          gender: Joi.string(),
          dateOfBirth: Joi.date(),
          companyId : Joi.string().uuid(),
          password: Joi.string().required().min(8),
        });
        const { error } = schema.validate(req.body);
        if (error) {
          return Response.error(res, 400, {
            message: error.details[0].message.replace(/"/g, ''),
          });
        }
        return next();
      }

  static async login(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate({
      email: req.body.email,
      password: req.body.password,
    });
    if (error) {
      return Response.error(res, 400, {
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }


  static async update(req, res, next) {
    const schema = Joi.object().keys({
      id:Joi.string().guid({version: 'uuidv4'}).required(),
      fullName: Joi.string(),
      userName: Joi.string(),
      email: Joi.string().email(),
      phoneNumber: Joi.string(),
      gender: Joi.string(),
      dateOfBirth: Joi.date(),
      companyId : Joi.string().uuid(),
      password: Joi.string().min(8),
    });
    const { error } = schema.validate({...req.body,id:req.params.id});
    if (error) {
      return Response.error(res, 400, {
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async resetPassword(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string().min(8).required(),
      token: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.error(res, 400, {
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }

  static async forgetPassword(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().allow(''),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return Response.error(res, 400, {
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    return next();
  }
}
