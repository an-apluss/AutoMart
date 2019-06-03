import helper from '../helpers/helpers';

const { validatePurchaseOrder, isWholeNumber, validateUpdateOrderPrice } = helper;

export default class OrderValidation {
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
