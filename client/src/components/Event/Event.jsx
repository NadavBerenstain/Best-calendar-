import React from "react";
import "./Event.css";
import apiService from "../../ApiService";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { parseISO, formatISO } from "date-fns"; // check func
// import * as DOMPurify from "dompurify"; //use this after course

export default function Event({
  event,
  setEventsList,
  setBaseList,
  baseList,
  themesList,
  setThemesList,
}) {
  ////////////////////////////////////////////////////
  const [title, setTitle] = useState(event.title);
  const [notes, setNotes] = useState(event.notes);
  const [themes, setThemes] = useState(event.theme);

  const [date, setDate] = useState(event.date);

  /////////////////////////////////////////////////////

  async function deleteEvent(id) {
    try {
      // Find the event to be deleted and its themes
      const eventToDelete = baseList.find((event) => event._id === id);
      if (!eventToDelete) {
        console.error("Event not found");
        return;
      }

      let uniqueThemes = [];

      // Check if each theme of the event to delete is unique in the baseList
      eventToDelete.theme.forEach((themeToDelete) => {
        const isUniqueTheme = baseList.every((event) => {
          return event._id === id || !event.theme.includes(themeToDelete);
        });

        if (isUniqueTheme) {
          uniqueThemes.push(themeToDelete);
        }
      });

      // Delete the event
      await apiService.deleteEvent(id);
      const resData = await apiService.getList();

      // Update the event lists
      setEventsList(resData);
      setBaseList(resData);

      // Remove unique themes from themesList
      if (uniqueThemes.length) {
        const updatedThemesList = themesList.filter(
          (theme) => !uniqueThemes.includes(theme)
        );
        setThemesList(updatedThemesList);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
  ///////////////////////////////////////////////////////
  async function updateEvent(id, updatedEventData) {
    if (updatedEventData.date) {
      updatedEventData = {
        ...updatedEventData,
        date: new Date(updatedEventData.date).toISOString(),
      };
    }
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

    return `<h2>${month}/${days}/${year}</h2> <h4>${hours}:${readyMinutes}</h4>`;
  }
  ////////////////////////////////////////////////////////////////
  const handleThemeEdit = async (index, newTheme) => {
    // setThemeList(...themesList, newTheme);
    // console.log(newTheme);
    const updatedThemes = [...themes];
    updatedThemes[index] = newTheme;
    setThemes(updatedThemes);
    const updatedEventData = {
      ...event,
      theme: updatedThemes,
    };
    try {
      await apiService.updateEvent(event._id, updatedEventData);
      const resData = await apiService.getList();
      setEventsList(resData);
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };
  ///////////////////////////////////////////////////////////
  function handleBlur(name, setValue) {
    return (e) => {
      let updatedValue = e.target.innerText.trim();
      if (name === "date") {
        try {
          const newDate = new Date(updatedValue).toISOString();
        } catch (error) {
          console.error("Failed to parse datetime:", error);

          return;
        }
      }

      setValue(updatedValue);
      const updatedEventData = { ...event, [name]: updatedValue };
      updateEvent(event._id, updatedEventData);
    };
  }
  useEffect(() => {
    setTitle(event.title);
    setNotes(event.notes);
    setDate(formatDateString(event.date));
  }, [event.title, event.notes, event.date]);
  return (
    <div
      id="allevent"
      className={event.important ? "importantEvent" : "regularEvent"}
    >
      <button id="eventDeleteButton" onClick={() => deleteEvent(event._id)}>
        <MdDeleteForever id="bin" />
      </button>
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
      <div id="tags">
        {themes.map((tag, index) => (
          <div
            key={`${event._id}-${index}`}
            className="eventTags"
            contentEditable={true}
            onBlur={(e) => handleThemeEdit(index, e.currentTarget.textContent)}
            suppressContentEditableWarning={true}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
