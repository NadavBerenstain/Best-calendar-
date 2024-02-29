import { useState, useEffect } from "react";
import "./App.css";
import apiService from "./ApiService";
import EventsList from "./components/EventsList/EventsList";
import Nav from "./components/Nav/Nav";
import CreatEvent from "./components/CreatEvent/CreatEvent";

function App() {
  const [Event, setEvent] = useState({
    title: "",
    date: "",
    notes: "",
    important: false,
  });
  const [eventsList, setEventsList] = useState([]);

  const BASE_URL = "http://localhost:3000/calendar";

  useEffect(() => {
    apiService
      .getList()
      .then((responseData) => {
        setEventsList(responseData);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error);
      });
  }, []);
  return (
    <>
      <Nav></Nav>
      <CreatEvent
        Event={Event}
        setEvent={setEvent}
        setEventList={setEventsList}
      ></CreatEvent>
      <EventsList eventsList={eventsList}></EventsList>
    </>
  );
}

export default App;
