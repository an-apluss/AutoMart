import express from 'express';

import CarController from '../controllers/carController';
import upload from '../middleware/imageUpload';
import CarValidator from '../middleware/CarValidator';

const carRoute = express.Router();

const { postCarAd, updateStatus } = CarController;
const { checkCarPostAd, checkCarStatusUpdate } = CarValidator;

carRoute.post('/', upload.single('image'), checkCarPostAd, postCarAd);
carRoute.patch('/:carId/status', checkCarStatusUpdate, updateStatus);

export default carRoute;
