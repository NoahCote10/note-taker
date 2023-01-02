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

// POST Route for submitting note
router.post('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      let notes = JSON.parse(data);
      notes.push(req.body);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (error, data) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.send(data);
        }
      });
    }

  })

  // read db.json, parse it, write new note to array,
  //  stringify it, persist into file, send success code
});

module.exports = router;
