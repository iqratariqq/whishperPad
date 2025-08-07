import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getAllNotes = async (req, res) => {
  try {
    const note = await Note.find();
    res.status(200).json(note);
  } catch (error) {
    console.error("error to fetch note", error);
    res.status(500).json("enternal server error");
  }
};

export const getbyId = async (req, res) => {
  try {
    const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

  
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(note);
  } catch (error) {
    console.error("error to fetch note by id", error);
    return res.status(500).json("enternal server error");
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const updatednote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    res.status(200).json(updatednote);
    if (!updatednote) {
      return res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("error to update note", error);
    res.status(500).json("internal server error");
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error("error to create note", error);
    res.status(500).json("internal server error");
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!deleteNote) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(deleteNote);
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("error to delete note", error);
    res.status(500).json("internal server error");
  }
};
