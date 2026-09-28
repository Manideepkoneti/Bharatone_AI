import { PublicService } from '../types';

export const PUBLIC_SERVICES: PublicService[] = [
  {
    id: 'income-certificate',
    category: 'documents',
    title: 'Integrated Income Certificate',
    titleTelugu: 'ఆదాయ ధృవీకరణ పత్రం (Income Certificate)',
    titleHindi: 'आय प्रमाण पत्र (Income Certificate)',
    department: 'Revenue & District Administration',
    description: 'Official certification issued by the Tahsildar / Revenue Department proving the annual household income for scholarships, government welfare schemes, and fee concessions.',
    eligibility: [
      'Permanent resident of the State',
      'Applicant or head of family earning annual income within legal limits',
      'Valid identity verification through Aadhaar'
    ],
    requiredDocuments: [
      'Aadhaar Card of Applicant and Parents',
      'Ration Card / Food Security Card',
      'Salary Slip / Form 16 / Income Affidavit',
      'Recent Passport-sized Photograph',
      'Electricity Bill or Property Tax Receipt for address proof'
    ],
    processSteps: [
      'Submit application online via State Citizen Portal (e.g. MeeSeva / MeeSeva 2.0 / e-Seva) or at the nearest Village/Ward Secretariat.',
      'Upload scanned copies of Aadhaar, ration card, and signed self-declaration.',
      'Field verification carried out by Village Revenue Officer (VRO) and Revenue Inspector (RI).',
      'Approval and digital signature endorsement by Tahsildar.',
      'Download digitally signed certificate with QR code validation.'
    ],
    officialUrl: 'https://meeseva.gov.in',
    portalName: 'MeeSeva / Village Secretariat',
    isPopular: true
  },
  {
    id: 'caste-certificate',
    category: 'documents',
    title: 'Integrated Community, Nativity & Date of Birth Certificate',
    titleTelugu: 'కుల మరియు నివాస ధృవీకరణ పత్రం (Caste & Nativity)',
    titleHindi: 'जाति व निवास प्रमाण पत्र (Caste Certificate)',
    department: 'Backward Classes & Social Welfare Department',
    description: 'Formal recognition of caste, community, nativity, and age essential for education reservations, fee waivers, and government employment recruitment.',
    eligibility: [
      'Belonging to designated SC, ST, BC, or EWS category',
      'Continuous residence in the state',
      'Proof of ancestral lineage or sibling/parent prior caste certificate'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'School Study Certificate / Transfer Certificate (TC) mentioning caste',
      'Father / Mother / Sibling Caste Certificate copy',
      'Family Ration Card / Rice Card',
      'Notarized Affidavit on non-judicial stamp paper'
    ],
    processSteps: [
      'Visit nearest MeeSeva or Citizen Service Center (CSC) with original records.',
      'Submit biometric authentication and upload academic records showing caste entry.',
      'Verification by VRO and Mandal Revenue Officer (MRO).',
      'Issuance of barcoded certificate valid indefinitely for SC/ST and periodic for BC/OBC.'
    ],
    officialUrl: 'https://serviceonline.gov.in',
    portalName: 'National Service Portal / MeeSeva',
    isPopular: true
  },
  {
    id: 'jagananna-vidya-deevena',
    category: 'education',
    title: 'Jagananna Vidya Deevena (Full Fee Reimbursement)',
    titleTelugu: 'జగనన్న విద్యా దీవెన (ఫీజు రీయింబర్స్‌మెంట్)',
    titleHindi: 'जगनन्ना विद्या दीवेना (पूर्ण शुल्क प्रतिपूर्ति)',
    department: 'Higher Education Department, Government of Andhra Pradesh',
    description: 'Provides 100% complete tuition fee reimbursement directly credited to mother’s bank account for polytechnic, ITI, degree, engineering, pharmacy, and postgraduate students.',
    eligibility: [
      'Family annual income must be below ₹2.50 Lakhs per annum',
      'Total family landholding less than 10 acres wetland or 25 acres dryland',
      'No family member should be a government employee or pensioner (sanitary workers exempted)',
      'No family member owning a four-wheeler (taxis/autos exempted)',
      'Minimum 75% college attendance record'
    ],
    requiredDocuments: [
      'Student and Mother Aadhaar Cards',
      'Integrated Caste & Income Certificate issued by MeeSeva',
      'College Admission Allotment Order and Fee Structure',
      'Mother’s Active Aadhaar-seeded Bank Account Passbook',
      'College Bonafide & Attendance Certificate'
    ],
    processSteps: [
      'College administration registers the student profile on the GnanaBhumi / JVD portal.',
      'Student and mother perform e-KYC biometric authentication at the Village/Ward Secretariat.',
      'Welfare and Education Assistant verifies physical documents.',
      'Social Welfare Department sanctions fee amounts in quarterly installments directly to mother bank account.'
    ],
    officialUrl: 'https://jaganannavidyadeevena.ap.gov.in',
    portalName: 'GnanaBhumi / AP e-Pass',
    isPopular: true
  },
  {
    id: 'pm-kisan',
    category: 'agriculture',
    title: 'PM-Kisan Samman Nidhi (₹6,000 Annual Direct Income)',
    titleTelugu: 'పీఎం కిసాన్ సమ్మాన్ నిధి (PM-Kisan)',
    titleHindi: 'प्रधानमंत्री किसान सम्मान निधि (PM-Kisan)',
    department: 'Ministry of Agriculture and Farmers Welfare, Govt of India',
    description: 'Financial support of ₹6,000 per year transferred in three equal 4-monthly installments of ₹2,000 directly into the bank accounts of all landholding farmer families across India.',
    eligibility: [
      'All landholder farmer families with cultivable landholding in their names',
      'Excluded: Institutional landholders, constitutional post holders, income tax payers, serving government employees'
    ],
    requiredDocuments: [
      'Aadhaar Card linked with mobile number',
      'Pattadar Passbook / Land Ownership 1-B Record (RoR)',
      'Bank Account Passbook (Aadhaar NPCI linked)',
      'Active Mobile number for OTP verification'
    ],
    processSteps: [
      'Register online at pmkisan.gov.in or through nearest Common Service Centre (CSC).',
      'Complete Aadhaar e-KYC via facial recognition on PM-KISAN mobile app or OTP.',
      'Land details verification conducted by the District Agriculture Officer / Revenue Patwari.',
      'Status tracking and installment release updates delivered via SMS.'
    ],
    officialUrl: 'https://pmkisan.gov.in',
    portalName: 'PM-Kisan Official Portal',
    isPopular: true
  },
  {
    id: 'rythu-bharosa',
    category: 'agriculture',
    title: 'YSR Rythu Bharosa / Farmer Investment Support',
    titleTelugu: 'వైఎస్సార్ రైతు భరోసా (రైతు పెట్టుబడి సాయం)',
    titleHindi: 'रायथू भरोसा / किसान निवेश सहायता',
    department: 'Department of Agriculture, Govt of Andhra Pradesh',
    description: 'Financial assistance of ₹13,500 per year (combined with PM-Kisan) given to farmer families including tenant farmers (CCRC) before crop sowing seasons.',
    eligibility: [
      'Land-owning farmers with updated revenue passbook (Adangal/1B)',
      'Tenant farmers holding Crop Cultivator Rights Card (CCRC) for scheduled categories (SC, ST, BC, Minorities)'
    ],
    requiredDocuments: [
      'Pattadar Passbook / CCRC Card copy',
      'Aadhaar Card and Mobile Number',
      'Bank Account linked with NPCI',
      'Crop sowing confirmation by Village Agriculture Assistant (VAA)'
    ],
    processSteps: [
      'Social audit list published at Rythu Bharosa Kendram (RBK).',
      'Enrollment verification by Village Agriculture Assistant (VAA).',
      'Disbursement in three installments: Kharif sowing, Rabi sowing, and Sankranti harvest.'
    ],
    officialUrl: 'https://ysrrythubharosa.ap.gov.in',
    portalName: 'Rythu Bharosa Kendram (RBK)',
    isPopular: true
  },
  {
    id: 'pm-jay-ayushman',
    category: 'healthcare',
    title: 'Ayushman Bharat PM-JAY / Aarogyasri Health Insurance',
    titleTelugu: 'ఆయుష్మాన్ భారత్ / డా. వైఎస్సార్ ఆరోగ్యశ్రీ (₹5-25 లక్షల ఉచిత వైద్యం)',
    titleHindi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    department: 'National Health Authority (NHA) & State Health Agency',
    description: 'Provides cashless hospital coverage up to ₹5 Lakhs (and up to ₹25 Lakhs under expanded state Aarogyasri) per family per year for secondary and tertiary healthcare in empaneled hospitals.',
    eligibility: [
      'Families enlisted under SECC 2011 database or holding active White Ration / Rice Card',
      'No cap on family size or age limit'
    ],
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Food Security / BPL Ration Card',
      'Active Mobile Number for ABHA ID creation'
    ],
    processSteps: [
      'Check eligibility online at beneficiary.nha.gov.in using Aadhaar number.',
      'Generate instant Ayushman / Aarogyasri Card at any Network Hospital or CSC.',
      'Show card at helpdesk of any empaneled government or private hospital for cashless treatment.'
    ],
    officialUrl: 'https://beneficiary.nha.gov.in',
    portalName: 'National Health Authority Beneficiary Portal',
    isPopular: true
  },
  {
    id: 'pm-awas-yojana',
    category: 'housing',
    title: 'Pradhan Mantri Awas Yojana (PMAY-Urban & Gramin)',
    titleTelugu: 'పీఎం ఆవాస్ యోజన - పక్కా ఇళ్ల పథకం (PMAY)',
    titleHindi: 'प्रधानमंत्री आवास योजना (PMAY)',
    department: 'Ministry of Housing and Urban Affairs, Govt of India',
    description: 'Assistance for construction of pucca houses for homeless poor and low-income families with subsidy on home loans or direct construction grants.',
    eligibility: [
      'Family must not own a pucca house in any part of India',
      'Annual household income within EWS (up to ₹3L) or LIG (up to ₹6L) limits'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Income Certificate & Bank Statement (last 6 months)',
      'Land title / Patta certificate if constructing on own plot',
      'Affidavit of not owning any pucca house'
    ],
    processSteps: [
      'Apply online through pmaymis.gov.in or local municipal ward office.',
      'Geo-tagging and biometric physical verification of plot/residence.',
      'Sanction order issued and financial grant credited directly in milestone phases.'
    ],
    officialUrl: 'https://pmaymis.gov.in',
    portalName: 'PMAY Official Portal',
    isPopular: false
  },
  {
    id: 'driving-license',
    category: 'transportation',
    title: 'Learner & Permanent Driving License (Sarathi Parivahan)',
    titleTelugu: 'లెర్నర్ & డ్రైవింగ్ లైసెన్స్ (Sarathi Parivahan)',
    titleHindi: 'ड्राइविंग लाइसेंस आवेदन (Sarathi Parivahan)',
    department: 'Ministry of Road Transport and Highways (MoRTH)',
    description: 'Unified online portal to book learner test, schedule driving skill test, and receive contactless digital driving license valid across India.',
    eligibility: [
      'Minimum age 16 for gearless two-wheeler (up to 50cc)',
      'Minimum age 18 for light motor vehicles (car/bike with gear)',
      'Pass computer-based traffic safety test'
    ],
    requiredDocuments: [
      'Proof of Age (School Certificate / Birth Certificate / PAN)',
      'Proof of Address (Aadhaar / Voter ID / Passport)',
      'Medical Fitness Certificate (Form 1 / Form 1A for age > 40)',
      'Passport-sized Photograph'
    ],
    processSteps: [
      'Fill application form online on parivahan.gov.in (Sarathi).',
      'Take online audio-visual Learner License tutorial and knowledge test.',
      'After 30 days of Learner License, book driving track skill test slot at RTO.',
      'Pass practical test; Smart Driving License dispatched via speed post.'
    ],
    officialUrl: 'https://parivahan.gov.in',
    portalName: 'Sarathi Parivahan',
    isPopular: false
  }
];
