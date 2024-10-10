const logErrors = (error, req, res, next) => {
  console.log('Ejecutando logErrors...');
  next(error);
}

const errorHandler = (error, req, res, next) => {
  console.log('errorHandler...');
  res.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

const boomErrorHandler = (error, req, res, next) => {
  console.log('boomErrorHandler...');
  if(error.isBoom){
    const {output} = error;
    res.status(output.statusCode).json(output.payload);
    return;
  }
  next(error);
}

module.exports = {logErrors, errorHandler, boomErrorHandler}