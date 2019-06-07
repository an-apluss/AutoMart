import Helper from '../helpers/helpers';

const { validateCarAdvert, validateCarStatus, validateCarPrice, notAlpha, isWholeNumber } = Helper;

/**
 *
 *
 * @export CarValidator
 * @class CarValidator
 */
export default class CarValidator {
  /**
   *
   * Handles car advert post validation
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof CarValidator
   */
  static checkCarPostAd(req, res, next) {
    const { error } = validateCarAdvert(req.body);
    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    if (req.body.state.toLowerCase() !== 'new' && req.body.state.toLowerCase() !== 'used')
      return res
        .status(422)
        .json({ status: 422, error: 'Car state can only be used or new', success: false });

    return next();
  }

  /**
   *
   * Handles the validation of car status update
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof CarValidator
   */
  static checkCarStatusUpdate(req, res, next) {
    const { error } = validateCarStatus(req.body);
    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    if (!isWholeNumber(req.params.carId))
      return res
        .status(403)
        .json({ status: 403, error: 'Car id must be whole number', success: false });

    if (notAlpha(req.body.status))
      return res
        .status(422)
        .json({ status: 422, error: 'Status can only be string', success: false });

    if (req.body.status.toLowerCase() !== 'sold')
      return res
        .status(422)
        .json({ status: 422, error: 'Status can only be sold', success: false });

    return next();
  }

  /**
   *
   * Handles the validation of car price update
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof CarValidator
   */
  static checkCarPriceUpdate(req, res, next) {
    if (!isWholeNumber(req.params.carId))
      return res
        .status(403)
        .json({ status: 403, error: 'Car id must be whole number', success: false });

    const { error } = validateCarPrice(req.body);
    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    return next();
  }

  /**
   *
   * Handles the validation of car id
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof CarValidator
   */
  static checkSpecificCar(req, res, next) {
    if (!isWholeNumber(req.params.carId))
      return res
        .status(403)
        .json({ status: 403, error: 'Car id must be whole number', success: false });

    return next();
  }
}
