import { expect, jest } from '@jest/globals';

//import Database from '../Database.js';

import { prepareQuery } from '../routers/Pets.js';

//const db = Database();

//const mockDB = [[]];

const req1 = {
  query: {
    filterParams: 'user_id=183',
    fields: '*',
    limit: '3',
    page: '0',
  },
};

test('prepare query: specific user', () => {
  const query = prepareQuery(req1);
  expect(query).toEqual('SELECT * FROM pets  WHERE user_id=183 LIMIT 3');
});

const req2 = {
  query: {
    filterParams: '',
    fields: '',
    limit: '',
    page: '',
  },
};

test('prepare query: no params', () => {
  const query = prepareQuery(req2);
  expect(query).toEqual('SELECT * FROM pets  LIMIT 20');
});

const req3 = {
  query: {
    filterParams: '',
    fields: '',
    limit: '4',
    page: '',
  },
};

test('prepare query: specifc limit', () => {
  const query = prepareQuery(req3);
  expect(query).toEqual('SELECT * FROM pets  LIMIT 4');
});

const req4 = {
  query: {
    filterParams: '',
    fields: 'pet_id',
    limit: '',
    page: '',
  },
};

test('prepare query: specifc field', () => {
  const query = prepareQuery(req4);
  expect(query).toEqual('SELECT pet_id FROM pets  LIMIT 20');
});

const req5 = {
  query: {
    filterParams: '',
    fields: '',
    limit: '',
    page: '2',
  },
};

test('prepare query: specifc page', () => {
  const query = prepareQuery(req5);
  expect(query).toEqual('SELECT * FROM pets  LIMIT 20 OFFSET 20');
});

const req6 = {
  query: {
    filterParams: 'user_id=183',
    fields: 'pet_id, user_id',
    limit: '',
    page: '',
  },
};

test('prepare query: specifc params and fields', () => {
  const query = prepareQuery(req6);
  expect(query).toEqual('SELECT pet_id, user_id FROM pets  WHERE user_id=183 LIMIT 20');
});

const req7 = {
  query: {
    filterParams: 'user_id=183',
    fields: '',
    limit: '3',
    page: '',
  },
};

test('prepare query: specifc params and limit', () => {
  const query = prepareQuery(req7);
  expect(query).toEqual('SELECT * FROM pets  WHERE user_id=183 LIMIT 3');
});

const req8 = {
  query: {
    filterParams: 'user_id=183',
    fields: '',
    limit: '',
    page: '2',
  },
};

test('prepare query: specifc params and page', () => {
  const query = prepareQuery(req8);
  expect(query).toEqual('SELECT * FROM pets  WHERE user_id=183 LIMIT 20 OFFSET 20');
});

const req9 = {
  query: {
    filterParams: 'user_id=183',
    fields: 'pet_id, user_id',
    limit: '3',
    page: '3',
  },
};

test('prepare query: all options used', () => {
  const query = prepareQuery(req9);
  expect(query).toEqual('SELECT pet_id, user_id FROM pets  WHERE user_id=183 LIMIT 3 OFFSET 6');
});