import { describe, expect } from '@jest/globals';

// import Database from '../Database.js';

import { prepareQuery } from '../routers/Vaccinations.js';

// const db = Database();

// const mockDB = [[]];

describe('test GET /records queries', () => {
  const req1 = {
    query: {
      medical_record_id: 183,
      fields: '',
      limit: '',
      page: '0',
    },
  };

  test('prepare query: specific pet', () => {
    const {
      fields, limit, page, ...filterParams
    } = req1.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM vaccinations WHERE medical_record_id=? LIMIT 20');
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
    expect(query).toEqual('SELECT * FROM vaccinations  LIMIT 20');
  });

  const req3 = {
    query: {
      fields: '',
      limit: '4',
      page: '',
    },
  };

  test('prepare query: specific limit', () => {
    const {
      fields, limit, page, ...filterParams
    } = req3.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM vaccinations  LIMIT 4');
  });

  const req4 = {
    query: {
      fields: 'medical_record_id',
      limit: '',
      page: '',
    },
  };

  test('prepare query: specific field', () => {
    const {
      fields, limit, page, ...filterParams
    } = req4.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `medical_record_id` FROM vaccinations  LIMIT 20');
  });

  const req5 = {
    query: {
      fields: '',
      limit: '',
      page: '2',
    },
  };

  test('prepare query: specific page', () => {
    const {
      fields, limit, page, ...filterParams
    } = req5.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM vaccinations  LIMIT 20 OFFSET 20');
  });

  const req6 = {
    query: {
      medical_record_id: '183',
      fields: 'medical_record_id, vaccination_id',
      limit: '',
      page: '',
    },
  };

  test('prepare query: specific params and fields', () => {
    const {
      fields, limit, page, ...filterParams
    } = req6.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `medical_record_id`,`vaccination_id` FROM vaccinations WHERE medical_record_id=? LIMIT 20');
  });

  const req7 = {
    query: {
      medical_record_id: '183',
      fields: '',
      limit: '3',
      page: '',
    },
  };

  test('prepare query: specific params and limit', () => {
    const {
      fields, limit, page, ...filterParams
    } = req7.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM vaccinations WHERE medical_record_id=? LIMIT 3');
  });

  const req8 = {
    query: {
      medical_record_id: '183',
      fields: '',
      limit: '',
      page: '2',
    },
  };

  test('prepare query: specific params and page', () => {
    const {
      fields, limit, page, ...filterParams
    } = req8.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT * FROM vaccinations WHERE medical_record_id=? LIMIT 20 OFFSET 20');
  });

  const req9 = {
    query: {
      medical_record_id: '183',
      fields: 'medical_record_id, vaccination_id',
      limit: '3',
      page: '3',
    },
  };

  test('prepare query: all options used', () => {
    const {
      fields, limit, page, ...filterParams
    } = req9.query;
    const query = prepareQuery(fields, limit, page, filterParams);
    expect(query).toEqual('SELECT `medical_record_id`,`vaccination_id` FROM vaccinations WHERE medical_record_id=? LIMIT 3 OFFSET 6');
  });
});
