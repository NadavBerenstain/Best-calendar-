import React, { useState, useEffect } from "react";
import "./FilterListBar.css";
import apiService from "../../ApiService";

export default function FilterListBar({ eventsList, setEventsList, baseList }) {
  const [inputVal, setInputVal] = useState(5);
  const [baseImportant, setBaseImportrant] = useState([]);
  const [importantClicked, setImportantClicked] = useState(false);

  function sortImportants() {
    setEventsList(baseList.filter((event) => event.important === true));
    setBaseImportrant(eventsList.filter((event) => event.important === true));
    setImportantClicked(true);
  }
  async function showAllEvents() {
    setEventsList(await apiService.getList());
    setImportantClicked(false);
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
    if (importantClicked) {
      showNumOfImportantEvents(newValue);
    } else {
      showNumEvents(newValue);
    }
  }
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
            min={1}
            max={importantClicked ? baseImportant.length : baseList.length}
          />
        </div>
        <button onClick={showAllEvents}>Show all</button>
      </div>
    </div>
  );
}
