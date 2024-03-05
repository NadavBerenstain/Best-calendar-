import React, { useState } from "react";
import "./FilterListBar.css";

export default function FilterListBar({
  eventsList,
  setEventsList,
  baseList,
  themesList,
  // setThemesList,
}) {
  const [inputVal, setInputVal] = useState(5);
  const [baseImportant, setBaseImportrant] = useState([]);
  const [importantClicked, setImportantClicked] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  ////////////////////////////////////////////////////////
  const [selectedTheme, setSelectedTheme] = useState("");

  function sortImportants() {
    setFromDate("");
    setUntilDate("");
    setSelectedTheme("");
    setEventsList(baseList.filter((event) => event.important === true));
    setBaseImportrant(baseList.filter((event) => event.important === true));
    setImportantClicked(true);
  }
  function showAllEvents() {
    setFromDate("");
    setUntilDate("");
    setSelectedTheme("");
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
  function sortFrom(e) {
    console.log("event:", e);
    setFromDate(e.target.value);
    setEventsList(eventsList.filter((event) => event.date > e.target.value));
  }
  function sortUntil(e) {
    setUntilDate(e.target.value);
    setEventsList(eventsList.filter((event) => event.date < e.target.value));
  }
  function sortByTheme(theme) {
    setEventsList(baseList.filter((event) => event.theme.includes(theme))); // event.theme.include(theme)
  }
  /////////////////////////////////////////////////////////////////////////////////
  function handleThemeSelection(e) {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    sortByTheme(newTheme);
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  return (
    // <div id="listBar">
    <div id="barFunc">
      <button className="filtterButtons" onClick={sortImportants}>
        Iportants
      </button>
      <div id="timeRange">
        <div id="from">
          <label>from: </label>
          <input
            name="from"
            type="datetime-local"
            id="fromDate"
            value={fromDate}
            onChange={(e) => sortFrom(e)}
          />
        </div>
        <div id="until">
          <label>until: </label>
          <input
            name="until"
            type="datetime-local"
            id="untilDate"
            value={untilDate}
            onChange={(e) => sortUntil(e)}
          />
        </div>
      </div>

      <div id="amout">
        <label>Display amount:</label>
        <input
          id="amoutInput"
          className="numOfEvents"
          value={inputVal}
          onChange={handleInputChange}
          type="number"
          min={1}
          max={importantClicked ? baseImportant.length : baseList.length}
        />
      </div>
      <div id="findTheme">
        <label> Find theme:</label>
        <select
          id="themesDropdown"
          value={selectedTheme}
          onChange={handleThemeSelection}
        >
          <option value="" disabled>
            Select a theme...
          </option>
          {themesList.map((theme, index) => (
            <option key={index} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <button className="filtterButtons" onClick={showAllEvents}>
        Show all
      </button>
    </div>
  );
}
