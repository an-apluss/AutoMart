import Helper from '../helpers/helpers';
import storage from '../models/dummydata';

const { validateSignup, notAlpha } = Helper;
const { users } = storage;

export default class UserValidator {
  static signupCheck(req, res, next) {
    const { firstName, lastName } = req.body;

    const firstNameNotAlpha = notAlpha(firstName);
    const lastNameNotAlpha = notAlpha(lastName);

    const { error } = validateSignup(req.body);

    const userExist = users.find(user => user.email === req.body.email);

    if (firstNameNotAlpha)
      return res
        .status(422)
        .json({ status: 422, error: 'firstName can only be alphabelt', success: false });

    if (lastNameNotAlpha)
      return res
        .status(422)
        .json({ status: 422, error: 'lastName can only be alphabelt', success: false });

    if (error) {
      return res.status(422).json({
        status: 422,
        error: error.details[0].message,
        success: false
      });
    }

    if (userExist) {
      return res.status(409).json({
        status: 409,
        error: 'Email Has Been Taken',
        success: false
      });
    }

    return next();
  }
}
