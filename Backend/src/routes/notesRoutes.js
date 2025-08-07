import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getbyId,
  updateNote,
} from "../Controlers/notesControler.js";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getbyId);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

// router.get('/',(req,res)=>{
//     res.send('you have 5 notes');
// })

// router.post('/',(req,res)=>{
//     res.status(201).json({message:"Note created successfully!"});
// })

// router.put('/:id',(req,res)=>{
//     res.status(200).json({message:"Note updated successfully!"});
// })
// all functions logic in controler.js

export default router;
// module.export= router;
