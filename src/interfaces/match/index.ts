import { DateScheduleInterface } from 'interfaces/date-schedule';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MatchInterface {
  id?: string;
  user_id1?: string;
  user_id2?: string;
  created_at?: any;
  updated_at?: any;
  date_schedule?: DateScheduleInterface[];
  user_match_user_id1Touser?: UserInterface;
  user_match_user_id2Touser?: UserInterface;
  _count?: {
    date_schedule?: number;
  };
}

export interface MatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id1?: string;
  user_id2?: string;
}
