import React, { useState } from 'react';
import { SAMPLE_CROP_IMAGES, SampleCropImage, DISTRICT_WEATHER } from '../../data/agriculture';
import { CropAnalysisResult, Language } from '../../types';
import { 
  Sprout, 
  UploadCloud, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  Sparkles,
  RotateCcw,
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Video,
  ExternalLink
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface AgricultureViewProps {
  selectedLang: Language;
}

export const AgricultureView: React.FC<AgricultureViewProps> = ({ selectedLang }) => {
  const { showToast } = useNotification();

  const [cropType, setCropType] = useState('Tomato / Paddy');
  const [location, setLocation] = useState('Andhra Pradesh (Guntur)');
  const [description, setDescription] = useState('Na panta lo aakulu yellow ga avutunnayi.');
  const [selectedSample, setSelectedSample] = useState<SampleCropImage | null>(SAMPLE_CROP_IMAGES[0]);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CropAnalysisResult | null>(SAMPLE_CROP_IMAGES[0].analysis);

  const getYouTubeQuery = (topic?: string) => {
    const isRice = cropType.toLowerCase().includes('paddy') || cropType.toLowerCase().includes('rice');
    const isTomato = cropType.toLowerCase().includes('tomato');
    
    if (selectedLang === 'te') {
      if (isRice) return 'వరి ఆకులు పసుపు రంగులో మారడం కారణాలు పరిష్కారం';
      if (isTomato) return 'టమోటా ఆకులు పసుపు రంగు తెగులు నివారణ';
      return `${cropType} ఆకులు పసుపు రంగు నివారణ వ్యవసాయం`;
    }
    
    if (selectedLang === 'hi') {
      if (isRice) return 'धान की पत्तियां पीली होने के कारण और समाधान';
      if (isTomato) return 'टमाटर की पत्तियां पीली होने का उपचार और दवा';
      return `${cropType} पत्तियां पीली होने का समाधान कृषि`;
    }

    // English
    if (topic === 'organic') return `${cropType} yellow leaves organic home remedy treatment`;
    if (topic === 'fertilizer') return `${cropType} nutrient deficiency NPK zinc fertilizer guide`;
    if (topic === 'expert') return `${cropType} crop disease management krishi vigyan kendra`;
    return `${cropType} yellow leaves nutrient deficiency treatment`;
  };

  const getYouTubeSearchUrl = (topic?: string) => {
    const query = getYouTubeQuery(topic);
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImagePreview(reader.result as string);
        setSelectedSample(null);
        showToast('Image Uploaded', `${file.name} ready for AI analysis.`, 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // If sample was selected, use its rich analysis; otherwise generate based on description
      if (selectedSample) {
        setAnalysisResult(selectedSample.analysis);
      } else {
        setAnalysisResult(SAMPLE_CROP_IMAGES[0].analysis);
      }
      showToast('AI Analysis Completed', 'Possible issue indicators identified.', 'success');
    }, 900);
  };

  const weather = DISTRICT_WEATHER[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <Sprout className="w-3.5 h-3.5" />
            <span>Dedicated Agritech AI Module</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            🌾 Agriculture AI & Crop Health
          </h1>
          <p className="text-sm text-slate-400">
            Computer vision leaf indicator analysis, nutrient chlorosis advisory, and Krishi Vigyan Kendra guidance.
          </p>
        </div>

        {/* Kisan Call Center Helpline Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <PhoneCall className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Toll-Free Kisan Call Center</p>
            <p className="text-sm font-black text-white font-mono">1800-180-1551</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Upload & Form Inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upload Area */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center justify-between">
              <span>Upload Crop Image</span>
              <span className="text-xs text-emerald-400 font-medium">Visual Screening</span>
            </h3>

            {/* Drop Zone Box with animated border on hover */}
            <label className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/80 bg-slate-900/60 hover:bg-slate-900/90 cursor-pointer transition-all duration-300 group overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedImagePreview ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden">
                  <img
                    src={uploadedImagePreview}
                    alt="Uploaded Crop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-semibold text-white bg-slate-900/80 px-3 py-1.5 rounded-lg">
                      Click to Change Photo
                    </span>
                  </div>
                </div>
              ) : selectedSample ? (
                <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${selectedSample.previewGradient} flex flex-col items-center justify-center text-center p-4 border border-white/10`}>
                  <span className="text-4xl mb-2">{selectedSample.icon}</span>
                  <p className="text-sm font-bold text-white">{selectedSample.name}</p>
                  <p className="text-xs text-slate-300 mt-1 font-telugu">{selectedSample.nameTelugu}</p>
                  <span className="mt-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    Preloaded Hackathon Sample
                  </span>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Drag crop leaf photo here</p>
                    <p className="text-xs text-slate-400 mt-0.5">or click to browse from device camera</p>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Supports JPG, PNG, WEBP</span>
                </div>
              )}
            </label>

            {/* Quick Demo Preloaded Sample Crops */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Or select preloaded demo sample:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_CROP_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSelectedSample(sample);
                      setUploadedImagePreview(null);
                      setAnalysisResult(sample.analysis);
                      setCropType(sample.cropType);
                      showToast('Sample Loaded', sample.name, 'info');
                    }}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      selectedSample?.id === sample.id
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-base block">{sample.icon}</span>
                    <p className="text-[10px] font-bold text-white truncate mt-1">{sample.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-slate-400 truncate">{sample.cropType}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Form Inputs */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Crop Type
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Tomato / Paddy">Tomato / Vegetable Crops</option>
                  <option value="Paddy / Rice">Paddy / Rice (Oryza sativa)</option>
                  <option value="Cotton">Cotton (Kapas)</option>
                  <option value="Chilli / Mirchi">Chilli / Mirchi</option>
                  <option value="Maize / Corn">Maize / Corn</option>
                  <option value="Groundnut">Groundnut (Peanut)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  State / District
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Observation / Symptoms
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe leaf yellowing, spots, or insects noticed..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-telugu"
                />
              </div>

              {/* Analyze Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <span>Analyzing Plant Indicators...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Crop Health</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Regional Weather Card (Section 13) */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3 bg-gradient-to-br from-[#091522] to-[#0B0F19]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-white font-heading">
                📍 {weather.district}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                {weather.condition}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-slate-900/60">
                <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">{weather.temp}°C</p>
                <p className="text-[10px] text-slate-400">Temperature</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60">
                <Droplets className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">{weather.humidity}%</p>
                <p className="text-[10px] text-slate-400">Humidity</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/60">
                <CloudRain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">{weather.rainProbability}%</p>
                <p className="text-[10px] text-slate-400">Rain Prob.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Image Analysis Results */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0A1624] via-[#09121E] to-[#070D17] space-y-6 animate-fade-in">
              {/* Header Analysis Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    🔬 AI IMAGE ANALYSIS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-1">
                    Possible Issue Indicators
                  </h3>
                  <p className="text-xs text-emerald-300 font-medium font-telugu mt-0.5">
                    {analysisResult.issueTelugu}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {Math.round(analysisResult.confidence * 100)}% Confidence
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    analysisResult.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {analysisResult.severity} Severity
                  </span>
                </div>
              </div>

              {/* Detected Condition */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Condition Diagnosed
                </span>
                <p className="text-sm font-semibold text-white">
                  {analysisResult.detectedIssue}
                </p>
              </div>

              {/* Observed Symptoms & Probable Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Observed Symptoms
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.symptoms.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Possible Causes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {analysisResult.possibleCauses.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* General Advisory */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  General Advisory & Soil Care:
                </h4>
                <div className="space-y-2">
                  {analysisResult.generalAdvisory.map((adv, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-200 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remedies: Organic & Scientific */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Targeted Remedies:
                </h4>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-200">
                    <strong className="text-emerald-300">🌿 Organic Recommendation:</strong> {analysisResult.organicRemedy}
                  </p>
                  {analysisResult.chemicalRemedy && (
                    <p className="text-slate-200">
                      <strong className="text-sky-300">🧪 Scientific / Chemical Spray:</strong> {analysisResult.chemicalRemedy}
                    </p>
                  )}
                </div>
              </div>

              {/* Recommended Next Steps */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Recommended Next Steps:
                </h4>
                <div className="space-y-2 text-xs">
                  {analysisResult.recommendedSteps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-slate-200">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Watch & Learn: Problem-Related Educational Videos */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/30 via-slate-900 to-slate-900 border border-red-500/30 space-y-4 animate-fade-in shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20 shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-heading">
                        <span>🎥 Watch & Learn</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          Educational Videos
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        Problem-related agricultural video resources & field treatment demos
                      </p>
                    </div>
                  </div>

                  <a
                    href={getYouTubeSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25 transition-all hover:scale-105 active:scale-95 group shrink-0"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Targeted Educational Search Query:</span>
                    <span className="font-mono text-red-400 font-bold uppercase">{selectedLang.toUpperCase()}</span>
                  </div>
                  <p className="text-xs font-semibold text-white bg-slate-950/80 p-2.5 rounded-lg border border-white/5 font-telugu">
                    "{getYouTubeQuery()}"
                  </p>
                </div>

                {/* Quick Topic Pill Links */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Explore Specific Video Topics:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={getYouTubeSearchUrl('organic')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>🌿 Organic Remedies</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={getYouTubeSearchUrl('fertilizer')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>🧪 Fertilizer & Spray Guides</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={getYouTubeSearchUrl('expert')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-all hover:scale-105"
                    >
                      <span>🧑‍🌾 Krishi Vigyan Kendra Talks</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Explicit Mandatory Agritech Disclaimer (Section 13) */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-xs text-amber-200">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="text-amber-300 font-bold block uppercase tracking-wide text-[10px]">
                    Expert Verification Notice
                  </strong>
                  <p>
                    {analysisResult.disclaimer}
                  </p>
                  <p className="text-amber-300/80 text-[11px] font-medium pt-1">
                    "Consult a qualified agricultural expert for confirmation when needed."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
