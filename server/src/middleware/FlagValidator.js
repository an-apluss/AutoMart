import helper from '../helpers/helpers';

const { isWholeNumber, validateFlagData } = helper;

export default class FlagValidator {
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
