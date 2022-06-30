import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const InitialNotes = [
    {
      _id: "62ba1b4eb4a5ac99f77a522f",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "updated title",
      description: "updated description",
      tag: "personal",
      date: "2022-06-27T21:04:14.951Z",
      __v: 0,
    },
    {
      _id: "62ba1b63b4a5ac99f77a5233",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 3",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:04:35.309Z",
      __v: 0,
    },
    {
      _id: "62ba259bc040fe3a27d31dce",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 2",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    },
    {
      _id: "62ba259bc040fe3a27d31dce1",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 2",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    },
    {
      _id: "62ba259bc040fe3a27d31dce2",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 2",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    },
    {
      _id: "62ba259bc040fe3a27d31dce3",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 2",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    },
    {
      _id: "62ba259bc040fe3a27d31dce4",
      user: "62ba18dfb4a5ac99f77a522a",
      title: "My title 2",
      description: "My description",
      tag: "personal",
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(InitialNotes);

  //Add a Note
  const addNote = (title, description, tag) => {
    console.log("adding a new ntoe");
    const note = {
      _id: "62ba259bc040fe3a27d31dce5",
      user: "62ba18dfb4a5ac99f77a522a",
      title: title,
      description: description,
      tag: tag,
      date: "2022-06-27T21:48:11.611Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete a Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = () => {};
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
