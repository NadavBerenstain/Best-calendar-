import React from "react";
import "./Event.css";
import apiService from "../../ApiService";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import * as DOMPurify from "dompurify"; //use this after course

export default function Event({ event, setEventsList, setBaseList }) {
  ////////////////////////////////////////////////////
  const [title, setTitle] = useState(event.title);
  const [notes, setNotes] = useState(event.notes);
  const [theme, setTheme] = useState(event.theme);
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

    return `<h2>${days}/${month}/${year}</h2> <h4>${hours}:${readyMinutes}</h4>`;
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
      id="allevent"
      className={event.important ? "importantEvent" : "regularEvent"}
    >
      <button id="eventDeleteButton" onClick={() => deleteEvent(event._id)}>
        <MdDeleteForever id="bin" />
      </button>
      <div
        id="eventTheme"
        contentEditable={true}
        onBlur={handleBlur("theme", setTheme)}
        name="theme"
        dangerouslySetInnerHTML={{ __html: theme }}
      ></div>
      <div id="eventBody">
        <h2
          id="eventTitle"
          contentEditable={true}
          onBlur={handleBlur("title", setTitle)}
          name="title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
        <div
          id="eventNotes"
          contentEditable={true}
          onBlur={handleBlur("notes", setNotes)}
          name="notes"
          dangerouslySetInnerHTML={{ __html: notes }}
        ></div>
      </div>
      <div
        id="eventDate"
        contentEditable={true}
        onBlur={handleBlur("date", setDate)}
        name="date"
        dangerouslySetInnerHTML={{ __html: date }}
      ></div>
    </div>
  );
}
