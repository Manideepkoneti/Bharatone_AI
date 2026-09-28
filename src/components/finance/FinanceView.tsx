import React, { useState } from 'react';
import { Coins, ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const FinanceView: React.FC<{ selectedLang: Language }> = () => {
  const { showToast } = useNotification();
  const [monthlyIncome, setMonthlyIncome] = useState(25000);
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // 50/30/20 Rule Calculations
  const needs = Math.round(monthlyIncome * 0.50);
  const wants = Math.round(monthlyIncome * 0.30);
  const savings = Math.round(monthlyIncome * 0.20);

  const quizQuestions = [
    {
      scenario: 'You receive an SMS claiming: "Dear Customer, your electricity connection will be disconnected tonight by 9:30 PM. Call official officer at 9876543210 immediately."',
      options: [
        'Call the number immediately and make payment via the link they send.',
        'Ignore/Report as scam. Electricity boards never disconnect without prior written bills.',
        'Share OTP to verify your account.'
      ],
      correctIndex: 1,
      explanation: 'Fake electricity bill disconnection threats are common phishing tactics. Official discoms never send private mobile numbers for bill payments.'
    },
    {
      scenario: 'Someone online offers to buy your old cycle and says: "I sent you a QR code on WhatsApp. Scan it and enter your UPI PIN to receive ₹3,500 advance."',
      options: [
        'Scan QR code and enter UPI PIN.',
        'Never scan or enter PIN to receive money. UPI PIN is only needed to SEND money.',
        'Ask them to send OTP instead.'
      ],
      correctIndex: 1,
      explanation: 'GOLDEN RULE OF UPI: You NEVER need to enter your UPI PIN or scan a QR code to receive money! Entering your PIN always deducts money from your account.'
    }
  ];

  const handleAnswer = (optionIdx: number) => {
    setSelectedQuizAnswer(optionIdx);
    if (optionIdx === quizQuestions[activeQuizQuestion].correctIndex) {
      setQuizScore((prev) => prev + 1);
      showToast('Correct Assessment!', 'You correctly detected the cyber scam pattern.', 'success');
    } else {
      showToast('Scam Warning!', 'Careful! This action would result in financial loss.', 'error');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Coins className="w-3.5 h-3.5" />
          <span>Financial Literacy & Cyber Safety</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          💰 Financial Guidance & Digital Safety
        </h1>
        <p className="text-sm text-slate-400">
          Digital payment (UPI) security, interactive scam detection simulator, and 50/30/20 budgeting calculator.
        </p>
      </div>

      {/* Golden UPI Security Rule Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-orange-950/30 to-slate-900 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <span>The #1 Golden Rule of UPI Safety</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
            You NEVER need to enter UPI PIN to receive money!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Entering your UPI PIN or scanning an incoming QR code will always deduct money from your bank account. If anyone asks you to enter your PIN to claim a lottery, reward, or advance, it is 100% fraud.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-center shrink-0 w-full md:w-auto">
          <p className="text-[10px] uppercase font-bold text-slate-400">National Cyber Crime Helpline</p>
          <p className="text-2xl font-black text-amber-400 font-mono my-0.5">1930</p>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-sky-400 hover:underline font-semibold block"
          >
            cybercrime.gov.in
          </a>
        </div>
      </div>

      {/* Two Column: Budget Simulator & Scam Awareness Quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive 50/30/20 Budgeting Simulator */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white font-heading">
              50/30/20 Budgeting Simulator
            </h3>
            <span className="text-xs text-amber-400 font-semibold">Financial Wellness</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Monthly Take-Home Income:</span>
              <span className="text-lg font-bold text-white font-mono">₹{monthlyIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹10,000</span>
              <span>₹75,000</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-sky-300">50% Essential Needs (Rent, Food, EMI)</span>
                <span className="text-white font-mono">₹{needs.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-500 w-1/2 rounded-full" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-purple-300">30% Personal Wants (Shopping, Outings)</span>
                <span className="text-white font-mono">₹{wants.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 w-[30%] rounded-full" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-300">20% Emergency Fund & Savings (FD, Gold)</span>
                <span className="text-white font-mono">₹{savings.toLocaleString()}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[20%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scam Awareness Simulator Quiz */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-heading">
                Scam Awareness Simulator
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">
              Score: {quizScore}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-white font-medium p-3.5 rounded-xl bg-slate-900/90 border border-white/5 leading-relaxed">
              {quizQuestions[activeQuizQuestion].scenario}
            </p>

            <div className="space-y-2">
              {quizQuestions[activeQuizQuestion].options.map((opt, idx) => {
                const isChosen = selectedQuizAnswer === idx;
                const isCorrect = idx === quizQuestions[activeQuizQuestion].correctIndex;
                return (
                  <button
                    key={idx}
                    disabled={selectedQuizAnswer !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedQuizAnswer !== null
                        ? isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : isChosen
                          ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-white/5 text-slate-400'
                        : 'bg-slate-900/80 border-white/5 hover:border-amber-500/40 text-slate-300 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedQuizAnswer !== null && (
              <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-300 space-y-2">
                <p>{quizQuestions[activeQuizQuestion].explanation}</p>
                <button
                  onClick={() => {
                    setSelectedQuizAnswer(null);
                    setActiveQuizQuestion((prev) => (prev + 1) % quizQuestions.length);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-500/30 transition-all"
                >
                  Next Scenario →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
