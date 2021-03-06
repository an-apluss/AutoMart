import '@babel/polyfill';
import express from 'express';

import bodyParser from 'body-parser';
import 'dotenv/config';

import userRoute from './routes/userRoute';
import carRoute from './routes/carRoute';
import orderRoute from './routes/orderRoute';
import flagRoute from './routes/flagRoute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7030;

app.get('/', (req, res) => {
  return res.status(200).json({ status: 200, data: 'AutoMart says, Welcome!', success: true });
});

app.get('/documentation', (req, res) => {
  return res.redirect('https://webautomart.docs.apiary.io');
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/car', carRoute);
app.use('/api/v1/order', orderRoute);
app.use('/api/v1/flag', flagRoute);

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ status: error.status || 500, success: false, error: error.message });
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});

export default app;
