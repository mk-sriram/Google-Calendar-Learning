const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/create-events', async (req, res) => {
  const { events, providerToken } = req.body;

  try {
    for (const event of events) {
      const { eventName, description, start, end } = event;
      const calendarEvent = {
        summary: eventName,
        description: description,
        start: { dateTime: start, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
        end: { dateTime: end, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
      };

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${providerToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(calendarEvent)
      });

      const data = await response.json();
      console.log('Event Created', data);
    }
    res.status(200).send('All events created');
  } catch (error) {
    console.error('Error creating event', error);
    res.status(500).send('Error creating events');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
