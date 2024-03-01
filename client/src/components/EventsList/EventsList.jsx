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
}) {
  return (
    <div id="list" className="eventsList">
      <FilterListBar
        baseList={baseList}
        eventsList={eventsList}
        setEventsList={setEventsList}
      ></FilterListBar>
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
