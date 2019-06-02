import 'dotenv/config';
import Joi from '@hapi/joi';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloud from 'cloudinary';

export default class Helper {
  static generateId(data) {
    const lastId = data[data.length - 1].id;
    const newId = lastId + 1;
    return newId;
  }

  static async hashPassword(plainTextPassword, salt) {
    const gensalt = await bycrpt.genSalt(salt);
    const password = await bycrpt.hash(plainTextPassword, gensalt);
    return password;
  }

  static async compareHashedPassword(plainTextPassword, hashedPassword) {
    const comparedPassword = await bycrpt.compare(plainTextPassword, hashedPassword);
    return comparedPassword;
  }

  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        email: user.email
      },
      process.env.JWTPRIVATEKEY,
      { expiresIn: '1h' }
    );
    return token;
  }

  static notAlpha(field) {
    const pattern = /^[a-zA-Z]+$/;
    if (!field.match(pattern)) return true;
    return false;
  }

  static verifyToken(token) {
    const decode = jwt.verify(token, process.env.JWTPRIVATEKEY);
    return decode;
  }

  static validateSignup(user) {
    const schema = {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      address: Joi.string().required()
    };
    return Joi.validate(user, schema);
  }

  static validateSignin(user) {
    const schema = {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .required()
    };
    return Joi.validate(user, schema);
  }

  static validateCarAdvert(data) {
    const schema = {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      state: Joi.string().required(),
      price: Joi.number()
        .positive()
        .required(),
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      bodyType: Joi.string().required()
    };

    return Joi.validate(data, schema);
  }

  static async cloudinaryUpload(image, tag) {
    const cloudinary = cloud.v2;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_ID,
      api_secret: process.env.API_SECRET
    });

    const result = await cloudinary.uploader.upload(image, {
      tags: tag,
      resource_type: 'auto'
    });
    return result;
  }

  static validateCarStatus(status) {
    const schema = {
      status: Joi.string().required()
    };
    return Joi.validate(status, schema);
  }

  static validateCarPrice(price) {
    const schema = {
      price: Joi.number()
        .positive()
        .required()
    };
    return Joi.validate(price, schema);
  }

  static isWholeNumber(value) {
    const pattern = /^[0-9]+$/;
    if (pattern.test(value) === true) return true;
    return false;
  }

  static validateUnsoldCarWithOptions(options) {
    const schema = {
      status: Joi.string(),
      min_price: Joi.number()
        .positive()
        .required(),
      max_price: Joi.number()
        .positive()
        .required()
    };

    return Joi.validate(options, schema);
  }

  static validatePurchaseOrder(orderData) {
    const schema = {
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      carId: Joi.number().required(),
      amount: Joi.number().required()
    };

    return Joi.validate(orderData, schema);
  }
}
