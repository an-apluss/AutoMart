import helper from '../helpers/helpers';

const { validatePurchaseOrder, isWholeNumber } = helper;

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
}
