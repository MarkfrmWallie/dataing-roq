import { MatchInterface } from 'interfaces/match';
import { GetQueryInterface } from 'interfaces';

export interface DateScheduleInterface {
  id?: string;
  match_id?: string;
  date_time: any;
  created_at?: any;
  updated_at?: any;

  match?: MatchInterface;
  _count?: {};
}

export interface DateScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  match_id?: string;
}
