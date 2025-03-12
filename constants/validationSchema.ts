import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})

export const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
})

export const personalInfoValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    designation: Yup.string()
        .required('Designation is required'),
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^\+?[1-9]\d{8,16}$/, 'Invalid phone number'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    house: Yup.string()
        .required('House / Flat / Villa is required'),
    street: Yup.string()
        .required('Street / Road / Village is required'),
    country: Yup.string()
        .required('Country is required'),
    state: Yup.string()
        .required('State is required'),
    city: Yup.string()
        .required('City is required'),
    zipCode: Yup.string()
        .matches(/^\+?[0-9]\d{5,7}$/, 'Invalid Pin / Zip')
        .required('Pin / Zip is required'),
})

export const summaryValidationSchema = Yup.object().shape({
    summary: Yup.string()
        .required('Summary is required')
})

export const educationValidationSchema = Yup.object().shape({
    courseName: Yup.string()
        .min(2, 'Course name must be at least 2 characters')
        .required('Course name is required'),
    university: Yup.string()
        .min(2, 'University must be at least 2 characters')
        .required('University is required'),
    institution: Yup.string()
        .min(2, 'Institution must be at least 2 characters')
        .required('Institution is required'),
    joinDate: Yup.string()
        .required('Join date is required'),
    relieveDate: Yup.string()
        .required('Relieve date is required'),
    country: Yup.string()
        .required('Country is required'),
    state: Yup.string()
        .required('State is required'),
    city: Yup.string()
        .required('City is required'),
    marksIn: Yup.string(),
    marksInPer: Yup.string()
        .matches(/^(100(\.00?)?|[0-9]?\d(\.\d{1,2})?)$/, 'Invalid marks format'),
    marksInGpa: Yup.string()
        .matches(/^(?:[0-3](?:\.\d{1,2})?|4(?:\.0{1,2})?)$/, 'Invalid marks format'),
    marksInCgpa: Yup.string()
        .matches(/^(?:[0-9](?:\.\d{1,2})?|10(?:\.0{1,2})?)$/, 'Invalid marks format'),
    coreSubjects: Yup.array().of(Yup.string()),
    complimentarySubjects: Yup.array().of(Yup.string())
})

export const certificationValidationSchema = Yup.object().shape({
    courseName: Yup.string()
        .min(2, 'Course name must be at least 2 characters')
        .required('Course name is required'),
    institution: Yup.string()
        .min(2, 'Institution must be at least 2 characters')
        .required('Institution is required'),
    joinDate: Yup.string()
        .required('Join date is required'),
    relieveDate: Yup.string()
        .required('Relieve date is required'),
    country: Yup.string()
        .required('Country is required'),
    state: Yup.string()
        .required('State is required'),
    city: Yup.string()
        .required('City is required'),
    subjects: Yup.array().of(Yup.string())
})

export const skillsValidationSchema = Yup.object().shape({
    skillCategory: Yup.string()
        .min(2, 'Title must be at least 2 characters')
        .required('Title is required'),
    skills: Yup.array().of(Yup.string())
        .min(1, 'At least one skill is required'),
})

export const projectsValidationSchema = Yup.object().shape({
    projectName: Yup.string()
        .min(2, 'Project name must be at least 2 characters')
        .required('Project name is required'),
    projectStartedOn: Yup.string()
        .required('Join date is required'),
    description: Yup.string()
        .required('Description is required'),
    technology: Yup.array().of(Yup.string())
})

export const experienceValidationSchema = Yup.object().shape({
    organization: Yup.string()
        .min(2, 'Organization must be at least 2 characters')
        .required('Organization is required'),
    designation: Yup.string()
        .min(2, 'Designation must be at least 2 characters')
        .required('Designation is required'),
    joinDate: Yup.string()
        .required('Join date is required'),
    currentlyWorking: Yup.boolean(),
    relieveDate: Yup.string()
        .nullable()
        .test('is-required', 'Relieve date is required', function (value) {
            const { currentlyWorking } = this.parent;
            return currentlyWorking ? true : !!value;
        }),
    country: Yup.string()
        .required('Country is required'),
    state: Yup.string()
        .required('State is required'),
    city: Yup.string()
        .required('City is required'),
    roles: Yup.array().of(Yup.string())
});

export const objectivesValidationSchema = Yup.object().shape({
    objectives: Yup.string()
        .min(250, 'Objectives must be at least 250 characters')
        .required('Objectives are required'),
    achievements: Yup.array().of(Yup.string())
})

export const accountsValidationSchema = Yup.object().shape({
    githubAccount: Yup.boolean(),
    linkedInAccount: Yup.boolean(),
    githubUrl: Yup.string()
        .nullable()
        .test('is-required', 'URL is required', function (value) {
            const { githubAccount } = this.parent;
            return !githubAccount || (!!value && value.trim() !== '');
        })
        .url('Invalid URL format'),
    linkedinUrl: Yup.string()
        .nullable()
        .test('is-required', 'URL is required', function (value) {
            const { linkedInAccount } = this.parent;
            return !linkedInAccount || (!!value && value.trim() !== '');
        })
        .url('Invalid URL format')
});