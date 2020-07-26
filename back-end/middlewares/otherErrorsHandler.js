const otherErrorsHandler = (err, _req, res, _next) => {
  console.log(_next, 'Esse console.log deve ser retirado');
  return res.status(500).json({
    error: {
      message: err.message || 'Erro interno',
      code: err.code || 'internal_error',
    },
  });
};

module.exports = otherErrorsHandler;
