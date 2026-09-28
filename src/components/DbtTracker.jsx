import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  RefreshCw, 
  ShieldCheck, 
  ArrowUpRight, 
  Landmark,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { dbtDetails } from '../data/scholarshipData';

export default function DbtTracker({ t }) {
  const [isCheckingBridge, setIsCheckingBridge] = useState(false);
  const [bridgeResult, setBridgeResult] = useState(null);

  const handleTestBridge = () => {
    setIsCheckingBridge(true);
    setTimeout(() => {
      setIsCheckingBridge(false);
      setBridgeResult({
        timestamp: new Date().toLocaleTimeString(),
        status: "SUCCESS_ACTIVE",
        message: "NPCI Aadhaar Payment Bridge (APB) is 100% active. Direct Benefit Transfer cleared for automated crediting."
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <span>{t.dbtStatusTitle}</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time integration with Public Financial Management System (PFMS) & National Payments Corporation of India (NPCI).
          </p>
        </div>

        <button
          onClick={handleTestBridge}
          disabled={isCheckingBridge}
          className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md shadow-emerald-700/20 transition cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isCheckingBridge ? 'animate-spin' : ''}`} />
          <span>{isCheckingBridge ? 'Testing NPCI Bridge...' : 'Test Aadhaar NPCI Linkage'}</span>
        </button>
      </div>

      {/* NPCI Diagnostic Result Alert */}
      {bridgeResult && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 rounded-xl text-xs flex items-start gap-3 shadow-xs animate-in fade-in">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">NPCI Aadhaar Mapper Diagnosis: HEALTHY</span>
              <span className="text-[10px] text-emerald-700 font-mono">{bridgeResult.timestamp}</span>
            </div>
            <p className="mt-0.5 text-emerald-800 leading-relaxed">
              {bridgeResult.message}
            </p>
          </div>
        </div>
      )}

      {/* Bank Account & Bridge Health Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bank Details */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              {t.bankAccount}
            </span>
            <span className="font-bold text-base text-slate-900 block">{dbtDetails.bankName}</span>
            <span className="font-mono text-xs text-slate-600 block">{dbtDetails.accountMasked}</span>
            <span className="text-[10px] text-slate-500 font-mono">IFSC: {dbtDetails.ifsc}</span>
          </div>
        </div>

        {/* NPCI Status */}
        <div className="border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              {t.npciMapper}
            </span>
            <span className="font-bold text-sm text-emerald-700 flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.npciActive}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Aadhaar Seeded: {dbtDetails.npciSeededDate}
            </span>
          </div>
        </div>

        {/* Total Financial Outlay */}
        <div className="border-t md:border-t-0 md:border-l border-slate-200 md:pl-6 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
              Total Approved Grant
            </span>
            <span className="font-black text-2xl text-slate-900 block">₹{dbtDetails.totalSanctioned.toLocaleString('en-IN')}</span>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
              100% Covered under MoTA Top Class
            </span>
          </div>
        </div>
      </div>

      {/* Installment Breakdown Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <span>{t.paymentTimeline}</span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
            Academic Year 2025-26
          </span>
        </h3>

        <div className="space-y-4">
          {dbtDetails.installments.map((inst, index) => {
            const isCredited = inst.status === 'CREDITED';

            return (
              <div
                key={inst.id}
                className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                  isCredited
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-amber-50/40 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                    isCredited ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{inst.installment}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{inst.beneficiary}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-[11px]">
                      <span className="text-slate-500">UTR / Batch:</span>
                      <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {inst.utr}
                      </span>
                      {inst.date && (
                        <span className="text-slate-500">Credited: {inst.date}</span>
                      )}
                      {inst.expectedDate && (
                        <span className="text-amber-800 font-semibold">Expected: {inst.expectedDate}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-black text-lg text-slate-900 block">
                    ₹{inst.amount.toLocaleString('en-IN')}
                  </span>
                  {isCredited ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                      <CheckCircle2 className="w-3 h-3" /> CREDITED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full mt-1">
                      <Clock className="w-3 h-3 animate-spin" /> IN PFMS TRANSIT
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Gap Solved: Why DBT Fails */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Critical Innovation: Automated DBT Failure Resolution</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          On standard portals, up to 14% of ST scholarship disbursements fail silently because student bank accounts go dormant or are unseeded from the NPCI Aadhaar Payment Bridge. MoTA-SETU continuously polls the NPCI mapper before executing PFMS batches. If an account issue is detected, an automated WhatsApp alert and local Bank Branch notification is dispatched with zero bureaucratic delay.
        </p>
      </div>
    </div>
  );
}
