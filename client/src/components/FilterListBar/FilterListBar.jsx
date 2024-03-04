import React, { useState } from "react";
import "./FilterListBar.css";
import moment from "moment";

export default function FilterListBar({ eventsList, setEventsList, baseList }) {
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
  function formatTimestamp(theDate) {}
  function sortByRange(from, until) {
    setEventsList(
      baseList.filter((event) => event.date < until && event.date > from)
    );
  }
  return (
    <div id="listBar">
      <h3 id="barTitle">filter events:</h3>
      {/* <h4>today is: {Date().slice(0, 15)}</h4> */}

      <div id="barFunc">
        <button className="filtterButtons" onClick={sortImportants}>
          Iportants
        </button>
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
