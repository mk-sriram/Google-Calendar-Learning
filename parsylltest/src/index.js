import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createClient} from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
const supabaseUrl = 'https://ggonlwuwbkborocvvovp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <App />
    </SessionContextProvider >
  </React.StrictMode>
);
