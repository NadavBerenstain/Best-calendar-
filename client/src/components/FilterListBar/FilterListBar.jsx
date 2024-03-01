import React, { useState, useEffect } from "react";
import apiService from "../../ApiService";

export default function FilterListBar({ eventsList, setEventsList, baseList }) {
  const [inputVal, setInputVal] = useState();

  function sortImportants() {
    setEventsList(eventsList.filter((event) => event.important === true));
  }
  async function showAllEvents() {
    setEventsList(await apiService.getList());
  }
  function showNumEvents(newValue) {
    setEventsList(baseList.slice(0, newValue));
  }
  function handleInputChange(e) {
    // setEventsList(baseList);
    const newValue = Number(e.target.value);
    setInputVal(newValue);
    showNumEvents(newValue);
  }
  useEffect(() => {
    showNumEvents();
  }, []);
  return (
    <div id="listBar">
      <button onClick={sortImportants}>Iportant events</button>
      <button onClick={showAllEvents}>All events</button>
      <input
        className="numOfEvents"
        value={inputVal}
        onChange={handleInputChange}
        type="number"
        min={0}
        max={baseList.length}
      ></input>
    </div>
  );
}
