import { Patient, Gender } from '../src/types';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: Gender.Male,
    occupation: 'NYPD Detective',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-777A',
    gender: Gender.Male,
    occupation: 'LAPD Detective',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: Gender.Other,
    occupation: 'Technician',
    entries: [],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: Gender.Female,
    occupation: 'Forensic Pathologist',
    entries: [
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: 'OccupationalHealthcare',
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      },
      {
        id: '37be178f-a432-4ba4-aac2-f86810e36a15',
        date: '2018-10-05',
        specialist: 'MD House',
        type: 'HealthCheck',
        description:
          'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: Gender.Male,
    occupation: 'Digital evangelist',
    entries: [
      {
        id: '54a8746e-34c4-4cf4-bf72-bfecd039be9a',
        date: '2019-05-01',
        specialist: 'Dr Byte House',
        type: 'HealthCheck',
        description: 'Digital overdose, very bytestatic. Otherwise healthy.',
        healthCheckRating: 0,
      },
    ],
  },
  {
    id: '6120bf34-8bbf-4f81-9f5f-bcbaa4e8249d',
    name: 'Eleanor Whitman',
    dateOfBirth: '1958-11-12',
    ssn: '121158-2047',
    gender: Gender.Female,
    occupation: 'Retired school principal',
    entries: [
      {
        id: 'e7f9d02e-9178-412d-b9a4-f74b28e73c57',
        date: '2025-11-12',
        type: 'Hospital',
        specialist: 'Dr. Margaret Chen',
        diagnosisCodes: ['I48.9'],
        description:
          'Admitted with palpitations and shortness of breath. Atrial fibrillation confirmed on ECG; rhythm controlled with medication.',
        discharge: {
          date: '2025-11-18',
          criteria: 'Stable sinus rhythm, anticoagulation started. Cardio follow-up in 4 weeks.',
        },
      },
      {
        id: '36b18e5a-f136-4515-b125-a56e38d24b09',
        date: '2026-03-02',
        specialist: 'Dr. Margaret Chen',
        type: 'HealthCheck',
        description:
          'Annual review. Blood pressure and fasting glucose persistently elevated despite diet; referred to endocrinology.',
        healthCheckRating: 3,
        diagnosisCodes: ['I10', 'E11.9'],
      },
    ],
  },
  {
    id: 'fcd3061a-2f94-4908-95d6-e8bb6ee64655',
    name: 'Priya Nair',
    dateOfBirth: '1990-03-15',
    ssn: '150390-118L',
    gender: Gender.Female,
    occupation: 'DevOps engineer',
    entries: [
      {
        id: '53deafdc-8a1e-4ec1-a16d-a5ab27b6ee4e',
        date: '2024-09-15',
        type: 'OccupationalHealthcare',
        specialist: 'Dr. Robert Okafor',
        employerName: 'CloudNest',
        diagnosisCodes: ['M54.5'],
        description:
          'Ergonomic strain from long hours at a standing desk. Physiotherapy and workstation adjustment recommended.',
        sickLeave: {
          startDate: '2024-09-15',
          endDate: '2024-10-13',
        },
      },
      {
        id: 'f8e7fe02-43d4-4704-8445-f215cfcf1a39',
        date: '2026-06-10',
        specialist: 'Dr. Sarah Lindqvist',
        type: 'HealthCheck',
        description:
          'Routine health check. All values within normal range; back pain fully resolved.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'be79046d-8dd2-4280-b1d3-dc1a3db8d431',
    name: 'Tomás Rivera',
    dateOfBirth: '2008-07-14',
    ssn: '140708-667X',
    gender: Gender.Male,
    occupation: 'Student',
    entries: [
      {
        id: '173e6638-0619-4c4d-9e17-2d35f9df3a36',
        date: '2023-07-22',
        type: 'Hospital',
        specialist: 'Dr. Amelia Foster',
        diagnosisCodes: ['S93.4'],
        description:
          'Twisted ankle during football training. X-ray rules out fracture; significant ligamentous strain.',
        discharge: {
          date: '2023-07-23',
          criteria: 'RICE protocol; physiotherapy referral.',
        },
      },
      {
        id: 'ab9fd021-6e37-468a-a4ff-85e07d3f8a7f',
        date: '2026-02-14',
        specialist: 'Dr. Amelia Foster',
        type: 'HealthCheck',
        description:
          'Mild asthma flare-up after seasonal change. Inhaler technique reviewed and medication adjusted.',
        healthCheckRating: 2,
        diagnosisCodes: ['J45.9'],
      },
    ],
  },
];

export default patients;