import FlagService from '../services/flagService';

/**
 *
 *
 * @export FlagController
 * @class FlagController
 */
export default class FlagController {
  /**
   *
   * Handle the logic to report/flag a car advert as fraudulent
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns JSON API Response
   * @memberof FlagController
   */
  static async postFlag(req, res, next) {
    try {
      const response = await FlagService.createFlag(req.body);
      return res.status(response.status).send(response);
    } catch (ex) {
      return next(ex);
    }
  }
}
