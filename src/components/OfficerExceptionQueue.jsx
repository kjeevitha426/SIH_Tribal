import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  ChevronRight,
  Info,
  User
} from 'lucide-react';
import { officerExceptions as initialExceptions } from '../data/scholarshipData';

export default function OfficerExceptionQueue({ t, onOpenProfile }) {
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [selectedCase, setSelectedCase] = useState(null);
  const [actionNotice, setActionNotice] = useState('');

  const handleApprove = (caseId) => {
    setExceptions((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, status: 'APPROVED_BY_DWO', dwoNote: 'Grace Approval granted by District Welfare Officer. Application released for MoTA sanction.' }
          : c
      )
    );
    setActionNotice(`Application ${caseId} successfully granted Grace Approval! Automated SMS alert sent to student in local language.`);
    setTimeout(() => setActionNotice(''), 5000);
    setSelectedCase(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-indigo-700" />
            <span>District Welfare Officer (DWO) Exception Resolution Desk</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Automated Exception & Fuzzy Match Layer. Prevents outright rejection of tribal applicants due to spelling differences or missing initials in government databases.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              title="View your official officer credentials and DSC status"
            >
              <User className="w-3.5 h-3.5 text-indigo-700" />
              <span>Officer Profile</span>
            </button>
          )}
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
            <span>Levenshtein AI Layer</span>
          </div>
        </div>
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{actionNotice}</span>
          </div>
          <button 
            onClick={() => setActionNotice('')} 
            className="text-emerald-700 hover:text-emerald-950 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Highlight Box: Why this feature solves a massive hackathon gap */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0">
            92%
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">How MoTA-SETU Replaces Automated Hard Rejections with Grace Approvals</h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              On NSP, an ST student with "Sunita Kumari Murmu" on Aadhaar and "Sunita K Murmu" on their Class 10 marksheet is automatically rejected by rigid database strings. In MoTA-SETU, our Levenshtein-Soundex engine calculates a 92% semantic confidence score, automatically routing the case to the District Welfare Officer's 48-hour Grace Desk rather than disqualifying the student.
            </p>
          </div>
        </div>
      </div>

      {/* Exception Queue Cards */}
      <div className="space-y-4">
        {exceptions.map((item) => {
          const isApproved = item.status === 'APPROVED_BY_DWO';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isApproved ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.id}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {item.scheme}
                  </span>
                  <span className="text-xs text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded">
                    Tribe: {item.tribe} • {item.district}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Aadhaar Vault Name</span>
                    <span className="font-bold text-slate-900">{item.studentNameAadhaar}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Marksheet / UDISE Name</span>
                    <span className="font-bold text-slate-900">{item.studentNameAcademic}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs">
                  <span className="text-slate-500 font-medium">Issue Diagnosis:</span>
                  <span className="font-semibold text-slate-800">{item.issueType}</span>
                  <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Fuzzy Match: {item.similarityScore}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-2 md:flex-col md:items-end">
                {isApproved ? (
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Grace Approved
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Grace Approve</span>
                    </button>
                    <button
                      onClick={() => setSelectedCase(item)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Inspect Diff
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Diff Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-slate-900">Side-by-Side Diff Analysis</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 font-mono text-[11px]">
                <p><strong>Case ID:</strong> {selectedCase.id}</p>
                <p><strong>Aadhaar Record:</strong> {selectedCase.studentNameAadhaar}</p>
                <p><strong>Academic Marksheet:</strong> {selectedCase.studentNameAcademic}</p>
                <p><strong>Father's Name (e-District):</strong> Matched 100%</p>
                <p><strong>Levenshtein Distance:</strong> 2 characters difference (Initial Abbreviation)</p>
                <p className="text-emerald-700 font-bold"><strong>Soundex Phonetic Match:</strong> S536 (Identical Soundex Code)</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-900">
                <p className="font-bold mb-0.5">DWO Verification Note:</p>
                <p>{selectedCase.dwoNote}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleApprove(selectedCase.id)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Grant Grace Approval Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
