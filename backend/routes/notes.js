const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1 : Fetch all user notes using : GET "/api/notes/fetchallnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal error occured in the code");
  }
});

//Route 2 : Add a note : POST "/api/notes/addnote" : login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must contain atleast 3 characters").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must contain atleast 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    //return bad request for errors
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const SavedNote = await note.save();
      res.json(SavedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some internal error occured in the code");
    }
  }
);

//Route 3 : Update a note : POST "/api/notes/updatenote/:id" : login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a newNote object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal error occured in the code");
  }
});

//Route 4 : Delete an existing note : DELETE "/api/notes/deletenote/:id" : login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal error occured in the code");
  }
});

module.exports = router;
