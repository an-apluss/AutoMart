import Helper from '../helpers/helpers';

export default class Auth {
  /**
   *
   * Handle authorization, check if header is set and create new req object
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {(function|Object)} Function next() or an error Object
   * @memberof Auth
   */
  static checkHeader(req, res, next) {
    try {
      const header = req.header('Authorization');

      if (!header) throw new Error('You do not have access to this page');

      const token = header.split(' ')[1];
      const decoded = Helper.verifyToken(token);

      req.user = decoded;

      return next();
    } catch (ex) {
      return res.status(401).json({
        status: 401,
        error: `${ex.message}`,
        success: false
      });
    }
  }

  /**
   *
   * Check if current user is a buyer or seller
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {(function|Object)} Function next() or an error Object
   * @memberof Auth
   */
  static checkBuyerSeller(req, res, next) {
    if (req.user.isAdmin !== false)
      return res.status(401).json({
        status: 401,
        success: false,
        error: 'You are unauthorized to perform this action'
      });

    return next();
  }

  /**
   *
   * check if the current user is admin
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @returns {(function|Object)} Function next() or an error Object
   * @memberof Auth
   */
  static checkAdmin(req, res, next) {
    if (req.user.isAdmin !== true)
      return res.status(401).json({
        status: 401,
        success: false,
        error: `You are unauthorized to perform this action`
      });

    return next();
  }
}
