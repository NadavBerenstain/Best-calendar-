import { useState, useEffect } from "react";
import "./App.css";
import apiService from "./ApiService";
import EventsList from "./components/EventsList/EventsList";

function App() {
  const [event, setEvent] = useState({});
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
  console.log(eventsList);
  return (
    <>
      <EventsList event={event} setEventsList={setEventsList}></EventsList>
    </>
  );
}

export default App;
