export const endpoints = {
  users: ['GET'],
  pets: ['GET'],
  'pets/\\d+': ['POST'],
  'pets/\\d+/\\d+': ['PATCH'],
  exercise: ['GET'],
  meals: ['GET'],
  'meals/\\d+': ['GET'],
  reminders: ['GET'],
  'reminders/\\d+': ['GET'],
  'records/\\d+': ['POST'],
};

export const checkEndpoints = (url, method) => {
  if (endpoints[url] && endpoints[url].includes(method)) return true;
  const matching = Object
    .keys(endpoints)
    .filter((endpoint) => url.match(RegExp(`^${endpoint}$`, 'g')) && endpoints[endpoint].includes(method));
  console.log(matching.length);
  return matching.length > 0;
};
