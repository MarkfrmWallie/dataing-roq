import * as yup from 'yup';

export const dateScheduleValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  match_id: yup.string().nullable(),
});
