import { CropAnalysisResult } from '../types';

export interface SampleCropImage {
  id: string;
  name: string;
  nameTelugu: string;
  cropType: string;
  description: string;
  previewGradient: string;
  icon: string;
  analysis: CropAnalysisResult;
}

export const SAMPLE_CROP_IMAGES: SampleCropImage[] = [
  {
    id: 'yellow-leaves-tomato',
    name: 'Yellowing Leaves (Chlorosis)',
    nameTelugu: 'ఆకులు పసుపుగా మారడం (క్లోరోసిస్ / పోషక లోపం)',
    cropType: 'Tomato / Paddy',
    description: 'Distinctive pale yellow veins and leaf chlorosis observed on lower and middle leaves.',
    previewGradient: 'from-amber-500/20 via-yellow-600/30 to-emerald-950',
    icon: '🍂',
    analysis: {
      cropName: 'Tomato / Vegetable Crops',
      detectedIssue: 'Leaf Chlorosis & Nitrogen / Micronutrient Deficiency with Early Fungal Susceptibility',
      issueTelugu: 'ఆకుల క్లోరోసిస్ మరియు నత్రజని / సూక్ష్మపోషకాల లోపం (ఆకులు పసుపు రంగులోకి మారడం)',
      issueHindi: 'पत्तियों का पीला पड़ना (क्लोरोसिस) एवं नाइट्रोजन/पोषक तत्वों की कमी',
      confidence: 0.94,
      severity: 'Moderate',
      symptoms: [
        'Interveinal and generalized leaf yellowing starting from older foliage',
        'Stunted shoot growth and pale green coloration across canopy',
        'Reduced flowering and early leaf shedding'
      ],
      possibleCauses: [
        'Waterlogging causing root suffocation and poor nutrient uptake',
        'Nitrogen (N) or Iron/Zinc (Fe/Zn) deficiency in alkaline or sandy soils',
        'Early sucking pest attack (whiteflies or aphids) spreading mild virus'
      ],
      generalAdvisory: [
        'Ensure proper soil drainage; avoid standing water around plant root zones.',
        'Apply balanced water-soluble fertilizer: NPK 19:19:19 @ 5 grams per liter of water spray.',
        'Incorporate chelated zinc and iron micronutrient foliar spray (Multiplex or Formula-4).',
        'Spray Neem Oil (10,000 ppm) @ 2ml/L to deter sap-sucking insects naturally.'
      ],
      recommendedSteps: [
        'Inspect soil moisture and reduce irrigation frequency for 2-3 days.',
        'Collect soil sample for pH testing at the nearest Rythu Bharosa Kendram (RBK).',
        'Perform foliar spray early in the morning (7 AM - 9 AM) or late afternoon.',
        'Contact Krishi Vigyan Kendra (KVK) officer if symptoms spread to new shoots within 5 days.'
      ],
      organicRemedy: 'Neem seed kernel extract (NSKE 5%) + Panchagavya foliar spray (30ml/liter water).',
      chemicalRemedy: 'Foliar spray of 19:19:19 (0.5%) + Zinc sulphate (0.2%) with a good wetting agent.',
      disclaimer: 'Possible issue indicators based on visual pattern matching. Consult a qualified agricultural officer or Krishi Vigyan Kendra for field confirmation.'
    }
  },
  {
    id: 'rice-blast-paddy',
    name: 'Rice Blast & Spindle Spots',
    nameTelugu: 'వరిలో అగ్గి తెగులు (బ్లాస్ట్ వ్యాధి)',
    cropType: 'Paddy / Rice',
    description: 'Spindle-shaped elliptical lesions with grayish centers and dark brown margins on leaf blades.',
    previewGradient: 'from-amber-700/30 via-red-900/30 to-slate-900',
    icon: '🌾',
    analysis: {
      cropName: 'Paddy (Oryza sativa)',
      detectedIssue: 'Leaf Blast (Magnaporthe oryzae fungal infection)',
      issueTelugu: 'వరి ఆకు బ్లాస్ట్ (అగ్గి తెగులు ఫంగస్)',
      issueHindi: 'धान का ब्लास्ट रोग (पत्ती झुलसा)',
      confidence: 0.91,
      severity: 'High',
      symptoms: [
        'Diamond or spindle-shaped lesions with ash-colored centers',
        'Lesions coalesce causing complete leaf blighting',
        'Neck blast symptoms during panicle emergence phase'
      ],
      possibleCauses: [
        'Excessive nitrogenous fertilizer (Urea) usage without potash balance',
        'High humidity (>90%) accompanied by night temperatures below 20°C',
        'Dense planting limiting sunlight penetration'
      ],
      generalAdvisory: [
        'Immediately suspend further split applications of urea.',
        'Drain field water and refresh with fresh irrigation after 24 hours.',
        'Apply recommended fungicide before disease moves to panicle neck.'
      ],
      recommendedSteps: [
        'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.',
        'Maintain balanced Potassium fertilization to strengthen plant cell walls.',
        'Monitor field boundary bunds and remove alternate weed hosts.'
      ],
      organicRemedy: 'Pseudomonas fluorescens 10g/liter water foliar spray at early stages.',
      chemicalRemedy: 'Tricyclazole 75% WP (Beam) @ 120 grams per acre in 200 liters of water.',
      disclaimer: 'Possible issue indicators. Immediate field verification recommended to prevent neck blast spread.'
    }
  },
  {
    id: 'cotton-leaf-curl',
    name: 'Cotton Leaf Curl Virus',
    nameTelugu: 'పత్తిలో ఆకు ముడత తెగులు (Leaf Curl)',
    cropType: 'Cotton',
    description: 'Upward/downward leaf curling, thickening of veins, and enations on the undersides of leaves.',
    previewGradient: 'from-emerald-700/20 via-teal-900/30 to-slate-950',
    icon: '🌱',
    analysis: {
      cropName: 'Cotton (Gossypium)',
      detectedIssue: 'Cotton Leaf Curl Geminivirus & Whitefly Infestation',
      issueTelugu: 'పత్తి ఆకు ముడత వైరస్ మరియు తెల్లదోమ బెడద',
      issueHindi: 'कपास का पत्ती मरोड़ रोग (लीफ कर्ल वायरस)',
      confidence: 0.89,
      severity: 'Moderate',
      symptoms: [
        'Upward curling of leaf margins with pronounced vein thickening',
        'Small leaf-like outgrowths (enations) on underside of leaves',
        'Stunted square and boll formation'
      ],
      possibleCauses: [
        'Vector transmission by Bemisia tabaci (Silverleaf Whitefly)',
        'Hot and dry weather spells encouraging rapid vector proliferation'
      ],
      generalAdvisory: [
        'Install yellow sticky traps @ 8-10 traps per acre to monitor whiteflies.',
        'Target vector control; viruses cannot be cured once inside plant cells.'
      ],
      recommendedSteps: [
        'Eradicate heavily infected border plants.',
        'Spray Diafenthiuron 50% WP @ 1.25g/L or Pyriproxyfen 10% EC @ 2ml/L.',
        'Avoid excessive synthetic pyrethroids which cause whitefly resurgence.'
      ],
      organicRemedy: '5% Neem Seed Kernel Extract (NSKE) + Verticillium lecanii bio-agent.',
      chemicalRemedy: 'Flonicamid 50% WG (Ulala) @ 60-80g/acre in 200L water.',
      disclaimer: 'Possible issue indicators. Please verify vector counts with local agriculture extension officer.'
    }
  }
];

