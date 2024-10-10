const express = require('express');
const app = express();
const routerApi = require('./Routers');
require('dotenv').config();
const PORT = process.env.PORT;
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

app.use(express.json());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});