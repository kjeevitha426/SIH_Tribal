import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Award, 
  GraduationCap, 
  Plane, 
  BookOpen, 
  Building,
  Info,
  ExternalLink
} from 'lucide-react';

export default function SchemeCards({ schemes, student, t, setActiveTab, userRole = 'student' }) {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredSchemes = schemes.filter(s => {
    if (filter === 'active') return s.isActiveForUser;
    if (filter === 'higher') return s.id === 'top-class' || s.id === 'nfst' || s.id === 'nos';
    if (filter === 'school') return s.id === 'pre-matric' || s.id === 'post-matric';
    return true;
  });

  const getSchemeIcon = (id) => {
    switch (id) {
      case 'pre-matric': return BookOpen;
      case 'post-matric': return GraduationCap;
      case 'top-class': return Building;
      case 'nfst': return Award;
      case 'nos': return Plane;
      default: return GraduationCap;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>{t.allSchemes}</span>
            <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              5 Unified Schemes
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Previously scattered across NSP, SFMP (Canara Bank), and NOS Portals. Now unified under MoTA-SETU.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            All Schemes (5)
          </button>
          <button
            onClick={() => setFilter('school')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filter === 'school' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            School Level (2)
          </button>
          <button
            onClick={() => setFilter('higher')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filter === 'higher' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Higher Education & Research (3)
          </button>
        </div>
      </div>

      {/* Enforcement Rule Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lock className="w-4 h-4" />
        </div>
        <div className="text-xs text-blue-900">
          <p className="font-bold text-sm text-blue-950 mb-0.5">Automated Single-Benefit Deduplication Rule</p>
          <p className="text-blue-800 leading-relaxed">
            Students can only avail one active MoTA scholarship at a time. The system automatically cross-references your <strong>APAAR ID</strong> and <strong>Aadhaar Vault Hash</strong>. You are currently receiving benefits under <strong>Top Class Education</strong>. You can view or apply for future transition (e.g. NOS for study abroad or NFST for Ph.D.) without re-uploading documents.
          </p>
        </div>
      </div>

      {/* 5 Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchemes.map((scheme) => {
          const Icon = getSchemeIcon(scheme.id);
          const isCurrentActive = scheme.isActiveForUser;

          return (
            <div
              key={scheme.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                isCurrentActive
                  ? 'bg-amber-50/40 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="p-5">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${scheme.badgeColor}`}>
                    {scheme.coverage}
                  </span>
                  {isCurrentActive ? (
                    <span className="text-[11px] font-extrabold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-3 h-3" /> ACTIVE FOR YOU
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {scheme.legacyPortal}
                    </span>
                  )}
                </div>

                {/* Scheme Title & Icon */}
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${scheme.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {t[scheme.titleKey]}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {t[scheme.descKey]}
                </p>

                {/* Key Metrics */}
                <div className="space-y-1.5 text-[11px] bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Grant Amount:</span>
                    <span className="font-bold text-slate-800 text-right">{scheme.annualGrant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Income Limit:</span>
                    <span className="font-semibold text-slate-700">{scheme.incomeCeiling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Verification Node:</span>
                    <span className="font-mono text-slate-600">{scheme.verifierSystem}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2">
                {isCurrentActive && userRole === 'student' ? (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Track Active Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedScheme(scheme)}
                    className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-2 rounded-xl text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>{userRole !== 'student' ? 'Scheme Criteria & Norms' : 'Eligibility & Details'}</span>
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <h3 className="font-extrabold text-base text-slate-900">{t[selectedScheme.titleKey]}</h3>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed text-sm">
                {t[selectedScheme.descKey]}
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Originating Portal:</span>
                  <span className="font-bold text-slate-800">{selectedScheme.legacyPortal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Beneficiaries:</span>
                  <span className="font-semibold text-slate-700">{selectedScheme.targetGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Financial Coverage:</span>
                  <span className="font-bold text-emerald-700">{selectedScheme.annualGrant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Income Eligibility:</span>
                  <span className="font-semibold text-slate-700">{selectedScheme.incomeCeiling}</span>
                </div>
              </div>

              {/* Status for current user */}
              <div className="p-3.5 rounded-xl border bg-amber-50 border-amber-200">
                <p className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Rule Check For Your Profile</span>
                </p>
                <p className="text-amber-800 leading-relaxed">
                  {selectedScheme.ineligibilityReason}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>DigiLocker Reusability:</strong> If you transition to this scheme in the future, your existing Caste, Income, and Academic records in your MoTA-SETU wallet will be re-used with 0 new paperwork.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setSelectedScheme(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
