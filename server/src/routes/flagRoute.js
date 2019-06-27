import express from 'express';

import FlagValidation from '../middleware/FlagValidator';
import FlagController from '../controllers/flagController';
import Auth from '../middleware/Auth';

const flagRoute = express.Router();

const { checkFlagPost } = FlagValidation;
const { postFlag } = FlagController;
const { checkHeader, checkBuyerSeller } = Auth;

flagRoute.post('/', checkHeader, checkBuyerSeller, checkFlagPost, postFlag);

export default flagRoute;
