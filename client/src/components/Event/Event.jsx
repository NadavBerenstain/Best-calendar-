import React from "react";
import "./Event.css";
import apiService from "../../ApiService";

export default function Event({ event, setEventsList }) {
  async function deleteEvent(id) {
    try {
      await apiService.deleteEvent(id);
      const resData = await apiService.getList();
      setEventsList(resData);
    } catch (error) {
      throw new Error(error);
    }
  }
  async function updateEvent(id, updatedEventData) {
    try {
      await apiService.updateEvent(id, updatedEventData);
      const resData = await apiService.getList();
      setEventsList(resData);
    } catch (error) {
      throw Error(error);
    }
  }
  //make each line a tuggeled button
  return (
    <div className="itemCon">
      <h2 className="title">{event.title}</h2>
      <div className="notes">{event.notes}</div>
      <div className="date">{event.date}</div>
      <button onClick={() => deleteEvent(event._id)}>X</button>
    </div>
  );
}
