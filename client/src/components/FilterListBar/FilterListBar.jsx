import React from "react";
import apiService from "../../ApiService";

export default function FilterListBar({ eventsList, setEventsList }) {
  async function sortImportants() {
    setEventsList(eventsList.filter((event) => event.important === true));
  }
  async function showAllEvents() {
    setEventsList(await apiService.getList());
  }

  return (
    <div id="listBar">
      <button onClick={sortImportants}>Iportant events</button>
      <button onClick={showAllEvents}>All events</button>
    </div>
  );
}
