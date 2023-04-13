export default class QueryBuilder {
  queryString;

  method;

  constructor() {
    this.queryString = '';
    this.method = '';
  }

  select(columns) {
    this.queryString = 'SELECT ';
    this.method = 'SELECT';
    if (Array.isArray(columns)) {
      this.queryString += columns.join(', ');
    } else if (!columns || columns === '*') {
      this.queryString += '*';
    } else {
      throw new Error('Invalid column choice');
    }
    this.queryString += ' ';

    return this;
  }

  delete() {
    this.queryString = 'DELETE ';
    this.method = 'DELETE';
    return this;
  }

  from(table) {
    if (this.method === 'SELECT' || this.method === 'DELETE') {
      this.queryString += `FROM ${table} `;
    } else {
      throw new Error('Unexpected keyword FROM');
    }

    return this;
  }

  where(column, operator, value) {
    if (column && operator && (value !== undefined)) {
      let queryValue;
      if (typeof value === 'number') {
        queryValue = value.toString(10);
      } else if (typeof value === 'string') {
        queryValue = `"${value}"`;
      } else {
        throw new Error(`Unsupported type ${typeof value} in WHERE clause`);
      }
      this.queryString += `WHERE ${column} ${operator} ${queryValue}`;
    } else {
      throw new Error('Expected column, operator, and value in WHERE clause');
    }

    return this;
  }

  limit(numLimit) {
    if (typeof numLimit === 'number') {
      this.queryString += `LIMIT ${numLimit} `;
    } else if (typeof numLimit === 'string') {
      const stringToNumberLimit = Number(numLimit);
      if (Number.isInteger(stringToNumberLimit)) {
        this.queryString += `LIMIT ${stringToNumberLimit} `;
      }
    }

    return this;
  }

  offset(numOffset) {
    if (typeof numOffset === 'number') {
      this.queryString += `OFFSET ${numOffset} `;
    } else if (typeof numOffset === 'string') {
      const stringToNumberOffset = Number(numOffset);
      if (Number.isInteger(stringToNumberOffset)) {
        this.queryString += `LIMIT ${stringToNumberOffset} `;
      }
    }

    return this;
  }
}
