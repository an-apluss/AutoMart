import express from 'express';

import FlagValidation from '../middleware/FlagValidator';
import FlagController from '../controllers/flagController';

const flagRoute = express.Router();

const { checkFlagPost } = FlagValidation;
const { postFlag } = FlagController;

flagRoute.post('/', checkFlagPost, postFlag);

export default flagRoute;
