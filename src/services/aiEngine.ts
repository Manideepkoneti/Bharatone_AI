import { IntentAnalysis, Language, DomainId } from '../types';

export interface AIAnalysisRequest {
  query: string;
  preferredLanguage?: Language;
  userContext?: {
    location?: string;
    education?: string;
  };
}

export class BharatOneAIEngine {
  // Detect language from text (supports Telugu, Hindi, English, and Romanized/transliterated regional terms)
  static detectLanguage(query: string, fallback: Language = 'en'): { lang: string; code: Language } {
    const text = query.toLowerCase();

    // Check Telugu Unicode script: \u0C00-\u0C7F
    if (/[\u0C00-\u0C7F]/.test(query)) {
      return { lang: 'Telugu (తెలుగు)', code: 'te' };
    }

    // Check Devanagari script: \u0900-\u097F
    if (/[\u0900-\u097F]/.test(query)) {
      return { lang: 'Hindi (हिन्दी)', code: 'hi' };
    }

    // Check Transliterated Telugu (Tanglish) patterns
    const teluguKeywords = [
      'nenu', 'oka', 'student', 'naaku', 'kavali', 'panta', 'aakulu', 'yellow', 
      'avutunnayi', 'avutundhi', 'telusukovali', 'cheyali', 'chaala', 'unnanu',
      'chaduvutunnanu', 'meeseva', 'vidya', 'deevena', 'rythu', 'bharosa', 'darakhasthu',
      'yela', 'ekkada', 'sahayam', 'dharakhastu', 'avasaram'
    ];
    const teluguMatchCount = teluguKeywords.filter(k => text.includes(k)).length;
    if (teluguMatchCount >= 1 && (text.includes('nenu') || text.includes('naaku') || text.includes('kavali') || text.includes('panta') || text.includes('telusukovali') || text.includes('avutunnayi'))) {
      return { lang: 'Telugu (తెలుగు / Romanized)', code: 'te' };
    }

    // Check Transliterated Hindi (Hinglish) patterns
    const hindiKeywords = [
      'mujhe', 'chahiye', 'karna', 'hai', 'kaise', 'fasal', 'khet', 'kisan',
      'madad', 'sarkari', 'yojana', 'jaankari', 'praman', 'patra', 'mera', 'meri'
    ];
    const hindiMatchCount = hindiKeywords.filter(k => text.includes(k)).length;
    if (hindiMatchCount >= 2 || (text.includes('mujhe') && text.includes('chahiye'))) {
      return { lang: 'Hindi (हिन्दी / Romanized)', code: 'hi' };
    }

    // Default to preferred or English
    if (fallback === 'te') return { lang: 'Telugu (తెలుగు)', code: 'te' };
    if (fallback === 'hi') return { lang: 'Hindi (हिन्दी)', code: 'hi' };
    return { lang: 'English', code: 'en' };
  }

