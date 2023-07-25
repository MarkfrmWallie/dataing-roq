import * as yup from 'yup';

export const matchValidationSchema = yup.object().shape({
  user_id1: yup.string().nullable(),
  user_id2: yup.string().nullable(),
});
