const router = require('express').Router();
const fs = require('fs');
const { v4: uuid } = require('uuid')


// GET Route for retrieving all the feedback
router.get('/notes', (req, res) =>
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
  // checks if file is there. If not, sends error
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      // if file exists, parses data, adds unique id, adds new note to db.json, rewrites file
      let notes = JSON.parse(data);
      req.body.id = uuid();
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

});

// DELETE Route for deleting note
router.delete('/notes/:id', (req, res) => {
  // checks if file is there. If not, sends error
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      // if file exists, parses data, identifies selected note by id, deletes note via splice function, then rewrites file
      let notes = JSON.parse(data);
      const indexToRemove = notes.findIndex((note) => note.id === req.body.id)
      notes.splice(indexToRemove);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (error, data) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.send(data);
        }
      });
    }
  })
});

module.exports = router;
