import React, { useState } from 'react';
import { 
  Coins, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  HelpCircle,
  PiggyBank,
  TrendingUp,
  Calculator,
  ArrowRight,
  BookOpen,
  ExternalLink,
  X,
  Info,
  Lock,
  Building2,
  Landmark,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language } from '../../types';
import { useNotification } from '../../context/NotificationContext';

export const FinanceView: React.FC<{ selectedLang: Language }> = ({ selectedLang }) => {
  const { showToast } = useNotification();
  
  // 50/30/20 State
  const [budgetIncome, setBudgetIncome] = useState(25000);
  const needs = Math.round(budgetIncome * 0.50);
  const wants = Math.round(budgetIncome * 0.30);
  const savings = Math.round(budgetIncome * 0.20);

  // Savings Planner State
  const [plannerIncome, setPlannerIncome] = useState(35000);
  const [plannerExpenses, setPlannerExpenses] = useState(25000);
  const [plannerSavingsGoal, setPlannerSavingsGoal] = useState(100000);
  const [plannerMonths, setPlannerMonths] = useState(12);
  const [plannerRate, setPlannerRate] = useState(6.5); // % annual estimated interest

  // Calculated estimates
  const monthlySurplus = Math.max(0, plannerIncome - plannerExpenses);
  const monthlyDeposit = Math.min(monthlySurplus, plannerIncome * 0.6);
  // Compound monthly formula: FV = P * [((1 + r/n)^(nt) - 1) / (r/n)] * (1 + r/n)
  const r = (plannerRate / 100) / 12;
  const n = plannerMonths;
  const totalPrincipal = monthlyDeposit * n;
  const estimatedFutureValue = r > 0 
    ? Math.round(monthlyDeposit * (((Math.pow(1 + r, n) - 1) / r) * (1 + r)))
    : totalPrincipal;
  const estimatedInterest = Math.max(0, estimatedFutureValue - totalPrincipal);

  // Investment Education Category State
  const [activeInvestmentCategory, setActiveInvestmentCategory] = useState<string>('savings_account');
  const [showChecklistModal, setShowChecklistModal] = useState(false);

  // Scam Quiz State
  const [activeQuizQuestion, setActiveQuizQuestion] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

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
    },
    {
      scenario: 'A social media message guarantees: "Invest ₹5,000 today in our VIP trading group and get guaranteed ₹15,000 in 7 days."',
      options: [
        'Send money quickly since it promises guaranteed high profits.',
        'Report as fraud. No legitimate investment can promise guaranteed or risk-free returns.',
        'Ask friends to join to double the bonus.'
      ],
      correctIndex: 1,
      explanation: 'Guaranteed-return promises are the hallmark of Ponzi schemes and financial fraud. Legitimate investments always clearly state risks.'
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

  const investmentCategories: Record<string, {
    title: string;
    icon: string;
    whatItIs: string;
    purpose: string;
    risk: 'Very Low' | 'Low' | 'Moderate' | 'Market-Linked';
    liquidity: string;
    horizon: string;
    whatToResearch: string[];
    safetyRequirement: string;
  }> = {
    savings_account: {
      title: 'Savings Accounts',
      icon: '🏦',
      whatItIs: 'A basic bank deposit account maintained at a regulated commercial bank or postal bank that earns modest interest on daily balances.',
      purpose: 'Safe keeping of everyday operational money, salary credits, and immediate liquidity needs.',
      risk: 'Very Low',
      liquidity: 'Instant (24/7 ATM, UPI, NetBanking access)',
      horizon: 'Short-term (Immediate / Anytime)',
      whatToResearch: [
        'Minimum Average Balance (MAB) requirements and penalty charges',
        'Interest rate slabs offered by the bank',
        'Digital banking features, SMS charges, and debit card annual fees'
      ],
      safetyRequirement: 'Regulated by Reserve Bank of India (RBI). Deposits are insured up to ₹5,00,000 per depositor per bank by DICGC.'
    },
    fixed_deposits: {
      title: 'Fixed Deposits (FD)',
      icon: '🔒',
      whatItIs: 'A term deposit where you lock in a specific sum of money for a predetermined duration at a guaranteed, fixed interest rate.',
      purpose: 'Capital preservation with guaranteed interest for planned short-to-medium-term milestone goals.',
      risk: 'Low',
      liquidity: 'Moderate (Can be liquidated before maturity with minor penalty fee)',
      horizon: '7 days to 10 years (typically 1 to 3 years)',
      whatToResearch: [
        'Cumulative (reinvested) vs. Non-cumulative (payout) interest choices',
        'Premature withdrawal penalty terms (usually 0.5% - 1%)',
        'Tax deduction at source (TDS) thresholds and Form 15G/15H requirements'
      ],
      safetyRequirement: 'Bank FDs are covered under RBI DICGC ₹5 Lakh insurance. Avoid unrated private corporate deposits.'
    },
    recurring_deposits: {
      title: 'Recurring Deposits (RD)',
      icon: '🗓️',
      whatItIs: 'A disciplined savings scheme where a fixed sum is automatically deposited every month for a chosen tenure at a fixed interest rate.',
      purpose: 'Building an emergency fund or saving toward an annual goal out of regular monthly income.',
      risk: 'Low',
      liquidity: 'Moderate (Pre-closure allowed with nominal penalty)',
      horizon: '6 months to 10 years',
      whatToResearch: [
        'Monthly installment penalty for missed payment dates',
        'Compounding frequency (generally compounded quarterly)',
        'Senior citizen additional interest benefits if applicable'
      ],
      safetyRequirement: 'Offered by scheduled commercial banks and India Post. Fully regulated and backed by DICGC insurance.'
    },
    mutual_funds: {
      title: 'Mutual Funds',
      icon: '📊',
      whatItIs: 'A professionally managed investment pool that collects money from many investors to buy a diversified basket of stocks, bonds, or money market instruments.',
      purpose: 'Long-term wealth creation, beating inflation, and accessing professional fund management.',
      risk: 'Market-Linked',
      liquidity: 'High to Moderate (Redemption processed in 1 to 3 business days; ELSS has 3-year lock-in)',
      horizon: '3 to 7+ years for Equity; 1 to 3 years for Debt',
      whatToResearch: [
        'Expense ratio (annual fee charged by the Asset Management Company)',
        'Exit load percentage if redeemed before 1 year',
        'Fund manager track record and consistency across market cycles (past returns do not guarantee future performance)'
      ],
      safetyRequirement: 'Regulated strictly by SEBI and AMFI. Mutual fund units are held in your registered name. Subject to market risk.'
    },
    index_funds: {
      title: 'Index Funds',
      icon: '📈',
      whatItIs: 'A passive mutual fund designed to replicate the performance of a market benchmark index (such as Nifty 50 or BSE Sensex) without active stock picking.',
      purpose: 'Low-cost, transparent long-term participation in overall economic growth.',
      risk: 'Market-Linked',
      liquidity: 'High (Redeemed in 1 to 2 business days)',
      horizon: '5 to 10+ years',
      whatToResearch: [
        'Tracking error (how closely the fund mirrors the actual index return)',
        'Expense ratio (usually significantly lower than actively managed funds, often <0.3%)',
        'Direct plan vs. Regular plan (Direct plans save intermediary distributor commissions)'
      ],
      safetyRequirement: 'Regulated by SEBI. No individual stock selection risk, but full broad market risk applies.'
    },
    govt_securities: {
      title: 'Government Securities (G-Secs / T-Bills)',
      icon: '🏛️',
      whatItIs: 'Debt instruments issued by the Government of India or State Governments through the Reserve Bank of India to finance public infrastructure.',
      purpose: 'Maximum safety of principal with regular sovereign interest payments.',
      risk: 'Very Low',
      liquidity: 'Moderate (Tradable on secondary markets via RBI Retail Direct)',
      horizon: 'Treasury Bills (91-364 days); Dated G-Secs (5 to 40 years)',
      whatToResearch: [
        'Coupon yield rate vs. prevailing inflation',
        'How to open an account on the official RBI Retail Direct portal (rbiretaildirect.org.in)',
        'Interest taxability according to your personal income slab'
      ],
      safetyRequirement: 'Backed by the Sovereign Guarantee of the Government of India. Zero credit/default risk.'
    },
    ppf: {
      title: 'Public Provident Fund (PPF)',
      icon: '🇮🇳',
      whatItIs: 'A government-backed long-term statutory savings scheme offering guaranteed interest set by the Ministry of Finance and full tax exemption.',
      purpose: 'Retirement corpus building, long-term disciplined wealth accumulation with triple-tax-exempt (EEE) status.',
      risk: 'Very Low',
      liquidity: 'Low (15-year statutory maturity; partial withdrawals permitted after 7th year)',
      horizon: '15 years (extendable in 5-year blocks)',
      whatToResearch: [
        'Minimum deposit of ₹500/year and maximum limit of ₹1,50,000/year',
        'Loan against PPF balance rules between the 3rd and 6th financial year',
        'Exempt-Exempt-Exempt (EEE) status under Section 80C of the Income Tax Act'
      ],
      safetyRequirement: 'Sovereign backing directly by the Central Government. Cannot be attached by court decrees for debt recovery.'
    }
  };

  const currentCategory = investmentCategories[activeInvestmentCategory];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-10 animate-fade-in text-slate-200">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Coins className="w-3.5 h-3.5" />
          <span>Financial Literacy & Digital Empowerment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          💰 Financial Guidance & Cyber Safety
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Learn essential personal budgeting, compound interest savings planning, regulated investment categories, and digital payment fraud prevention.
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

      {/* SECTION A: SAVINGS GUIDANCE & SAVINGS PLANNER */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <PiggyBank className="w-4 h-4" />
            <span>A. Savings Guidance & Interactive Planner</span>
          </div>
          <h2 className="text-2xl font-black text-white font-heading">
            Build Smart Savings Habits & Plan Your Future
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Educational tools to calculate savings projections and master household financial budgeting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Savings Planner Calculator */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0a1622] to-[#070d17] space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-heading">
                  Interactive Savings Planner
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Compound Growth Tool
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={plannerIncome}
                  onChange={(e) => setPlannerIncome(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Monthly Expenses (₹)
                </label>
                <input
                  type="number"
                  step="1000"
                  value={plannerExpenses}
                  onChange={(e) => setPlannerExpenses(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Monthly Savings Goal (₹)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={plannerSavingsGoal}
                  onChange={(e) => setPlannerSavingsGoal(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Savings Period (Months)
                </label>
                <select
                  value={plannerMonths}
                  onChange={(e) => setPlannerMonths(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value={6}>6 Months (Short-term)</option>
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                </select>
              </div>
            </div>

            {/* Interest Rate Assumption Slider */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Educational Return Rate Assumption:</span>
                <span className="text-emerald-400 font-mono font-bold">{plannerRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={plannerRate}
                onChange={(e) => setPlannerRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>3.0% (Savings Bank)</span>
                <span>6.5% (Typical RD / FD)</span>
                <span>9.0% (Long-Term PPF/Equities)</span>
              </div>
            </div>

            {/* Educational Calculation Results Display */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Educational Estimate Summary
                </span>
                <span className="text-[11px] text-slate-400">
                  Based on ₹{monthlyDeposit.toLocaleString()}/mo
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-slate-900/70">
                  <p className="text-[10px] text-slate-400 font-medium">Monthly Surplus</p>
                  <p className="text-sm font-bold text-sky-400 font-mono mt-0.5">
                    ₹{monthlySurplus.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/70">
                  <p className="text-[10px] text-slate-400 font-medium">Total Deposited</p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">
                    ₹{totalPrincipal.toLocaleString()}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/70">
                  <p className="text-[10px] text-slate-400 font-medium">Estimated Future Total</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    ₹{estimatedFutureValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-300">Estimated Compound Interest Gain:</span>
                <span className="font-mono text-emerald-300 font-bold">+₹{estimatedInterest.toLocaleString()}</span>
              </div>

              {/* Strict Disclaimer label */}
              <p className="text-[10px] text-slate-400 leading-relaxed italic border-t border-white/5 pt-2">
                ⚠️ <strong>Educational Estimate Only:</strong> Calculations are strictly illustrative for financial education. Real interest rates vary across institutions and are subject to TDS, applicable taxes, and market fluctuations. BharatOne does not guarantee returns.
              </p>
            </div>
          </div>

          {/* Educational Suggestions & Financial Habits */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Core Financial Principles</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  1. Creating a Monthly Budget
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Track your household income versus fixed expenses before allocating funds for lifestyle desires.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  2. Building an Emergency Fund
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Strive to build a cushion of 3 to 6 months of living expenses in an easily accessible liquid savings or FD account.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  3. Needs vs. Wants
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Needs are essentials (groceries, medicine, rent, school fees). Wants are non-essentials (dining out, entertainment, impulse shopping).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  4. The Power of Compound Interest
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Compound interest earns interest on previous interest. Starting early allows even modest recurring savings to grow substantially over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION B: LEARN ABOUT INVESTING */}
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <TrendingUp className="w-4 h-4" />
            <span>B. Learn About Investing</span>
          </div>
          <h2 className="text-2xl font-black text-white font-heading">
            Understanding Regulated Investment Products
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Learn about common financial categories in simple, transparent language without marketing hype.
          </p>
        </div>

        {/* Category Pills Switcher */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(investmentCategories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveInvestmentCategory(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeInvestmentCategory === key
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:border-sky-500/30'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Category Detail Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0c192c] via-[#09121f] to-[#070d17] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentCategory.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">
                  {currentCategory.title}
                </h3>
                <p className="text-xs text-sky-300 font-medium">
                  {currentCategory.purpose}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                currentCategory.risk === 'Very Low'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : currentCategory.risk === 'Low'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                  : currentCategory.risk === 'Moderate'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                Risk: {currentCategory.risk}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                Horizon: {currentCategory.horizon}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What It Is
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentCategory.whatItIs}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Liquidity & Access
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentCategory.liquidity}
              </p>
            </div>
          </div>

          {/* What to Research Before Choosing */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Important Things to Research Before Choosing:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {currentCategory.whatToResearch.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Requirement & Legal Safeguards */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 font-bold block uppercase tracking-wide text-[10px]">
                Regulatory Oversight & Protection
              </strong>
              <p>{currentCategory.safetyRequirement}</p>
            </div>
          </div>

          {/* Mandatory Non-Advisory Notice */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
            🛡️ <strong>Educational Notice:</strong> BharatOne AI does NOT tell users to invest in any specific app or product. We do NOT guarantee returns or endorse schemes. Always research regulated providers and consider speaking with a registered financial professional or guardian before committing funds.
          </div>
        </div>
      </div>

      {/* SECTION C: INVESTMENT PLATFORMS & APPS */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Layers className="w-4 h-4" />
              <span>C. Investment Platforms & Apps</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Regulated Platforms for Financial Products
            </h3>
            <p className="text-xs text-slate-400">
              Understanding access channels for Mutual Funds, Stocks, ETFs, and Government Securities.
            </p>
          </div>

          <button
            onClick={() => setShowChecklistModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Research Before You Invest Checklist</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In India, retail citizens can access financial products through SEBI-registered brokers, AMFI-registered mutual fund distributors, or direct portals like RBI Retail Direct. Below are notable examples of regulated platforms that users can independently research.
        </p>

        {/* Examples Grid (Clearly presented as examples, not ranked, no returns guaranteed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Zerodha</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400">SEBI Broker</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discount brokerage platform for direct mutual funds (Coin), stocks, and government bonds.
            </p>
            <span className="text-[10px] text-slate-500 block">Example platform to research</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Groww</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400">SEBI Broker</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Online mobile platform for paperless Direct mutual funds SIPs and equity investments.
            </p>
            <span className="text-[10px] text-slate-500 block">Example platform to research</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">SBI YONO</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400">Banking App</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              State Bank of India integrated app for opening Fixed Deposits (FD), Recurring Deposits (RD), and PPF.
            </p>
            <span className="text-[10px] text-slate-500 block">Example platform to research</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">RBI Retail Direct</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">Govt Portal</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official Reserve Bank of India portal enabling individual citizens to directly buy G-Secs and T-Bills without middlemen.
            </p>
            <span className="text-[10px] text-slate-500 block">Official RBI facility</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400">
          * Note: Platforms listed above are purely illustrative examples of regulated services for educational awareness. BharatOne AI does not rank them as "best", does not receive referral compensation, and does not guarantee safety or performance.
        </div>
      </div>

      {/* SECTION D: FINANCIAL SCAM AWARENESS WARNING CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 space-y-5 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white font-heading">
              Stay Safe From Financial Scams
            </h3>
            <p className="text-xs text-rose-300">
              Critical warnings against prevailing digital payment and cyber investment fraud.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/20 space-y-1">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              🚫 Guaranteed Returns
            </span>
            <p className="text-slate-300 leading-relaxed">
              Any app or WhatsApp group claiming 100% guaranteed high returns is a fraud. Real investments carry market risks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/20 space-y-1">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              🚫 Fake Investment Apps
            </span>
            <p className="text-slate-300 leading-relaxed">
              Never download APK files sent via Telegram or SMS. Only install apps verified on Google Play Store or Apple App Store.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/20 space-y-1">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              🚫 OTP & PIN Requests
            </span>
            <p className="text-slate-300 leading-relaxed">
              No genuine bank officer, police officer, or support staff will EVER ask for your OTP, UPI PIN, or NetBanking password.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/20 space-y-1">
            <span className="font-bold text-rose-300 flex items-center gap-1.5">
              🚫 Urgent Pressure Tactics
            </span>
            <p className="text-slate-300 leading-relaxed">
              Scammers create false panic ("account blocked in 10 minutes", "customs parcel arrested"). Take a breath; verify through official branches.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-white/5 text-xs text-slate-300">
          <span>If you suspect cyber fraud, call the National Cyber Crime Helpline immediately:</span>
          <span className="font-mono text-base font-black text-rose-400">📞 1930 (Toll-Free)</span>
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
              <span className="text-lg font-bold text-white font-mono">₹{budgetIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="150000"
              step="5000"
              value={budgetIncome}
              onChange={(e) => setBudgetIncome(Number(e.target.value))}
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

      {/* RESEARCH BEFORE YOU INVEST MODAL */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-white/20 bg-[#0B0F19]/95 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Research Before You Invest
                  </h3>
                  <p className="text-xs text-slate-400">
                    Essential 8-point citizen checklist before investing in any app or product
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>1. Is the provider regulated?</span>
                </span>
                <p className="text-slate-300">
                  Verify registration with SEBI (for stocks/mutual funds), RBI (for banks/NBFCs/G-Secs), or IRDAI (for insurance). Check their registration number directly on the regulator's portal.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>2. What are the fees?</span>
                </span>
                <p className="text-slate-300">
                  Ask about account opening fees, annual maintenance charges (AMC), brokerage per order, expense ratios, and exit loads.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>3. What are the risks?</span>
                </span>
                <p className="text-slate-300">
                  Every investment involves some form of risk — market risk, credit risk, inflation risk, or liquidity risk. Never invest money you cannot afford to have tied up or fluctuate.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>4. What product am I buying?</span>
                </span>
                <p className="text-slate-300">
                  Do not buy complex derivatives (Futures & Options) or unrated crypto tokens if you only wanted a simple savings plan. Understand how the underlying asset generates value.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>5. Can I withdraw easily?</span>
                </span>
                <p className="text-slate-300">
                  Understand the settlement timeline (T+1 or T+2 for equities, 2-3 days for mutual funds) and whether partial withdrawals have conditions.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>6. What documents are required?</span>
                </span>
                <p className="text-slate-300">
                  Standard KYC requires PAN card, Aadhaar, verified bank account with IFSC code, and mobile OTP. Legitimate apps do not ask for blank signed cheques or ATM card PINs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>7. Are there lock-in periods?</span>
                </span>
                <p className="text-slate-300">
                  Certain tax-saving instruments (ELSS has 3-year lock-in; PPF has 15-year statutory tenure; FDs have premature penalty). Know before you commit.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-2">
                  <span>8. What happens if the investment loses value?</span>
                </span>
                <p className="text-slate-300">
                  Are your funds insured up to ₹5 Lakhs by DICGC (bank deposits) or market-linked without government guarantee? Know your downside risk.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all"
              >
                Close Checklist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
