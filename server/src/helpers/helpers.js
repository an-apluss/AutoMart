import 'dotenv/config';
import Joi from '@hapi/joi';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        firstname: user.firstNname,
        lastname: user.lastName,
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
}
