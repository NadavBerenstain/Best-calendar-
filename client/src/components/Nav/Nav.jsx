import React from "react";
import "./Nav.css";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

export default function Nav() {
  ///////////////////////////////////////
  // add my logo
  /////////////////////////////////////////////////// for google
  const session = useSession(); // token! when sesstion exists: have a user
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("error loggin to google provider with supabase");
      console.log(error);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createCalendarEvent() {
    console.log("created!");
    const GoogleEvent = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(), // Date(obj).toISOString... ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(), // Date(obj).toISOString... ->
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "post",
        headers: {
          Authorization: "Bearer" + session.provider_token,
        },
        body: Json.stringify(GoogleEvent),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log("event created check google calender!!");
      });
  }

  console.log("this is the session:", session);
  //////////////////////////////
  return (
    <div id="login">
      {session ? (
        <>
          <h2>hey there {session.user.email}</h2>
          <p>start of testing google event</p>
          <DateTimePicker onChange={setStart} value={start} />
          <p>end of testing google event</p>
          <DateTimePicker onChange={setEnd} value={end} />
          <p>event name</p>
          <input
            onClick={(e) => {
              setEventName(e.target.value);
            }}
          />
          <p>event description</p>
          <input
            onClick={(e) => {
              setEventDescription(e.target.value);
            }}
          />
          <hr />
          <button
            onClick={() => {
              createCalendarEvent();
            }}
          >
            create calendar event
          </button>
          <p></p>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              googleSignIn();
            }}
          >
            Sign In with google
          </button>
        </>
      )}
    </div>
  );
}
