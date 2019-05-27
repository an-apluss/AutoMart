import express from 'express';

import CarController from '../controllers/carController';
import upload from '../middleware/imageUpload';
import CarValidator from '../middleware/CarValidator';

const carRoute = express.Router();

const { postCarAd } = CarController;
const { checkCarPostAd } = CarValidator;

carRoute.post('/car', upload.single('image'), checkCarPostAd, postCarAd);

export default carRoute;