  // Analyze citizen query and formulate structured guidance
  static analyzeQuery(request: AIAnalysisRequest): IntentAnalysis {
    const rawQuery = request.query.trim();
    const text = rawQuery.toLowerCase();
    const detected = this.detectLanguage(rawQuery, request.preferredLanguage || 'en');

    // 1. SPECIFIC EXACT HACKATHON DEMO SCENARIO 1: Education / Scholarship
    // Example: "Nenu oka student ni. Naaku scholarship kavali."
    if (
      (text.includes('student') && (text.includes('scholarship') || text.includes('kavali') || text.includes('fees'))) ||
      text.includes('scholarship') ||
      (text.includes('college') && text.includes('support')) ||
      text.includes('fee reimbursement') ||
      text.includes('vidya deevena') ||
      text.includes('vasathi deevena') ||
      text.includes('छात्रवृत्ति') ||
      text.includes('స్కాలర్‌షిప్')
    ) {
      if (detected.code === 'te') {
        return {
          language: detected.lang,
          languageCode: 'te',
          intent: 'Scholarship & Fee Reimbursement Guidance (స్కాలర్‌షిప్ మార్గదర్శకత్వం)',
          domain: 'education',
          confidence: 0.98,
          summary: 'మీరు విద్యార్థి అని మరియు కళాశాల స్కాలర్‌షిప్ లేదా ఫీజు సహాయం కావాలని అర్థమైంది. ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రభుత్వాలు అలాగే కేంద్ర ప్రభుత్వం అందిస్తున్న వివిధ విద్యా పథకాల వివరాలు కింద ఇవ్వబడ్డాయి.',
          summaryTelugu: 'మీరు విద్యార్థి అని మరియు కళాశాల స్కాలర్‌షిప్ లేదా ఫీజు సహాయం కావాలని అర్థమైంది. ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రభుత్వాలు అలాగే కేంద్ర ప్రభుత్వం అందిస్తున్న వివిధ విద్యా పథకాల వివరాలు కింద ఇవ్వబడ్డాయి.',
          clarifyingQuestions: [
            'మీ ప్రస్తుత విద్యా స్థాయి ఏమిటి? (ఇంటర్మీడియట్ / డిగ్రీ / ఇంజనీరింగ్ / పీజీ)',
            'మీ కుటుంబ వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉందా?',
            'మీరు ఏ రాష్ట్రంలో చదువుతున్నారు? (ఆంధ్రప్రదేశ్ / తెలంగాణ / ఇతర రాష్ట్రాలు)'
          ],
          requiredInformation: [
            'ప్రస్తుత చదువుతున్న కోర్సు మరియు కళాశాల పేరు',
            'గత పరీక్షలో వచ్చిన మార్కులు లేదా జీపీఏ (కనీసం 60% పైగా ఉండాలి)',
            'మీ రేషన్ కార్డు లేదా బియ్యం కార్డు నంబర్'
          ],
          requiredDocuments: [
            'విద్యార్థి మరియు తల్లి ఆధార్ కార్డులు (Aadhaar Cards)',
            'మీసేవ ద్వారా పొందిన సమీకృత ఆదాయ మరియు కుల ధృవీకరణ పత్రాలు (Income & Caste Certificates)',
            'కళాశాల అలాట్‌మెంట్ ఆర్డర్ మరియు బోనఫైడ్ సర్టిఫికెట్ (College Bonafide)',
            'తల్లి యొక్క ఆధార్ లింక్ అయిన బ్యాంక్ పాస్‌బుక్ జిరాక్స్ (Mother Bank Account)',
            'పదవ తరగతి లేదా ఇంటర్మీడియట్ మార్కుల జాబితా (Marksheets)'
          ],
          recommendedSteps: [
            'దశ 1: మీ కళాశాల కార్యాలయంలో GnanaBhumi లేదా e-Pass స్కాలర్‌షిప్ రిజిస్ట్రేషన్ ప్రారంభించండి.',
            'దశ 2: అవసరమైన పత్రాలను సిద్ధం చేసుకుని గ్రామ/వార్డు సచివాలయంలో లేదా మీసేవలో e-KYC పూర్తి చేయండి.',
            'దశ 3: నేషనల్ స్కాలర్‌షిప్ పోర్టల్ (scholarships.gov.in) లో అదనపు కేంద్ర స్కీముల కోసం చెక్ చేయండి.',
            'దశ 4: దరఖాస్తు స్థితిని ఆన్‌లైన్ పోర్టల్ ద్వారా ఎప్పటికప్పుడు ట్రాక్ చేసుకోండి.'
          ],
          disclaimer: 'దయచేసి తాజా అర్హత నిబంధనలను జ్ఞానభూమి (jaganannavidyadeevena.ap.gov.in) లేదా అధికారిక NSP పోర్టల్ ద్వారా నిర్ధారించుకోండి. భారత్ వన్ సహాయక వేదిక మాత్రమే.',
          deepLink: 'education'
        };
      }

      // English Education
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Scholarship Guidance & Student Support',
        domain: 'education',
        confidence: 0.97,
        summary: 'I understand you are a student seeking scholarship guidance and academic financial support. Key state and central schemes like Jagananna Vidya Deevena, Post-Matric NSP, and AICTE Pragati are available based on your academic level and family income.',
        clarifyingQuestions: [
          'What is your current education level? (Intermediate, Undergraduate, Postgraduate, Diploma)',
          'Is your total family annual income within the ₹2.5 Lakhs eligibility ceiling?',
          'What state/domicile quota do you belong to?'
        ],
        requiredInformation: [
          'Current course, year of study, and affiliated college details',
          'Academic score / GPA from previous semester/year (minimum 50-60%)',
          'Biometric Aadhaar linkage with active bank account'
        ],
        requiredDocuments: [
          'Student & Guardian Aadhaar Cards',
          'Integrated Income Certificate issued by Revenue Tahsildar / MeeSeva',
          'Community / Caste Certificate (if claiming reservation quota)',
          'College Admission Allotment Letter & Tuition Fee Receipt',
          'Bank Account Passbook (Aadhaar NPCI seeded)'
        ],
        recommendedSteps: [
          'Step 1: Check your degree and stream on the BharatOne Scholarship Eligibility Wizard.',
          'Step 2: Procure an updated Income & Nativity certificate from the nearest MeeSeva or Village Secretariat.',
          'Step 3: Submit your application on the State Portal (GnanaBhumi / e-Pass) or Central NSP (scholarships.gov.in).',
          'Step 4: Complete biometric e-KYC verification at your institution or civic center.'
        ],
        disclaimer: 'Please verify the latest eligibility criteria and deadlines on official portals (scholarships.gov.in / jaganannavidyadeevena.ap.gov.in). BharatOne provides advisory navigation and does not guarantee sanction.',
        deepLink: 'education'
      };
    }

