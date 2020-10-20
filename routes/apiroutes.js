//const express = require("express");
const router = require("express").Router();
const db = require("../db/db.json");
const uuid = require("uuid");

router.get("/notes", (req, res) => {
  res.json(db);
});

router.post("/notes", (req, res) => { // router.put?
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };
  if (!newNote.title || !newNote.text) {
    return res.status(400).json({ msg: "please include a note" });
  }
  db.push(newNote);
  res.redirect("/notes");
});

router.delete("/notes/:id", (req, res) => {
  const found = db.some(db => db.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "note deleted",
      db: db.filter(db => db.id !== parseInt(req.params.id),
      )});
  } else {
    res.status(400).json({ msg: `No note with id ${req.params.id} ` });
  }


});

module.exports = router;