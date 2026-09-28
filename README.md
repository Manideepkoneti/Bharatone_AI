# 🇮🇳 BharatOne AI

> **"One Assistant. Many Needs."**  
> **"Understand. Guide. Connect."**  
> *Built as an innovation prototype for CodeForge 2026.*

---

## 🌟 Overview

**BharatOne AI** is a modern, multilingual AI citizen-assistance and service-navigation platform built for 1.4 billion Indian citizens. It provides a unified, conversational interface where citizens can ask questions in natural language—including Telugu, Hindi, and English—and receive structured, step-by-step guidance.

---

## 🚀 Live Evaluation Scenarios (Hackathon Test Cases)

### 🎓 Scenario 1 — Education Scholarship (Telugu)
- **Input:** `"Nenu oka student ni. Naaku scholarship kavali."`
- **AI Identification:**
  - **Language:** Telugu (`te`)
  - **Intent:** Scholarship & Fee Reimbursement Guidance
  - **Domain:** 🎓 Education
  - **Confidence:** 98%
- **Output:** Structured eligibility criteria (family income ceiling < ₹2.5L), Jagananna Vidya Deevena & Vasathi Deevena pathways, required documents (Aadhaar, MeeSeva Income & Caste, Bonafide, Mother Bank Account), and step-by-step e-KYC flow.

### 🌾 Scenario 2 — Agriculture Crop Health (Telugu)
- **Input:** `"Na panta lo aakulu yellow ga avutunnayi."`
- **AI Identification:**
  - **Language:** Telugu (`te`)
  - **Intent:** Crop Health Diagnosis & Nutrient Advisory
  - **Domain:** 🌾 Agriculture
  - **Confidence:** 98%
- **Output:** Computer vision leaf diagnostic roadmap, Nitrogen/Zinc chlorosis indicators, balanced foliar spray formula (19:19:19 + micronutrients), drainage advice, and toll-free Kisan Call Center hotline (`1800-180-1551`).

### 🏛️ Scenario 3 — Government Public Services (Telugu)
- **Input:** `"Naaku government service gurinchi telusukovali."`
- **AI Identification:**
  - **Language:** Telugu (`te`)
  - **Intent:** Public Service & Citizen Certificate Navigation
  - **Domain:** 🏛️ Public Services
  - **Confidence:** 98%
- **Output:** MeeSeva Tahsildar Integrated Income & Caste certificate checklist, DigiLocker integration, and official portal workflows.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Indian Modern Civic Design System
- **Icons:** Lucide React
- **Audio & Accessibility:** Web Speech API (Voice Recognition & Multilingual Text-to-Speech)
- **AI Engine:**
  - High-precision built-in offline NLP engine (guarantees 100% reliable execution during hackathon demos)
  - Optional Google Gemini API integration (Gemini 1.5 Flash support via Settings modal)
- **Storage:** LocalStorage persistence for user profiles, session histories, settings, and real-time interaction metrics.

---

## 🛠️ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# The app will be running at:
http://localhost:5173/
```

---

## 📋 Features Checklist

- [x] **Landing Page:** Hero with animated glowing AI orb, 6 domain cards, 4-step visual flow, and live sandbox.
- [x] **Authentication:** Modern split login view with 1-click demo personas (Student, Farmer, Citizen) & registration page with regional language, state, and education profile options.
- [x] **Dashboard:** Greeting header, live language selector chips, mic voice input, animated statistics counters (0 -> 426, 0 -> 1,248), quick prompt pills, and agro-weather widget.
- [x] **AI Assistant (The Core):** Real-time language detection, intent classification, AI Understanding panel, structured output (Summary, What I Understood, Questions, Interactive Document Checklist, Numbered Next Steps, and Official Disclaimers), plus audio readout.
- [x] **🎓 Education Assistant:** 4-step Scholarship Eligibility Wizard with real AP and Central schemes (JVD, NSP, Pragati, Reliance).
- [x] **🌾 Agriculture AI:** Crop leaf upload drop zone, preloaded realistic disease samples, computer vision indicator analysis, and district weather forecast.
- [x] **🏛️ Public Services Navigator:** Categorized government services (Certificates, Education, Agriculture, Healthcare, Housing, Transportation) with step-by-step guides.
- [x] **💼 Employment Module:** Career skill gap analyzer, SWAYAM / NPTEL certifications, and learning milestones.
- [x] **🏥 Healthcare Navigator:** PM-JAY & Aarogyasri hospital locator simulator, ABHA Health ID guide, emergency 108/104 helplines, and clear medical disclaimers.
- [x] **💰 Financial Literacy:** 50/30/20 budgeting simulator, digital UPI payment security guide, and interactive scam awareness simulator.
- [x] **👤 Citizen Profile:** Domicile state, preferred language, and academic level management.
- [x] **🕘 Conversation History:** Timeline of all past queries with instant review and follow-up support.
- [x] **📊 Impact Dashboard:** Real-time analytics, domain distribution, language charts, and top scheme leaderboard.
- [x] **🛡️ Admin Console:** Live query logs, inference latency monitoring, search/filter, and CSV export.
- [x] **Responsive & Accessible:** Tested across desktop, tablet, and mobile layouts.
