import React, { useState } from "react";
import "./FilterListBar.css";
import moment from "moment";

export default function FilterListBar({
  eventsList,
  setEventsList,
  baseList,
  fromDate,
  setFromDate,
  untilDate,
  setUntilDate,
}) {
  const [inputVal, setInputVal] = useState(5);
  const [baseImportant, setBaseImportrant] = useState([]);
  const [importantClicked, setImportantClicked] = useState(false);

  function sortImportants() {
    setEventsList(baseList.filter((event) => event.important === true));
    setBaseImportrant(baseList.filter((event) => event.important === true));
    setImportantClicked(true);
  }
  function showAllEvents() {
    setEventsList(baseList);
    setImportantClicked(false);
  }
  function showNumEvents(newValue) {
    setEventsList(baseList.slice(0, newValue));
  }
  function showNumOfImportantEvents(newValue) {
    sortFrom();
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
  function sortFrom(e) {
    setFromDate(e.target.value);
    setEventsList(eventsList.filter((event) => event.date > e.target.value));
  }
  function sortUntil(e) {
    setUntilDate(e.target.value);
    setEventsList(eventsList.filter((event) => event.date < e.target.value));
  }

  return (
    <div id="listBar">
      <h3 id="barTitle">filter events:</h3>

      <div id="barFunc">
        <button className="filtterButtons" onClick={sortImportants}>
          Iportants
        </button>

        <label>from</label>
        <input
          name="from"
          type="datetime-local"
          id="fromDate"
          value={fromDate}
          onChange={(e) => sortFrom(e)}
        />
        <label>until</label>
        <input
          name="until"
          type="datetime-local"
          id="untilDate"
          value={untilDate}
          onChange={(e) => sortUntil(e)}
        />

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
        <button className="filtterButtons" onClick={showAllEvents}>
          Show all
        </button>
      </div>
    </div>
  );
}
