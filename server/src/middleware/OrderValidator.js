import helper from '../helpers/helpers';

const { validatePurchaseOrder, isWholeNumber, validateUpdateOrderPrice } = helper;

/**
 *
 *
 * @export OrderValidation
 * @class OrderValidation
 */
export default class OrderValidation {
  /**
   *
   * Handles validation of user input to purchase an order
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof OrderValidation
   */
  static checkPurchaseOrder(req, res, next) {
    const { error } = validatePurchaseOrder(req.body);

    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    const { carId } = req.body;
    if (!isWholeNumber(carId))
      return res
        .status(422)
        .json({ status: 422, error: 'Car id must be whole number', success: false });

    return next();
  }

  /**
   *
   * Handles validation of user input to update the price of purchase order
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {(function|Object)} function next() or an error response object
   * @memberof OrderValidation
   */
  static checkOrdeUpdate(req, res, next) {
    if (!isWholeNumber(req.params.orderId))
      return res
        .status(403)
        .json({ status: 403, error: 'Car id must be whole number', success: false });

    const { error } = validateUpdateOrderPrice(req.body);

    if (error)
      return res.status(422).json({ status: 422, error: error.details[0].message, success: false });

    return next();
  }
}
