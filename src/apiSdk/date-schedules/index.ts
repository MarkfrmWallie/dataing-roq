import axios from 'axios';
import queryString from 'query-string';
import { DateScheduleInterface, DateScheduleGetQueryInterface } from 'interfaces/date-schedule';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDateSchedules = async (
  query?: DateScheduleGetQueryInterface,
): Promise<PaginatedInterface<DateScheduleInterface>> => {
  const response = await axios.get('/api/date-schedules', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDateSchedule = async (dateSchedule: DateScheduleInterface) => {
  const response = await axios.post('/api/date-schedules', dateSchedule);
  return response.data;
};

export const updateDateScheduleById = async (id: string, dateSchedule: DateScheduleInterface) => {
  const response = await axios.put(`/api/date-schedules/${id}`, dateSchedule);
  return response.data;
};

export const getDateScheduleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/date-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDateScheduleById = async (id: string) => {
  const response = await axios.delete(`/api/date-schedules/${id}`);
  return response.data;
};
