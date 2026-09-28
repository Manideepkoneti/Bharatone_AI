import React, { useState } from 'react';
import { DISTRICT_WEATHER, DistrictWeather } from '../../data/agriculture';
import { CloudRain, Wind, Droplets, Thermometer, MapPin, AlertCircle } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictWeather>(DISTRICT_WEATHER[0]);

  return (
    <div className="p-5 rounded-2xl glass-panel border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-900 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Regional Agro-Weather
            </h4>
            <p className="text-[11px] text-emerald-400 font-medium">
              Live Krishi Advisory
            </p>
          </div>
        </div>

        {/* District Selector */}
        <select
          value={selectedDistrict.district}
          onChange={(e) => {
            const found = DISTRICT_WEATHER.find((d) => d.district === e.target.value);
            if (found) setSelectedDistrict(found);
          }}
          className="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {DISTRICT_WEATHER.map((d) => (
            <option key={d.district} value={d.district}>
              📍 {d.district} ({d.state})
            </option>
          ))}
        </select>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
          <div className="flex items-center justify-center text-orange-400 mb-1">
            <Thermometer className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-white font-heading">{selectedDistrict.temp}°C</p>
          <p className="text-[10px] text-slate-400">Temperature</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
          <div className="flex items-center justify-center text-sky-400 mb-1">
            <Droplets className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-white font-heading">{selectedDistrict.humidity}%</p>
          <p className="text-[10px] text-slate-400">Humidity</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
          <div className="flex items-center justify-center text-blue-400 mb-1">
            <CloudRain className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-white font-heading">{selectedDistrict.rainProbability}%</p>
          <p className="text-[10px] text-slate-400">Rain Chance</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
          <div className="flex items-center justify-center text-teal-400 mb-1">
            <Wind className="w-4 h-4" />
          </div>
          <p className="text-lg font-bold text-white font-heading">{selectedDistrict.windSpeed} km/h</p>
          <p className="text-[10px] text-slate-400">Wind</p>
        </div>
      </div>

      {/* Regional Advisory Box */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Farming Advisory:</span>
        </div>
        <p className="text-slate-300 leading-relaxed font-telugu">
          {selectedDistrict.advisoryTelugu}
        </p>
        <p className="text-slate-400 text-[11px] leading-snug">
          {selectedDistrict.advisory}
        </p>
      </div>
    </div>
  );
};
