import helper from '../helpers/helpers';

const { isWholeNumber, validateFlagData } = helper;

/**
 *
 *
 * @export FlagValidator
 * @class FlagValidator
 */
export default class FlagValidator {
  /**
   *
   * Handles the validation of user input to flag/report a car advert
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof FlagValidator
   */
  static checkFlagPost(req, res, next) {
    const { error } = validateFlagData(req.body);

    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    if (!isWholeNumber(req.body.carId))
      return res
        .status(422)
        .json({ status: 422, error: 'carId must be whole number', success: false });

    return next();
  }
}
