export const endpoints = {
  users: ['GET'],
  pets: ['GET'],
  'pets/\\d+': ['POST', 'GET'],
  'pets/\\d+/\\d+': ['PATCH', 'DELETE'],
  exercise: ['GET'],
  'exercise/\\d+': ['POST', 'DELETE'],
  meals: ['GET'],
  'meals/\\d+': ['GET'],
  vaccinations: ['GET'],
  'vaccinations/\\d+': ['POST'],
  login: ['GET', 'POST'],
  reminders: ['GET'],
  'reminders/\\d+': ['POST', 'DELETE'],
  records: ['GET'],
  'records/\\d+': ['POST'],
  events: ['GET'],
  'events/\\d+': ['POST', 'DELETE'],
  'pics/[^/]+': ['POST', 'GET'],
  'pics/[^/]+/[^/]+/[^/]+': ['POST', 'GET'],
  locations: ['GET', 'POST'],
  reviews: ['GET'],
  'reviews/\\d+': ['POST'],
  posts: ['GET'],
  'posts/\\d+': ['POST', 'DELETE'],
  tags: ['GET'],
  'tags/\\d+': ['POST', 'DELETE'],
};

export const checkEndpoints = (url, method) => {
  if (endpoints[url] && endpoints[url].includes(method)) return true;
  const matching = Object
    .keys(endpoints)
    .filter((endpoint) => url.match(RegExp(`^${endpoint}$`, 'g')) && endpoints[endpoint].includes(method));
  return matching.length > 0;
};
