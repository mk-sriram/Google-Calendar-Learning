import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
function App() {
  const session = useSession(); //curent active tokens are stores inside here // tokens 
  const supabase = useSupabaseClient(); //talking to supbase 

  async function signIn() { 
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        //oauth scopes of the provider 
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    }); 

    if ( error ){
      alert ("error logging in to supbasea ");
      console.log(error); 
    }
  }

  async function signOut() { 
    await supabase.auth.signOut(); 
  }
  console.log(session); 
  return (
    <div className="App">
      <h1> HELLO </h1>
      <div style = {{width: "400", margin: "30px auto"}}>
        {session ? 
        <> 
          <h2> hey there {session.user.email} </h2>
          <button onClick={ () => signOut()} > Sign in with Google </button>
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
