
import './App.css';
import { useState } from 'react';
import React from 'react';
import { useSession, useSupabaseClient ,useSessionContext} from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker'; 



function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [description, setEventDescription] = useState("");

  //date time picker is specifically made ot work with the date timeof the states from the start of the code to the end of the code

  const session = useSession(); //curent active tokens are stores inside here // tokens 
  const supabase = useSupabaseClient(); //talking to supbase 
  const { isLoading } = useSessionContext(); //loading state 

  if ( isLoading){
    return <></>
  } //rpevents flickering of the page when loading in the main session, from the loadout session 
  async function signIn() { 
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        //oauth scopes of the provider 
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    }); 

    if ( error ){
      alert ("error logging in to supbase ");
      console.log(error); 
    }
  }


  async function signOut() { 
    await supabase.auth.signOut(); 
  }

  const events = [
    { eventName: "Team Meeting", description: "Weekly team sync", start: new Date(2024, 5, 15, 9, 0), end: new Date(2024, 5, 15, 10, 0) },
    { eventName: "Project Deadline", description: "Final project submission", start: new Date(2024, 5, 20, 17, 0), end: new Date(2024, 5, 20, 18, 0) },
    // More events can be added here
  ];
  
  const postAllEvents = async () => {
    for (const event of events) {
      const { eventName, description, start, end } = event;
      const calendarEvent = {
        summary: eventName,
        description: description,
        start: { dateTime: start.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        end: { dateTime: end.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
      };

      try {
        const response = await fetch('http://localhost:5000/create-events', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${session.provider_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(calendarEvent)
        });
        const data = await response.json();
        console.log('Event Created', data);
      } catch (error) {
        console.error('Error creating event', error);
      }
    }
    alert('All events created');
  };
    

  
  console.log(session); 
  console.log(start); 
  console.log(eventName);
  console.log(description); 
  return (
    <div className="App">
      <h1> HELLLO USER </h1>
      <div style = {{width: "400", margin: "30px auto"}}>
        {session ? 
        <> 
          <h2> hey there {session.user.email} </h2>
          <button onClick = { () => postAllEvents()}>ADD EVENTS  </button>
          <button onClick = { () => parseFiles()}> ADD FILES  </button>
          <button onClick={ () => signOut()} > Sign out </button>
        </>
       
        :
        <> 
        <button onClick={ () => signIn()} > Sign in with Google </button>
        </>
        }
      </div>

    </div>
  );
}

export default App;
