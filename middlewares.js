const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
};

const errorMessages = {
  UniqueViolationError: 'Already exists.',
};

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    errors: error.errors || undefined,
  });
}

async function authCheck (req, res, next){
verify(req.cookies.auth, process.env.JWT_SECRET, async function(err, decode){
  if (!err && decode){
    next()
  }
  res.status(500).json({message:"you are not authrised"})
})
}

module.exports = {
  notFound,
  errorHandler,
  authCheck
};
