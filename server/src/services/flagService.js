import Flag from '../models/flagModel';
import CarService from './carService';

/**
 *
 *
 * @export FlagService
 * @class FlagService
 */
export default class FlagService {
  /**
   *
   * Handles the logic to report a car advert
   * @static
   * @param {Object} flagData flag data is the user input to report/flag a car advert
   * @returns JSON API Response
   * @memberof FlagService
   */
  static async createFlag(flagData) {
    const carExist = await CarService.fetchCarById(flagData.carId);
    if (!carExist) return { status: 422, error: 'Car id does not exist', success: false };

    const newFlag = await Flag.create(flagData);

    const { id, car_id, reason, description } = newFlag;
    return {
      status: 201,
      data: {
        id,
        car_id,
        reason,
        description
      },
      success: true
    };
  }
}
