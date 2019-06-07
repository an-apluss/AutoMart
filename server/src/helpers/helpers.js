import 'dotenv/config';
import Joi from '@hapi/joi';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloud from 'cloudinary';

/**
 *
 *
 * @export Helper
 * @class Helper
 */
export default class Helper {
  /**
   *
   * Handles the logic to generate ID number
   * @static
   * @param {Array} data list of data object to generate id from
   * @returns Integer
   * @memberof Helper
   */
  static generateId(data) {
    const lastId = data[data.length - 1].id;
    const newId = lastId + 1;
    return newId;
  }

  /**
   *
   * Handles the logic to hash a plaintext password
   * @static
   * @param {String} plainTextPassword password plain text to be hash
   * @param {Integer} salt salt rounds to give a secure hash
   * @returns String
   * @memberof Helper
   */
  static async hashPassword(plainTextPassword, salt) {
    const gensalt = await bycrpt.genSalt(salt);
    const password = await bycrpt.hash(plainTextPassword, gensalt);
    return password;
  }

  /**
   *
   * Handles the logic to compare plaintext password with hashed password
   * @static
   * @param {String} plainTextPassword plaintext password to be compare
   * @param {String} hashedPassword hashed password to be compare
   * @returns Boolean
   * @memberof Helper
   */
  static async compareHashedPassword(plainTextPassword, hashedPassword) {
    const comparedPassword = await bycrpt.compare(plainTextPassword, hashedPassword);
    return comparedPassword;
  }

  /**
   *
   * Haandles the logic to generate token
   * @static
   * @param {Object} user user details to be encrypted
   * @returns String
   * @memberof Helper
   */
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

  /**
   *
   * Handles logic to check if a field is alphabeltic or not
   * @static
   * @param {String} field field to be checked
   * @returns Boolean
   * @memberof Helper
   */
  static notAlpha(field) {
    const pattern = /^[a-zA-Z]+$/;
    if (!field.match(pattern)) return true;
    return false;
  }

  /**
   *
   * Handles the logic to verify a token
   * @static
   * @param {String} token token to be verified
   * @returns  Object
   * @memberof Helper
   */
  static verifyToken(token) {
    const decode = jwt.verify(token, process.env.JWTPRIVATEKEY);
    return decode;
  }

  /**
   *
   * Handles the logic to validate the user details for registration
   * @static
   * @param {Object} user user details to be validated
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handle the logic to validate user input for sign in data
   * @static
   * @param {Object} user user sign in data
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handles the logic to validate user input for car advert registration data
   * @static
   * @param {Object} data
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handle the logic to upload image on cloudinary platform
   * @static
   * @param {String} image
   * @param {String} tag
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handle logic to validate user input for car advert status update
   * @static
   * @param {Object} status
   * @returns Object
   * @memberof Helper
   */
  static validateCarStatus(status) {
    const schema = {
      status: Joi.string().required()
    };
    return Joi.validate(status, schema);
  }

  /**
   *
   * Handles the logic to validate user input for car advert price update
   * @static
   * @param {Object} price
   * @returns Object
   * @memberof Helper
   */
  static validateCarPrice(price) {
    const schema = {
      price: Joi.number()
        .positive()
        .required()
    };
    return Joi.validate(price, schema);
  }

  /**
   *
   * Handles the logic to check if a value is positive whole number
   * @static
   * @param {Integer} value
   * @returns Boolean
   * @memberof Helper
   */
  static isWholeNumber(value) {
    const pattern = /^[0-9]+$/;
    if (pattern.test(value) === true) return true;
    return false;
  }

  /**
   *
   * Handle the logic to validate user options to fetch unsold car within specific price range
   * @static
   * @param {Object} options
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handles the logic to validate user input for purchase order
   * @static
   * @param {Object} orderData
   * @returns Object
   * @memberof Helper
   */
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

  /**
   *
   * Handles the logic to validate user input to update purchase order price if status reads pending
   * @static
   * @param {Object} price
   * @returns Object
   * @memberof Helper
   */
  static validateUpdateOrderPrice(price) {
    const schema = {
      price: Joi.number().required()
    };

    return Joi.validate(price, schema);
  }

  /**
   *
   * Handles the logic to validate user input to report a car advert as fraudulent
   * @static
   * @param {Object} data
   * @returns Object
   * @memberof Helper
   */
  static validateFlagData(data) {
    const schema = {
      carId: Joi.number()
        .positive()
        .required(),
      reason: Joi.string().required(),
      description: Joi.string().required()
    };

    return Joi.validate(data, schema);
  }
}
