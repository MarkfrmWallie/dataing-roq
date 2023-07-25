import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getDateScheduleById, updateDateScheduleById } from 'apiSdk/date-schedules';
import { dateScheduleValidationSchema } from 'validationSchema/date-schedules';
import { DateScheduleInterface } from 'interfaces/date-schedule';
import { MatchInterface } from 'interfaces/match';
import { getMatches } from 'apiSdk/matches';

function DateScheduleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<DateScheduleInterface>(
    () => (id ? `/date-schedules/${id}` : null),
    () => getDateScheduleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DateScheduleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDateScheduleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/date-schedules');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<DateScheduleInterface>({
    initialValues: data,
    validationSchema: dateScheduleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Date Schedules',
              link: '/date-schedules',
            },
            {
              label: 'Update Date Schedule',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Date Schedule
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_time ? new Date(formik.values?.date_time) : null}
              onChange={(value: Date) => formik.setFieldValue('date_time', value)}
            />
          </FormControl>
          <AsyncSelect<MatchInterface>
            formik={formik}
            name={'match_id'}
            label={'Select Match'}
            placeholder={'Select Match'}
            fetcher={getMatches}
            labelField={'id'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/date-schedules')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'date_schedule',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DateScheduleEditPage);