export interface DistrictWeather {
  district: string;
  state: string;
  temp: number;
  condition: string;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  advisory: string;
  advisoryTelugu: string;
}

export const DISTRICT_WEATHER: DistrictWeather[] = [
  {
    district: 'Guntur / Amaravati',
    state: 'Andhra Pradesh',
    temp: 31,
    condition: 'Partly Cloudy',
    humidity: 72,
    rainProbability: 40,
    windSpeed: 14,
    advisory: 'Moderate moisture levels favorable for foliar micronutrient spray. Avoid pesticide spray in late afternoon if rain clouds build up.',
    advisoryTelugu: 'తేమ శాతం మితంగా ఉంది. సూక్ష్మపోషకాల పిచికారీకి అనుకూలం. సాయంత్రం వర్ష సూచన ఉంటే పురుగుమందుల పిచికారీ వాయిదా వేయండి.'
  },
  {
    district: 'Warangal / Hanamkonda',
    state: 'Telangana',
    temp: 33,
    condition: 'Warm & Humid',
    humidity: 68,
    rainProbability: 25,
    windSpeed: 11,
    advisory: 'Ensure optimum field bund drainage for cotton and chilli plots. Check yellow sticky traps for sucking pest activity.',
    advisoryTelugu: 'పత్తి మరియు మిర్చి చేలల్లో నీటి నిల్వ ఉండకుండా చూడండి. తెల్లదోమ నియంత్రణ కోసం పసుపు రంగు జిగురు అట్టలను ఏర్పాటు చేయండి.'
  },
  {
    district: 'Kurnool / Rayalaseema',
    state: 'Andhra Pradesh',
    temp: 35,
    condition: 'Dry & Sunny',
    humidity: 55,
    rainProbability: 15,
    windSpeed: 16,
    advisory: 'High evapotranspiration rate. Maintain drip or light evening irrigation for groundnut and vegetable crops.',
    advisoryTelugu: 'ఎండ తీవ్రత ఎక్కువగా ఉంది. వేరుశనగ మరియు కూరగాయల తోటలకు సాయంత్రం వేళల్లో డ్రిప్ ద్వారా నీటి తడులు అందించండి.'
  }
];