    // 2. SPECIFIC EXACT HACKATHON DEMO SCENARIO 2: Agriculture / Crop Yellowing
    // Example: "Na panta lo aakulu yellow ga avutunnayi."
    if (
      (text.includes('panta') && (text.includes('aakulu') || text.includes('yellow') || text.includes('purugu'))) ||
      (text.includes('crop') && (text.includes('yellow') || text.includes('leaves') || text.includes('disease'))) ||
      text.includes('leaf chlorosis') ||
      text.includes('పంట') ||
      text.includes('ఆకులు పసుపు') ||
      text.includes('फसल') ||
      text.includes('पीली') ||
      text.includes('धान') ||
      text.includes('paddy blast')
    ) {
      if (detected.code === 'te') {
        return {
          language: detected.lang,
          languageCode: 'te',
          intent: 'Crop Health Diagnosis & Nutrient Advisory (పంట వ్యాధుల గుర్తింపు & సలహా)',
          domain: 'agriculture',
          confidence: 0.98,
          summary: 'మీ పంటలో ఆకులు పసుపు రంగులోకి మారుతున్నాయని గుర్తించాం. ఇది సాధారణంగా పోషకాల లోపం (నత్రజని/జింక్ లోపం), నీరు నిల్వ ఉండడం లేదా ప్రారంభ రసం పీల్చే పురుగుల దాడి వల్ల వచ్చే క్లోరోసిస్ (Chlorosis) కావచ్చు.',
          summaryTelugu: 'మీ పంటలో ఆకులు పసుపు రంగులోకి మారుతున్నాయని గుర్తించాం. ఇది సాధారణంగా పోషకాల లోపం (నత్రజని/జింక్ లోపం), నీరు నిల్వ ఉండడం లేదా ప్రారంభ రసం పీల్చే పురుగుల దాడి వల్ల వచ్చే క్లోరోసిస్ (Chlorosis) కావచ్చు.',
          clarifyingQuestions: [
            'మీరు ఏ పంట సాగు చేస్తున్నారు? (వరి, పత్తి, మిర్చి, టమోటా, మొక్కజొన్న)',
            'పసుపు రంగు పాత ఆకులలో మొదలైందా లేదా కొత్త చిగుళ్ళలో కనిపిస్తోందా?',
            'చేనులో నీరు ఎక్కువగా నిల్వ ఉండిందా?'
          ],
          requiredInformation: [
            'పంట వయస్సు (నాటిన తర్వాత ఎన్ని రోజులు)',
            'చివరిగా వేసిన ఎరువులు మరియు పురుగుమందుల వివరాలు',
            'మీ సమీప రైతు భరోసా కేంద్రం (RBK) లేదా వ్యవసాయ శాఖ పరిధి'
          ],
          requiredDocuments: [
            'పంట ఆకుల స్పష్టమైన ఫోటో (భారత్ వన్ కెమెరా ద్వారా అప్‌లోడ్ చేయండి)',
            'పట్టాదారు పాస్‌బుక్ లేదా CCRC కార్డు (ప్రభుత్వ సబ్సిడీల కోసం)',
            'రైతు ఆధార్ కార్డు'
          ],
          recommendedSteps: [
            'దశ 1: వ్యవసాయ మోడ్యూల్‌లో మీ పంట ఆకుల ఫోటోను అప్‌లోడ్ చేసి AI విశ్లేషణను పొందండి.',
            'దశ 2: చేనులో నీరు నిల్వ ఉంటే వెంటనే డ్రైనేజీ ద్వారా బయటకు పంపించండి.',
            'దశ 3: లీటరు నీటికి 5 గ్రాముల 19:19:19 మరియు 2 గ్రాముల ఫార్ములా-4 సూక్ష్మపోషకాల మిశ్రమాన్ని ఉదయం వేళ పిచికారీ చేయండి.',
            'దశ 4: సమస్య కొనసాగితే ఉచిత కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేసి స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.'
          ],
          disclaimer: 'ఇవి ప్రాథమిక పరిశీలన సూచికలు మాత్రమే. పంట నష్టాన్ని నివారించడానికి తక్షణ క్షేత్రస్థాయి నిర్ధారణ కోసం అర్హత కలిగిన వ్యవసాయ అధికారిని లేదా రైతు భరోసా కేంద్రాన్ని సంప్రదించండి.',
          deepLink: 'agriculture'
        };
      }

      // English Agriculture
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Crop Health Diagnosis & Nutrient Chlorosis Advisory',
        domain: 'agriculture',
        confidence: 0.96,
        summary: 'I detected an agricultural inquiry regarding yellowing of crop leaves. This symptom typically indicates nitrogen/micronutrient chlorosis, poor root aeration due to waterlogging, or early sap-sucking pest infestation.',
        clarifyingQuestions: [
          'What crop is currently planted? (Paddy, Cotton, Tomato, Chilli, Wheat, Maize)',
          'Is the yellowing starting on older lower leaves or younger shoot tips?',
          'Has there been recent excess irrigation or soil compaction?'
        ],
        requiredInformation: [
          'Crop stage / days after transplanting (DAT)',
          'Recent fertilizer split applications (Urea, DAP, Potash)',
          'Clear photo of affected leaves showing upper and lower surfaces'
        ],
        requiredDocuments: [
          'Close-up photograph of the leaf symptoms for BharatOne AI Image Analysis',
          'Pattadar Passbook or Crop Cultivator Rights Card (CCRC) if seeking subsidy',
          'Soil Health Card recommendation slip'
        ],
        recommendedSteps: [
          'Step 1: Open the BharatOne Agriculture Module and upload your crop leaf photo for visual AI screening.',
          'Step 2: Inspect field drainage; ensure root zones are aerated and not water-saturated.',
          'Step 3: Apply a balanced foliar spray of NPK 19:19:19 (5g/L) alongside chelated zinc/iron micronutrients.',
          'Step 4: Contact your nearest Krishi Vigyan Kendra (KVK) or toll-free Kisan Call Center (1800-180-1551).'
        ],
        disclaimer: 'Identified indicators represent probable agronomic conditions based on pattern matching. Always confirm with an agricultural expert before spraying high-potency chemical fungicides.',
        deepLink: 'agriculture'
      };
    }

    // 3. SPECIFIC EXACT HACKATHON DEMO SCENARIO 3: Government Public Services
    // Example: "Naaku government service gurinchi telusukovali."
    if (
      (text.includes('government') && (text.includes('service') || text.includes('telusukovali') || text.includes('apply'))) ||
      text.includes('meeseva') ||
      text.includes('certificate') ||
      text.includes('income certificate') ||
      text.includes('caste certificate') ||
      text.includes('ration card') ||
      text.includes('aadhaar') ||
      text.includes('ప్రభుత్వ సర్వీస్') ||
      text.includes('సర్వీస్') ||
      text.includes('सरकारी सेवा') ||
      text.includes('योजना')
    ) {
      if (detected.code === 'te') {
        return {
          language: detected.lang,
          languageCode: 'te',
          intent: 'Public Service & Citizen Certificate Navigation (ప్రజా సేవలు & ధృవీకరణ పత్రాలు)',
          domain: 'government',
          confidence: 0.98,
          summary: 'ప్రభుత్వ సేవలు మరియు ధృవీకరణ పత్రాల (ఆదాయ, కుల ధృవీకరణ, రేషన్ కార్డు, మీసేవ సేవలు) గురించి తెలుసుకోవాలని అర్థమైంది. భారత్ వన్ పబ్లిక్ సర్వీస్ నావిగేటర్ ద్వారా అవసరమైన పత్రాలు మరియు దరఖాస్తు ప్రక్రియను తెలుసుకోవచ్చు.',
          summaryTelugu: 'ప్రభుత్వ సేవలు మరియు ధృవీకరణ పత్రాల (ఆదాయ, కుల ధృవీకరణ, రేషన్ కార్డు, మీసేవ సేవలు) గురించి తెలుసుకోవాలని అర్థమైంది. భారత్ వన్ పబ్లిక్ సర్వీస్ నావిగేటర్ ద్వారా అవసరమైన పత్రాలు మరియు దరఖాస్తు ప్రక్రియను తెలుసుకోవచ్చు.',
          clarifyingQuestions: [
            'మీకు ఏ విధమైన పౌర సేవ అవసరం? (ధృవీకరణ పత్రాలు / సంక్షేమ పథకాలు / గృహ నిర్మాణం / లైసెన్స్)',
            'మీరు మీసేవ లేదా గ్రామ/వార్డు సచివాలయం ద్వారా దరఖాస్తు చేసుకోవాలనుకుంటున్నారా?',
            'మీ వద్ద ఆధార్ కార్డు మొబైల్ నంబర్‌తో లింక్ అయి ఉందా?'
          ],
          requiredInformation: [
            'దరఖాస్తుదారుడి పూర్తి పేరు మరియు శాశ్వత చిరునామా',
            'కుటుంబ పెద్ద పేరు మరియు రేషన్ కార్డు నంబర్',
            'సేవ వర్గం (రెవెన్యూ, సాంఘిక సంక్షేమం, పౌర సరఫరాలు)'
          ],
          requiredDocuments: [
            'దరఖాస్తుదారుడి ఆధార్ కార్డు (Aadhaar Card with linked mobile)',
            'రేషన్ కార్డు లేదా బియ్యం కార్డు (Ration / Rice Card)',
            'పాస్‌పోర్ట్ సైజు తాజా ఫోటోగ్రాఫ్ (Passport Photo)',
            'నివాస ధృవీకరణ కోసం విద్యుత్ బిల్లు లేదా ఆస్తి పన్ను రసీదు',
            'స్వయం ప్రకటన పత్రం (Signed Self-Declaration)'
          ],
          recommendedSteps: [
            'దశ 1: భారత్ వన్ పబ్లిక్ సర్వీస్ నావిగేటర్‌లో సంబంధిత విభాగాన్ని (ఉదా: మీసేవ రెవెన్యూ సేవలు) ఎంచుకోండి.',
            'దశ 2: అవసరమైన పత్రాల చెక్‌లిస్ట్‌ను పరిశీలించి స్కాన్ చేసిన కాపీలను సిద్ధం చేసుకోండి.',
            'దశ 3: సమీప గ్రామ/వార్డు సచివాలయానికి వెళ్లండి లేదా meeseva.gov.in పోర్టల్‌లో లాగిన్ అవ్వండి.',
            'దశ 4: బయోమెట్రిక్ e-KYC పూర్తి చేసి రసీదు నంబర్‌తో అప్లికేషన్ స్టేటస్‌ను ట్రాక్ చేయండి.'
          ],
          disclaimer: 'భారత్ వన్ అనేది పౌరులకు సమాచారం అందించే నావిగేషన్ వేదిక మాత్రమే. ఇది ప్రభుత్వ దరఖాస్తులను నేరుగా సమర్పించదు. దరఖాస్తు కోసం అధికారిక పోర్టల్ మాత్రమే ఉపయోగించండి.',
          deepLink: 'services'
        };
      }

      // English Government Services
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Public Service & Citizen Certificate Navigation',
        domain: 'government',
        confidence: 0.97,
        summary: 'I understand you want information regarding public citizen services and official certificates. BharatOne Public Service Navigator provides full eligibility criteria, required documents, and official portal workflows across Revenue, Welfare, and Transport.',
        clarifyingQuestions: [
          'Which specific citizen service do you need? (Income/Caste Certificate, Ration Card, PM-Kisan, Driving License)',
          'Are you applying online through State Citizen Portals (MeeSeva / e-Seva) or at a Village Secretariat?',
          'Is your mobile number updated with your Aadhaar for OTP verification?'
        ],
        requiredInformation: [
          'Applicant primary identity and state domicile records',
          'Family Head details and active Food Security card number',
          'Service category and district administration jurisdiction'
        ],
        requiredDocuments: [
          'Applicant & Family Members Aadhaar Cards',
          'Recent Household Utility Bill or Property Tax Receipt for address proof',
          'Passport Size Photographs',
          'Self-Declaration Affidavit / Form 16 / Salary slips if income related',
          'Academic Transfer Certificate (TC) if caste certification needed'
        ],
        recommendedSteps: [
          'Step 1: Open the Public Service Navigator on BharatOne to review your specific scheme checklist.',
          'Step 2: Collect certified copies of your identity and residence documents.',
          'Step 3: Submit through your official State Service Portal (e.g. MeeSeva / DigiLocker / India.gov.in).',
          'Step 4: Note down the Acknowledgement / Transaction Number to monitor Tahsildar approval.'
        ],
        disclaimer: 'BharatOne serves purely as a guidance and navigation layer. It does not submit government applications. Please access official government portals (e.g. meeseva.gov.in) to file applications.',
        deepLink: 'services'
      };
    }

    // 4. Employment / Career Intent
    if (
      text.includes('career') ||
      text.includes('job') ||
      text.includes('resume') ||
      text.includes('employment') ||
      text.includes('skills') ||
      text.includes('software') ||
      text.includes('roadmap') ||
      text.includes('ఉద్యోగం') ||
      text.includes('रोजगार')
    ) {
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Career Planning & Skill Gap Advisory',
        domain: 'employment',
        confidence: 0.95,
        summary: 'I understand you are seeking career planning and skill advancement support. BharatOne Employment Navigator provides customized skill roadmaps, free government SWAYAM/NPTEL certified courses, and National Career Service (NCS) portal guidance.',
        clarifyingQuestions: [
          'What is your target career domain? (Software/AI, Civil Services, Agritech, Data Analysis, Banking)',
          'What is your current highest educational qualification?',
          'Are you looking for government recruitment exams or private sector technical roles?'
        ],
        requiredInformation: [
          'Current skills and technical certifications',
          'Desired timeline for job readiness (3 months, 6 months, 1 year)',
          'State employment exchange registration status'
        ],
        requiredDocuments: [
          'Updated Resume / CV',
          'Educational Degree and Marksheet Transcripts',
          'National Career Service (NCS) Candidate ID',
          'Identity Proof (Aadhaar / Voter ID)'
        ],
        recommendedSteps: [
          'Step 1: Access the BharatOne Employment Assistant to evaluate your current Skill Gap.',
          'Step 2: Enroll in recommended free SWAYAM or Skill India digital modules.',
          'Step 3: Register your candidate profile on ncs.gov.in for pan-India job fairs.',
          'Step 4: Build a portfolio of verified projects and update your resume.'
        ],
        disclaimer: 'Career recommendations are informational guidelines based on industry demand trends. Continuous skill enhancement is encouraged.',
        deepLink: 'employment'
      };
    }

    // 5. Healthcare / Wellness Intent
    if (
      text.includes('health') ||
      text.includes('hospital') ||
      text.includes('doctor') ||
      text.includes('ayushman') ||
      text.includes('aarogyasri') ||
      text.includes('wellness') ||
      text.includes('medicine') ||
      text.includes('ఆరోగ్యం') ||
      text.includes('स्वास्थ्य')
    ) {
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Citizen Healthcare Navigation & Wellness Information',
        domain: 'healthcare',
        confidence: 0.94,
        summary: 'I understand you have an inquiry regarding healthcare services and wellness schemes. BharatOne guides you through Ayushman Bharat PM-JAY and Aarogyasri empaneled hospital benefits, ABHA Health IDs, and general preventive wellness.',
        clarifyingQuestions: [
          'Are you seeking information about cashless hospital schemes (Ayushman Bharat / Aarogyasri)?',
          'Do you need guidance to locate nearest network hospitals?',
          'Do you have an active White Ration Card or ABHA Card?'
        ],
        requiredInformation: [
          'Aadhaar number of the patient / family head',
          'Active mobile number linked with Aadhaar for ABHA ID',
          'Category of medical treatment required'
        ],
        requiredDocuments: [
          'Aadhaar Card',
          'BPL Ration Card / Rice Card',
          'Doctor Consultation Prescription / Clinical Diagnosis Reports',
          'ABHA (Ayushman Bharat Health Account) Card'
        ],
        recommendedSteps: [
          'Step 1: Check your eligibility on beneficiary.nha.gov.in using your Aadhaar number.',
          'Step 2: Generate your 14-digit ABHA ID online for digitized medical records.',
          'Step 3: Approach the Arogyamitra helpdesk at any empaneled network hospital.',
          'Step 4: For medical emergencies, dial 108 immediately; for health tele-consultation, dial 104.'
        ],
        disclaimer: 'Information provided is for general guidance and citizen service navigation. It does NOT constitute medical diagnosis or advice. Always consult a qualified medical professional for health issues.',
        deepLink: 'healthcare'
      };
    }

    // 6. Finance / Scam Safety Intent
    if (
      text.includes('finance') ||
      text.includes('money') ||
      text.includes('scam') ||
      text.includes('fraud') ||
      text.includes('upi') ||
      text.includes('budget') ||
      text.includes('loan') ||
      text.includes('ఆర్థిక') ||
      text.includes('वित्तीय')
    ) {
      return {
        language: detected.lang,
        languageCode: detected.code,
        intent: 'Digital Payment Safety & Financial Guidance',
        domain: 'finance',
        confidence: 0.95,
        summary: 'I understand you are seeking digital payment safety and financial awareness guidance. BharatOne helps citizens avoid UPI phishing scams, lottery frauds, and fake loan apps while providing budgeting literacy.',
        clarifyingQuestions: [
          'Are you concerned about a suspicious call, SMS, or QR code payment request?',
          'Would you like to test your fraud detection skills with the BharatOne Scam Simulator?',
          'Are you looking for government micro-credit schemes like PM Mudra Yojana?'
        ],
        requiredInformation: [
          'Transaction details or suspicious message text (do NOT share PINs or passwords)',
          'Bank name and customer care helpline number',
          'Cyber crime incident timestamp if reporting fraud'
        ],
        requiredDocuments: [
          'Bank Account Statement showing unauthorized debit',
          'Screenshots of fraudulent SMS / WhatsApp message / Caller ID',
          'Complaint reference from National Cyber Crime Reporting Portal'
        ],
        recommendedSteps: [
          'Step 1: NEVER enter your UPI PIN to receive money. UPI PIN is ONLY needed for sending money.',
          'Step 2: If scammed, immediately call National Cyber Crime Helpline: 1930 to freeze transactions.',
          'Step 3: File an official complaint online at cybercrime.gov.in within 24 hours.',
          'Step 4: Explore the BharatOne Budgeting Simulator for personal monthly financial planning.'
        ],
        disclaimer: 'BharatOne provides financial literacy education. It does not provide personalized investment advice or process financial transactions.',
        deepLink: 'finance'
      };
    }

    // Fallback: Clarification response
    return {
      language: detected.lang,
      languageCode: detected.code,
      intent: 'Citizen Inquiry & Service Navigation',
      domain: 'government',
      confidence: 0.88,
      summary: detected.code === 'te' 
        ? 'మీ అభ్యర్థన అందింది. మీకు విద్య (స్కాలర్‌షిప్‌లు), వ్యవసాయం (పంట సమస్యలు), లేదా ప్రభుత్వ పౌర సేవల్లో దేని గురించి సమాచారం కావాలో మరింత స్పష్టంగా తెలియజేయండి.'
        : 'Thank you for contacting BharatOne AI. To provide the most precise structured guidance, please specify if you need assistance with Education & Scholarships, Agriculture & Crop Health, or Public Citizen Services.',
      clarifyingQuestions: [
        'Would you like guidance regarding Education & College Scholarships?',
        'Do you have a question about Crop Diseases or Farming Advisory?',
        'Do you need official Government Certificates (Income, Caste, Ration Card)?'
      ],
      requiredInformation: [
        'Specific service domain of interest',
        'State of residence and education or farming context'
      ],
      requiredDocuments: [
        'Aadhaar Card for identity verification',
        'Relevant supporting documents based on domain chosen'
      ],
      recommendedSteps: [
        'Step 1: Select one of the quick action pills on your dashboard.',
        'Step 2: Provide specific details regarding your inquiry.',
        'Step 3: Receive structured checklist and official links.'
      ],
      disclaimer: 'Please verify the latest eligibility requirements using the relevant official source. BharatOne is an informational guidance layer.'
    };
  }

  // Call optional external Gemini API if an API key is configured
  static async queryGeminiIfConfigured(query: string, apiKey: string, lang: Language): Promise<IntentAnalysis | null> {
    if (!apiKey || apiKey.trim() === '') return null;

    try {
      const systemPrompt = `You are BharatOne AI, a multilingual Indian citizen assistance platform.
Given the user query, return a strictly valid JSON object matching this schema:
{
  "language": "detected language name",
  "languageCode": "en | te | hi",
  "intent": "identified user intent",
  "domain": "education | agriculture | government | employment | healthcare | finance",
  "confidence": 0.95,
  "summary": "concise answer in the user's language",
  "clarifyingQuestions": ["q1", "q2"],
  "requiredInformation": ["info1", "info2"],
  "requiredDocuments": ["doc1", "doc2"],
  "recommendedSteps": ["step1", "step2"],
  "disclaimer": "Please verify latest eligibility on official government source."
}
Do not include any markdown fences or preamble. Return only the raw JSON.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Query: ${query}` }]
              }
            ],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            }
          })
        }
      );

      if (!response.ok) {
        console.warn('Gemini API call returned status:', response.status);
        return null;
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (content) {
        const parsed = JSON.parse(content);
        return {
          ...parsed,
          deepLink: parsed.domain
        };
      }
      return null;
    } catch (err) {
      console.error('Gemini API error, falling back to built-in reasoning engine:', err);
      return null;
    }
  }
}
