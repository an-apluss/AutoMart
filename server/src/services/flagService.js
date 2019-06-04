import helper from '../helpers/helpers';
import storage from '../models/dummydata';
import Flag from '../models/flagModel';
import CarService from './carService';

const { generateId } = helper;
const { flags } = storage;

export default class FlagService {
  static createFlag(flagData) {
    const { carId, reason, description } = flagData;

    const carExist = CarService.fetchCarById(carId);
    if (!carExist) return { status: 422, error: 'Car id does not exist', success: false };

    const flagId = generateId(flags);
    const newFlag = new Flag(flagId, carId, reason, description);
    flags.push(newFlag);

    const { id, car_id } = newFlag;
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
