import Helper from '../helpers/helpers';

const { validateCarAdvert } = Helper;

export default class CarValidator {
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
}
