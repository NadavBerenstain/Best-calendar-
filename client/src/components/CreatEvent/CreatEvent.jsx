import React from "react";
import apiService from "../../ApiService";
import "./CreatEvent.css";

function CreatEvent({ Event, setEvent, setEventList, setBaseList }) {
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    // For fields that are not checkboxes, use value. For checkboxes, use checked.
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
    } catch (error) {
      console.error("Error adding event:", error);
    }
    setEvent({ title: "", date: "", notes: "", important: false });
    await apiService.getList();
  }

  return (
    // <div id="theForm">
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
      <div id="formImportant" className="notes">
        <label>IMPORTANT</label>
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
    // </div>
  );
}

export default CreatEvent;
