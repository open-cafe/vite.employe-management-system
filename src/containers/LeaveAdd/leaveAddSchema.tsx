import * as yup from 'yup';

const schema = yup.object({
  type: yup.string().required('Leave Type is required'),
  reason: yup.string().required('Please enter the reason for your leave'),
  startDate: yup.date().required('Please enter start date'),
  endDate: yup
    .date()
    .required('Please enter end date')
    .test(
      'same_dates_test',
      'End date should be greater than start date',
      function (value) {
        const { startDate } = this.parent;
        return value.getTime() > startDate.getTime();
      }
    ),
});

export default schema;
