import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Download, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Landmark, 
  School, 
  Calendar,
  Building2,
  ChevronRight,
  ExternalLink,
  Info,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudentDashboard({ 
  student, 
  schemes, 
  t, 
  setActiveTab,
  onOpenProfile
}) {
  const [showSanctionModal, setShowSanctionModal] = useState(false);

  const activeScheme = schemes.find(s => s.id === student.appliedSchemeId) || schemes[2];

  const handleDownloadSanction = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setShowSanctionModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & PVTG Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-20 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-slate-900" />
                {t.pvtgBadge}
              </span>
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {t.aadhaarStatus}
              </span>
              <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 text-xs px-2.5 py-0.5 rounded-full font-mono">
                {t.apaarId}: {student.apaarId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
              {t.welcomeStudent}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              {student.course} • <span className="font-semibold text-amber-300">{student.institute}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="bg-white/15 hover:bg-white/25 text-white font-semibold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-white/20 flex items-center gap-1.5 transition cursor-pointer backdrop-blur-xs"
                title="View your verified Aadhaar, Caste, Income, and Academic profile"
              >
                <User className="w-4 h-4 text-amber-300" />
                <span>Complete Profile</span>
              </button>
            )}
            <button
              onClick={handleDownloadSanction}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition hover:scale-102 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Sanction Order</span>
            </button>
            <button
              onClick={() => setActiveTab('dbt')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition cursor-pointer"
            >
              <span>{t.dbtTracker}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">{t.currentActiveScheme}</span>
            <span className="text-sm font-bold text-amber-300 truncate block">Top Class Education</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">{t.disbursementSummary}</span>
            <span className="text-sm font-bold text-emerald-400">₹1,85,000</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">Current Stage</span>
            <span className="text-sm font-bold text-sky-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              PFMS DBT Batch 44
            </span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">{t.academicYear}</span>
            <span className="text-sm font-bold text-slate-200">2025 - 2026</span>
          </div>
        </div>
      </div>

      {/* Statutory One-Scheme Rule Warning Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <p className="font-bold text-sm text-amber-950 mb-0.5">{t.singleSchemeRuleTitle}</p>
          <p className="leading-relaxed text-amber-800">
            {t.singleSchemeRuleDesc} You are currently availing the <strong>Top Class Higher Education Scheme</strong>. Applying for another scheme like NFST or Post-Matric will automatically pause this application to ensure compliance.
          </p>
        </div>
      </div>

      {/* Main Grid: Lifecycle Timeline & Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 5-Stage Timeline Tracker (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{t.trackTimeline}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  Stage 4/5 Complete
                </span>
              </h2>
              <p className="text-xs text-slate-500">Application ID: {student.activeApplicationId}</p>
            </div>
            <button
              onClick={() => setActiveTab('schemes')}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>{t.allSchemes}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {student.timeline.map((item, index) => {
              const isDone = item.status === 'COMPLETED';
              const isInProgress = item.status === 'IN_PROGRESS';

              return (
                <div key={item.step} className="relative group">
                  {/* Step Bubble */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : isInProgress
                        ? 'bg-amber-400 border-amber-500 text-slate-950 animate-bounce'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-black">{item.step}</span>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className={`p-4 rounded-xl border transition ${
                    isInProgress
                      ? 'bg-amber-50/60 border-amber-200 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200/80'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-sm text-slate-900">{item.title}</span>
                      <span className="text-[11px] font-semibold text-slate-500">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        Actor: {item.actor}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Auto-Verified
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                          <Clock className="w-3 h-3 animate-spin" /> In Clearance
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Action & Digital Wallet Summary (1 col) */}
        <div className="space-y-6">
          {/* Action Center / Deficiency Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.pendingDeficiencies}</span>
            </h3>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-4">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Deficiencies Pending</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                {t.noDeficiencies}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Aadhaar Vault Token</span>
                <span className="font-mono font-bold text-slate-800">JH-UID-8812</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">AISHE Institution Node</span>
                <span className="font-bold text-slate-800">U-0120 (IIT KGP)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">State e-District Caste</span>
                <span className="font-bold text-emerald-600">JH-ST-PVTG-99410</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('wallet')}
              className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Open DigiLocker Wallet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* JAGO AI Quick Access Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                JA
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">JAGO AI Chatbot</h4>
                <p className="text-[11px] text-slate-500">Multilingual Voice & Query Assistant</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Need assistance with eligibility rules, DBT bank seeding, or switching to the National Overseas Scholarship (NOS)? Ask JAGO in your native language.
            </p>
            <button
              onClick={() => setActiveTab('jago')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Chat with JAGO</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sanction Letter Modal */}
      {showSanctionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <h3 className="font-extrabold text-base text-slate-900">MoTA Sanction Order Copy</h3>
              </div>
              <button
                onClick={() => setShowSanctionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 space-y-2">
              <div className="text-center pb-2 border-b border-slate-200">
                <p className="font-bold text-sm">GOVERNMENT OF INDIA</p>
                <p className="text-[11px] text-slate-600">MINISTRY OF TRIBAL AFFAIRS (EDUCATION SECTION)</p>
                <p className="text-[10px] text-slate-500">Shastri Bhawan, New Delhi - 110001</p>
              </div>
              <div className="pt-2">
                <p><strong>Sanction Order No:</strong> {student.sanctionOrderNumber}</p>
                <p><strong>Beneficiary:</strong> {student.name} ({student.tribe})</p>
                <p><strong>APAAR ID:</strong> {student.apaarId}</p>
                <p><strong>Institute:</strong> {student.institute}</p>
                <p><strong>Scheme:</strong> Top Class Higher Education for ST Students</p>
                <p><strong>Approved Grant:</strong> ₹1,85,000 (Tuition + Maintenance + IT Device)</p>
                <p><strong>Disbursement Mode:</strong> Direct Benefit Transfer (DBT via PFMS / AePS)</p>
                <p><strong>Status:</strong> Digitally Signed by Under Secretary to Govt of India</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSanctionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Sanction Order PDF simulated download completed.");
                  setShowSanctionModal(false);
                }}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
