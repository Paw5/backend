import express, { json, raw, urlencoded } from 'express';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import RateLimit from 'express-rate-limit';
import users from './routers/Users.js';
import { MS_PER_MINUTE } from './util/constants.js';
import middleware from './middleware.js';
import pets from './routers/Pets.js';
import exercise from './routers/Exercise.js';
import meals from './routers/Meals.js';
import vaccinations from './routers/Vaccinations.js';
import reminders from './routers/Reminders.js';
import records from './routers/Records.js';
import pics from './routers/Pics.js';
import reviews from './routers/Reviews.js';
import locations from './routers/Locations.js';
import events from './routers/Events.js';
import posts from './routers/Posts.js';
import tags from './routers/Tags.js';

const app = express();

app.use(RateLimit({
  windowMs: MS_PER_MINUTE,
  max: 100,
}));

// app.use(json());
// app.use(bodyParser.raw());
app.use(urlencoded({ extended: true }));
app.use(raw({ type: 'image/*' }));
app.use(json({ type: 'application/*' }));

createServer({
  key: readFileSync('./secrets/key.pem'),
  cert: readFileSync('./secrets/cert.pem'),
}, app).listen(443, () => {
  console.log('server is running on port 443');
});

app.use(middleware);

app.use('/users', users);

app.use('/pets', pets);

app.use('/exercise', exercise);

app.use('/meals', meals);

app.use('/vaccinations', vaccinations);

app.use('/reminders', reminders);

app.use('/records', records);

app.use('/locations', locations);

app.use('/events', events);

app.use('/pics', pics);

app.use('/reviews', reviews);

app.use('/locations', locations);

app.use('/posts', posts);

app.use('/tags', tags);
