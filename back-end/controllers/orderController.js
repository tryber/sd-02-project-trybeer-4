const rescue = require('express-rescue');

const insert = rescue(async (req, res) => {
  res.status(200).json();
});

module.exports = {
  insert,
};
