import { Router } from 'express';
import { S3Client, PutObjectCommand, GetObjectCommand, NoSuchKey } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });

const Pics = Router();

Pics.post('/:fileName', async (req, res) => {
  const { fileName } = req.params;

  const input = {
    Bucket: 'paw5-cdn',
    Key: fileName,
    Body: req.body,
    ContentType: req.headers['content-type'],
  };

  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  try {
    await client.send(new GetObjectCommand({
      Bucket: 'paw5-cdn',
      Key: fileName,
    }));
    res.status(201).json(response);
  } catch (e) {
    if (e instanceof NoSuchKey) {
      res.status(400).send(e.message);
    } else {
      res.sendStatus(400);
    }
  }
});

Pics.get('/:fileName', async (req, res) => {
  const { fileName } = req.params;
  
  const input = {
    Bucket: 'paw5-cdn',
    Key: fileName,
  };

  try {
    const { Body, ContentType } = await client.send(new GetObjectCommand(input));
    const chunks = [];
    for await (const chunk of Body) {
      chunks.push(chunk);
    }
    const responseBuffer = Buffer.concat(chunks);
    res.type(ContentType).send(responseBuffer);
  } catch (e) {
    if (e instanceof NoSuchKey) {
      res.status(404).send(e.message);
    } else {
      res.sendStatus(400);
      console.log(e);
    }
  }
});

Pics.post('/:table/:id/:fileName', async (req, res) => {
  const tables = {
    locations: { key: 'id' },
    comments: { key: 'comment_id' },
    events: { key: 'event_id' },
    pets: { key: 'pet_id' },
    posts: { key: 'post_id' },
    reminders: { key: 'reminder_id' },
    reviews: { key: 'review_id' },
    users: { key: 'user_id' },
  };
  const { table, id, fileName } = req.params;
  const idNum = Number(id);
  const fileNameVerified = /^[a-zA-Z0-9\-\_\.]+$/.test(fileName);
  if (!tables[table]) {
    res.status(400).send('Invalid table ' + encodeURIComponent(table) + ' provided.');
    return;
  }
  if (!Number.isSafeInteger(idNum)) {
    res.status(400).send('Invalid primary key ' + encodeURIComponent(idNum) + ' provided in table ' + encodeURIComponent(table));
    return;
  }
  if (!fileNameVerified) {
    res.status(400).send('Invalid file name ' + encodeURIComponent(fileName) + ' provided. Please only use alphanumeric characters, plus any of: .-_');
    return;
  }

  const input = {
    Bucket: 'paw5-cdn',
    Key: table + '/' + id + '/' + fileName,
    Body: req.body,
    ContentType: req.headers['content-type'],
  };

  const command = new PutObjectCommand(input);
  const response = await client.send(command);
  try {
    await client.send(new GetObjectCommand({
      Bucket: 'paw5-cdn',
      Key: table + '/' + id + '/' + fileName,
    }));
    res.status(201).json(response);
  } catch (e) {
    if (e instanceof NoSuchKey) {
      res.status(400).send(e.message);
    } else {
      res.sendStatus(400);
    }
  }
});

Pics.get('/:table/:id/:fileName', async (req, res) => {
  const tables = {
    locations: { key: 'id' },
    comments: { key: 'comment_id' },
    events: { key: 'event_id' },
    pets: { key: 'pet_id' },
    posts: { key: 'post_id' },
    reminders: { key: 'reminder_id' },
    reviews: { key: 'review_id' },
    users: { key: 'user_id' },
  };
  const { table, id, fileName } = req.params;
  const idNum = Number(id);
  const fileNameVerified = /^[a-zA-Z0-9\-\_\.]+$/.test(fileName);
  if (!tables[table]) {
    res.status(400).send('Invalid table ' + encodeURIComponent(table) + ' provided.');
    return;
  }
  if (!Number.isSafeInteger(idNum)) {
    res.status(400).send('Invalid primary key ' + encodeURIComponent(idNum) + ' provided in table ' + encodeURIComponent(table));
    return;
  }
  if (!fileNameVerified) {
    res.status(400).send('Invalid file name ' + encodeURIComponent(fileName) + ' provided. Please only use alphanumeric characters, plus any of: .-_');
    return;
  }

  const input = {
    Bucket: 'paw5-cdn',
    Key: table + '/' + id + '/' + fileName,
  };
  
  try {
    const { Body, ContentType } = await client.send(new GetObjectCommand(input));
    const chunks = [];
    for await (const chunk of Body) {
      chunks.push(chunk);
    }
    const responseBuffer = Buffer.concat(chunks);
    res.type(ContentType).send(responseBuffer);
  } catch (e) {
    if (e instanceof NoSuchKey) {
      res.status(404).send(e.message);
    } else {
      res.sendStatus(400);
      console.log(e);
    }
  }
});

export default Pics;
