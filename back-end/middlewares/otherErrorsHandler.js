const otherErrorsHandler = (err, _req, res, _) => (
  res.status(500).json({
    error: {
      message: err.message || 'Erro interno',
      code: err.code || 'internal_error',
    },
  })
);

module.exports = otherErrorsHandler;
