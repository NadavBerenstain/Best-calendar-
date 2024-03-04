import React from "react";
import "./EventsList.css";
import { v4 as uuidv4 } from "uuid";
import Event from "../Event/Event";
import FilterListBar from "../FilterListBar/FilterListBar";

export default function EventsList({
  eventsList,
  setEventsList,
  baseList,
  setBaseList,
  fromDate,
  setFromDate,
  untilDate,
  setUntilDate,
}) {
  return (
    <div id="list" className="eventsList">
      <div id="filterListBar">
        <FilterListBar
          baseList={baseList}
          eventsList={eventsList}
          setEventsList={setEventsList}
          fromDate={fromDate}
          setFromDate={setFromDate}
          untilDate={untilDate}
          setUntilDate={setUntilDate}
        ></FilterListBar>
      </div>
      {eventsList.map((event) => {
        return (
          <Event
            key={event._id}
            setBaseList={setBaseList}
            event={event}
            setEventsList={setEventsList}
          ></Event>
        );
      })}
    </div>
  );
}
