import { describe, expect } from '@jest/globals';

// import Database from '../Database.js';

import { prepareQuery } from '../routers/Pets.js';

// const db = Database();

// const mockDB = [[]];

describe('test GET /pets queries', () => {
  const req1 = {
    query: {
      user_id: 183,
      fields: '',
      limit: '',
      page: '0',
    },
  };

  test('prepare query: specific user', () => {
    const {
      fields, limit, page, ...filterParams
    } = req1.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets WHERE user_id=? LIMIT 20');
  });

  const req2 = {
    query: {
      fields: '',
      limit: '',
      page: '',
    },
  };

  test('prepare query: no params', () => {
    const {
      fields, limit, page, ...filterParams
    } = req2.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets  LIMIT 20');
  });

  const req3 = {
    query: {
      fields: '',
      limit: '4',
      page: '',
    },
  };

  test('prepare query: specifc limit', () => {
    const {
      fields, limit, page, ...filterParams
    } = req3.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets  LIMIT 4');
  });

  const req4 = {
    query: {
      fields: 'pet_id',
      limit: '',
      page: '',
    },
  };

  test('prepare query: specifc field', () => {
    const {
      fields, limit, page, ...filterParams
    } = req4.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `pet_id` FROM pets  LIMIT 20');
  });

  const req5 = {
    query: {
      fields: '',
      limit: '',
      page: '2',
    },
  };

  test('prepare query: specifc page', () => {
    const {
      fields, limit, page, ...filterParams
    } = req5.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets  LIMIT 20 OFFSET 20');
  });

  const req6 = {
    query: {
      user_id: '183',
      fields: 'pet_id, user_id',
      limit: '',
      page: '',
    },
  };

  test('prepare query: specifc params and fields', () => {
    const {
      fields, limit, page, ...filterParams
    } = req6.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `pet_id`,`user_id` FROM pets WHERE user_id=? LIMIT 20');
  });

  const req7 = {
    query: {
      user_id: '183',
      fields: '',
      limit: '3',
      page: '',
    },
  };

  test('prepare query: specifc params and limit', () => {
    const {
      fields, limit, page, ...filterParams
    } = req7.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets WHERE user_id=? LIMIT 3');
  });

  const req8 = {
    query: {
      user_id: '183',
      fields: '',
      limit: '',
      page: '2',
    },
  };

  test('prepare query: specifc params and page', () => {
    const {
      fields, limit, page, ...filterParams
    } = req8.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM pets WHERE user_id=? LIMIT 20 OFFSET 20');
  });

  const req9 = {
    query: {
      user_id: '183',
      fields: 'pet_id, user_id',
      limit: '3',
      page: '3',
    },
  };

  test('prepare query: all options used', () => {
    const {
      fields, limit, page, ...filterParams
    } = req9.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `pet_id`,`user_id` FROM pets WHERE user_id=? LIMIT 3 OFFSET 6');
  });
});
