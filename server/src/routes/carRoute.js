import express from 'express';

import CarController from '../controllers/carController';
import upload from '../middleware/imageUpload';
import CarValidator from '../middleware/CarValidator';

const carRoute = express.Router();

const { postCarAd, updateStatus, updatePrice } = CarController;
const { checkCarPostAd, checkCarStatusUpdate, checkCarPriceUpdate } = CarValidator;

carRoute.post('/', upload.single('image'), checkCarPostAd, postCarAd);
carRoute.patch('/:carId/status', checkCarStatusUpdate, updateStatus);
carRoute.patch('/:carId/price', checkCarPriceUpdate, updatePrice);

export default carRoute;
