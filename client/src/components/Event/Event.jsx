import React from "react";
import "./Event.css";
import apiService from "../../ApiService";
import { useEffect, useState } from "react";

export default function Event({ event, setEventsList }) {
  ////////////////////////////////////////////////////
  const [title, setTitle] = useState(event.title);
  const [notes, setNotes] = useState(event.notes);
  const [date, setDate] = useState(event.date);

  /////////////////////////////////////////////////////

  async function deleteEvent(id) {
    try {
      await apiService.deleteEvent(id);
      const resData = await apiService.getList();
      setEventsList(resData);
    } catch (error) {
      throw new Error(error);
    }
  }
  ///////////////////////////////////////////////////////
  async function updateEvent(id, updatedEventData) {
    try {
      await apiService.updateEvent(id, updatedEventData);
      const resData = await apiService.getList();
      setEventsList(resData);
    } catch (error) {
      throw Error(error);
    }
  }
  ///////////////////////////////////////////////////////////
  function handleBlur(name, setValue) {
    return (e) => {
      const updatedValue = e.target.innerText;
      setValue(updatedValue);
      const updatedEventData = { ...event, [name]: updatedValue };
      console.log(event);
      updateEvent(event._id, updatedEventData);
    };
  }
  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setTitle(event.title);
    setNotes(event.notes);
    setDate(event.date);
  }, [event.title, event.notes, event.date]);
  /////////////////////////////////////////////////////////////////////////
  return (
    <div
      id="itemCon"
      className={event.important ? "importantEvent" : "regularEvent"}
    >
      <h2
        contentEditable={true}
        onBlur={handleBlur("title", setTitle)}
        name="title"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h2>
      <div
        contentEditable={true}
        onBlur={handleBlur("notes", setNotes)}
        name="notes"
        dangerouslySetInnerHTML={{ __html: notes }}
      ></div>
      <div
        contentEditable={true}
        onBlur={handleBlur("date", setDate)}
        name="date"
        dangerouslySetInnerHTML={{ __html: date }}
      ></div>
      <button onClick={() => deleteEvent(event._id)}>X</button>
    </div>
  );
}
