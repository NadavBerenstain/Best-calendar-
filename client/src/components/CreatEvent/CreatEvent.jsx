import React from "react";
import apiService from "../../ApiService";
import "./CreatEvent.css";

function CreatEvent({
  Event,
  setEvent,
  setEventList,
  setBaseList,
  themesList,
  setThemesList,
}) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setEvent({ ...Event, [name]: fieldValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await apiService.addEvent(Event);
      const updatedEventsList = await apiService.getList();
      setEventList(updatedEventsList);
      setBaseList(updatedEventsList);
      // setThemesList(themesList);
      const newThemes = Event.theme
        .split(",")
        .map((theme) => theme.trim())
        .filter((theme) => theme);
      const updatedThemesList = Array.from(
        new Set([...themesList, ...newThemes])
      );
      setThemesList(updatedThemesList);
    } catch (error) {
      console.error("Error adding event:", error);
    }
    setEvent({ title: "", date: "", notes: "", theme: [], important: false });
    await apiService.getList();
  }

  return (
    <form id="theForm" type="submit" onSubmit={handleSubmit}>
      <h3>New event</h3>
      <div id="formTitle" className="title">
        <label>TITLE</label>
        <input
          name="title"
          type="input"
          value={Event.title}
          onChange={handleChange}
          required
        />
      </div>
      <div id="formDate" className="date1">
        <label>DATE</label>
        <input
          name="date"
          type="datetime-local"
          id="dateInput"
          value={Event.date}
          onChange={handleChange}
          required
        />
      </div>
      <div id="formNotes" className="notes">
        <label>NOTES</label>
        <input
          name="notes"
          type="input"
          value={Event.notes}
          onChange={handleChange}
        />
      </div>
      <div id="formTheme" className="theme">
        <label>TAGS SEPARATE BY COMA</label>
        <input
          name="theme"
          type="input"
          value={Event.theme}
          onChange={handleChange}
        />
      </div>
      <div id="formImportant">
        <label id="importantLabel">IMPORTANT</label>
        <input
          name="important"
          type="checkbox"
          checked={Event.important}
          onChange={handleChange}
        />
      </div>
      <button id="theButton" type="submit">
        Create
      </button>
    </form>
  );
}

export default CreatEvent;
