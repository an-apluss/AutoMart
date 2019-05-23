import express from 'express';

import bodyParser from 'body-parser';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7030;

app.get('/', (req, res) => {
  return res.status(200).json({ status: 200, message: 'AutoMart says, Welcome!' });
});

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status || 500,
    success: false,
    error: error.message
  });
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});

export default app;
