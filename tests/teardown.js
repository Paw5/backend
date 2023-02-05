import { endConnection } from '../connection.js';

export default async () => {
  (await endConnection());
};
