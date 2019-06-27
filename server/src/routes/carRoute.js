import express from 'express';

import CarController from '../controllers/carController';
import upload from '../middleware/imageUpload';
import CarValidator from '../middleware/CarValidator';
import Auth from '../middleware/Auth';

const carRoute = express.Router();

const { postCarAd, updateStatus, updatePrice, getOneCar, getCars, deleteOneCar } = CarController;

const {
  checkCarPostAd,
  checkCarStatusUpdate,
  checkCarPriceUpdate,
  checkSpecificCar
} = CarValidator;

const { checkHeader, checkBuyerSeller, checkAdmin } = Auth;

carRoute.post(
  '/',
  checkHeader,
  checkBuyerSeller,
  upload.single('image'),
  checkCarPostAd,
  postCarAd
);
carRoute.patch('/:carId/status', checkHeader, checkBuyerSeller, checkCarStatusUpdate, updateStatus);
carRoute.patch('/:carId/price', checkHeader, checkBuyerSeller, checkCarPriceUpdate, updatePrice);
carRoute.get('/:carId', checkHeader, checkBuyerSeller, checkSpecificCar, getOneCar);
carRoute.get('/', checkHeader, getCars);
carRoute.delete('/:carId', checkHeader, checkAdmin, checkSpecificCar, deleteOneCar);

export default carRoute;
