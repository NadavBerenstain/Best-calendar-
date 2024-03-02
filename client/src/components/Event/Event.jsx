import React from "react";
import "./Event.css";
import apiService from "../../ApiService";
import { useEffect, useState } from "react";

export default function Event({ event, setEventsList, setBaseList }) {
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
      setBaseList(resData);
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
  function formatDateString(dateBefore) {
    const date = new Date(dateBefore);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const days = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const readyMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${readyMinutes}  - ${month}/${days}/${year}`;
  }
  ///////////////////////////////////////////////////////////
  function handleBlur(name, setValue) {
    return (e) => {
      const updatedValue = e.target.innerText;
      setValue(updatedValue);
      const updatedEventData = { ...event, [name]: updatedValue };
      updateEvent(event._id, updatedEventData);
    };
  }
  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setTitle(event.title);
    setNotes(event.notes);
    setDate(formatDateString(event.date));
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
