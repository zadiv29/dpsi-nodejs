var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' }); // Mengirim respon JSON
});

module.exports = router;
