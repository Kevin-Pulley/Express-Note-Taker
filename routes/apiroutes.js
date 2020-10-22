//const express = require("express");
const router = require("express").Router();
const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const utils = require("util");
const readAsync = utils.promisify(fs.readFile);
const writeAsync = utils.promisify(fs.writeFile);

router.get("/notes", async (req, res) => {

let data = await readAsync("./db/db.json", "utf8");
  res.json(JSON.parse(data));
});

router.post("/notes", (req, res) => {
  // router.put?
  let newNote = req.body;
  let noteID = uuidv4();
  console.log(newNote);
  Object.assign(newNote, { id: noteID });
  console.log(newNote);
  readAsync("./db/db.json", "utf8").then(function(data) {
    let database = JSON.parse(data);
    database.push(newNote);
   return database;

  }).then(database => {
    return writeAsync("./db/db.json", JSON.stringify(database))

  }).then(() => {
    return res.json(newNote);
  } );
});

router.delete("/notes/:id", (req, res) => {
  var noteID = req.params.id;
  console.log(noteID);
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let database = JSON.parse(data);
    for (var i = 0; i < database.length; i++) {
      if (database[i].id === noteID) {
        database.splice(i, 1);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(database), (err) => {
      if (err) throw err;
      console.log("Note has been deleted");
    });
   
    return res.json(database);
  });
});

module.exports = router;


