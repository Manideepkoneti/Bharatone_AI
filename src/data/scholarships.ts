import { ScholarshipScheme } from '../types';

export const SCHOLARSHIPS: ScholarshipScheme[] = [
  {
    id: 'jvd-vasathi',
    title: 'Jagananna Vasathi Deevena (Hostel & Living Allowance)',
    provider: 'Government of Andhra Pradesh',
    level: ['polytechnic', 'undergraduate', 'postgraduate'],
    minGpa: 'Passing Grades (75% Attendance)',
    incomeLimit: '₹2,50,000 / year',
    benefit: '₹10,000 for ITI, ₹15,000 for Polytechnic, ₹20,000 for Degree/Engg per year in two installments',
    deadline: 'Annual Academic Cycle (October - November)',
    description: 'Provides boarding, food, and hostel accommodation expenses for economically disadvantaged students pursuing professional higher education.',
    officialUrl: 'https://jaganannavidyadeevena.ap.gov.in',
    category: 'State Welfare'
  },
  {
    id: 'post-matric-nsp',
    title: 'Post Matric Scholarship for Minorities / SC / ST / OBC',
    provider: 'Ministry of Social Justice & Empowerment, Govt of India',
    level: ['intermediate', 'undergraduate', 'postgraduate'],
    minGpa: '50% in previous exam',
    incomeLimit: '₹2,00,000 to ₹2,50,000 / year',
    benefit: 'Full maintenance allowance up to ₹1,200/month + compulsory non-refundable fees covered',
    deadline: 'October 31 annually',
    description: 'Central sector scheme ensuring students belonging to minority and marginalized communities can attain higher education without economic hurdles.',
    officialUrl: 'https://scholarships.gov.in',
    category: 'National Scholarship Portal (NSP)'
  },
  {
    id: 'aicte-pragati',
    title: 'AICTE Pragati Scholarship for Girl Students',
    provider: 'All India Council for Technical Education (AICTE)',
    level: ['undergraduate', 'polytechnic'],
    minGpa: 'Merit in State Entrance / 10+2',
    incomeLimit: '₹8,00,000 / year',
    benefit: '₹50,000 per annum for every year of technical study (Degree / Diploma)',
    deadline: 'December 31 annually',
    description: 'Empowering young women to pursue technical degrees and diploma programmes across recognized AICTE institutions. Maximum 2 girls per family.',
    officialUrl: 'https://www.aicte-india.org',
    category: 'Women in STEM'
  },
  {
    id: 'central-sector-csss',
    title: 'Central Sector Scheme of Scholarship for College and University Students',
    provider: 'Department of Higher Education, Ministry of Education',
    level: ['undergraduate', 'postgraduate'],
    minGpa: 'Top 80th percentile in Class 12 Board',
    incomeLimit: '₹4,50,000 / year',
    benefit: '₹12,000/year for first 3 years of Graduation; ₹20,000/year at PG level',
    deadline: 'November 15 annually',
    description: 'Financial assistance to meritorious students from low-income families to meet a part of their day-to-day expenses while pursuing higher studies.',
    officialUrl: 'https://scholarships.gov.in',
    category: 'Merit-cum-Means'
  },
  {
    id: 'reliance-foundation-ug',
    title: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    level: ['undergraduate'],
    minGpa: 'Minimum 60% in Class 12',
    incomeLimit: 'Preference to < ₹2,50,000 / year (Cap: ₹15,00,000)',
    benefit: 'Up to ₹2,00,000 over the course of undergraduate degree + leadership mentoring',
    deadline: 'October 6 annually',
    description: 'One of India’s largest private scholarship programmes supporting 5,000 meritorious undergraduate students each year across all streams.',
    officialUrl: 'https://www.reliancefoundation.org',
    category: 'Private / Philanthropic'
  }
];
