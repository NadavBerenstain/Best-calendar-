import React, { useState, useEffect } from "react";
import "./FilterListBar.css";
import apiService from "../../ApiService";

export default function FilterListBar({ eventsList, setEventsList, baseList }) {
  const [inputVal, setInputVal] = useState();
  const [baseImportant, setBaseImportrant] = useState(0);

  function sortImportants() {
    setEventsList(baseList.filter((event) => event.important === true));
    if (
      eventsList.length !==
      eventsList.filter((event) => event.important === true).length
    ) {
      setBaseImportrant(eventsList.filter((event) => event.important === true));
    }
  }
  async function showAllEvents() {
    setEventsList(await apiService.getList());
  }
  function showNumEvents(newValue) {
    setEventsList(baseList.slice(0, newValue));
  }
  function showNumOfImportantEvents(newValue) {
    setEventsList(baseImportant.slice(0, newValue));
  }
  function handleInputChange(e) {
    const newValue = Number(e.target.value);
    setInputVal(newValue);
    if (
      eventsList.length ===
      eventsList.filter((event) => event.important === true).length
    ) {
      showNumOfImportantEvents(newValue);
    } else {
      showNumEvents(newValue);
    }
  }
  useEffect(() => {
    showNumEvents();
  }, []);
  return (
    <div id="listBar">
      <h3 id="barTitle">filter events:</h3>

      <div id="barFunc">
        <button onClick={sortImportants}>Iportants</button>
        <div>
          <label>Display amount:</label>
          <input
            className="numOfEvents"
            value={inputVal}
            onChange={handleInputChange}
            type="number"
            min={0}
            max={
              eventsList.length ===
              eventsList.filter((event) => event.important === true).length
                ? baseImportant.length
                : baseList.length
            }
          />
        </div>
        <button onClick={showAllEvents}>Show all</button>
      </div>
    </div>
  );
}
