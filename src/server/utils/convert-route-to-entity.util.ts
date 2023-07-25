const mapping: Record<string, string> = {
  'data-sources': 'data_source',
  'date-schedules': 'date_schedule',
  matches: 'match',
  startups: 'startup',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
