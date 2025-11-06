import * as yup from 'yup';

export const jobSchema = yup.object({
  title: yup.string().required('Job title is required').min(5, 'Title must be at least 5 characters'),
  company: yup.string().required('Company name is required').min(2, 'Company name too short'),
  location: yup.string().required('Location is required'),
  salary: yup.string().required('Salary range is required').matches(
    /^[0-9]+K\s*-\s*[0-9]+K$/,
    'Salary must be in format: "70K - 80K"'
  ),
  description: yup.string().required('Description is required').min(20, 'Description too short'),
});

export default jobSchema;