const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { default: mongoose } = require("mongoose");
const fetchuser = require("../middleware/fetchuser");
const { query, validationResult, body } = require("express-validator");

//ROUTE 1;
//Get all Notes using : Get "/notes/fetchallnotes" .login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2;
//Add a new Note using : post "/notes/addnote" .login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter a title").isLength({ min: 3 }),
    body("description", "Enter description").isLength({ min: 5, max: 50 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //this concept is called destructuring

      //checks the proper type  and return errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


//ROUTE 3;
//Update an existing  Note using : PUT "/notes/updatenote" .  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {


  const {title,description,tag}=req.body;
  //create a newNote object
  const newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

  //find the note to be updated and update it

  let note= await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  //Allow deletion only if user owns this Note.
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("unAuthorized");
  }

  note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note})


});

//ROUTE 4;
//Delete an existing  Note using : Delete "/notes/deletenote" .  login required
router.delete("/deletenode/:id", fetchuser, async (req, res) => {

  const {title,description,tag}=req.body;


  //find the note to be deleted and delete it

  let note= await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  //Allow deletion only if user owns this Note.
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("unAuthorized");
  }

  note= await Note.findByIdAndDelete(req.params.id);
  res.json({"success":"Note has been deleted",note:note})


})

module.exports = router;
