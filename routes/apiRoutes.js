const router = require('express').Router();
const fs = require('fs');

// GET Route for retrieving all the feedback
router.get('/notes', (req, res) =>
  // readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.send(data);
    }
  })
);



module.exports = router;
