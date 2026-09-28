import React, { useState } from 'react';
import { 
  Compass, 
  Users, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Radio, 
  Sparkles, 
  School, 
  Database,
  Volume2,
  User
} from 'lucide-react';
import { unreachedOutreachData } from '../data/scholarshipData';

export default function OutreachAnalytics({ t, onOpenProfile }) {
  const [districts, setDistricts] = useState(unreachedOutreachData);
  const [dispatchingId, setDispatchingId] = useState(null);
  const [lastDispatchedMessage, setLastDispatchedMessage] = useState('');

  const totalEnrolled = districts.reduce((acc, d) => acc + d.enrolledUdise, 0);
  const totalRecipients = districts.reduce((acc, d) => acc + d.scholarshipRecipients, 0);
  const totalUnreached = districts.reduce((acc, d) => acc + d.unreachedEligible, 0);
  const overallCoverage = ((totalRecipients / totalEnrolled) * 100).toFixed(1);

  const handleDispatchCampaign = (districtName) => {
    setDispatchingId(districtName);
    setTimeout(() => {
      setDistricts((prev) =>
        prev.map((d) =>
          d.district === districtName ? { ...d, outreachCampaignStatus: 'DISPATCHED_NOW' } : d
        )
      );
      setDispatchingId(null);
      setLastDispatchedMessage(`Successfully initiated targeted IVRS Voice & SMS campaign in regional dialect for ${districtName}! Eligible students matched via UDISE+ and APAAR registry.`);
      setTimeout(() => setLastDispatchedMessage(''), 6000);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-600" />
            <span>Proactive Unreached ST Beneficiary Discovery Engine</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl">
            Cross-referencing UDISE+ (School Census), APAAR (Academic Registry), and One-Time Registration (OTR) to detect tribal students enrolled in schools who have never applied for scholarships.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              title="View your official Ministry Administrator credentials"
            >
              <User className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Profile</span>
            </button>
          )}
          <div className="bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-xl text-xs border border-amber-300 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-amber-700" />
            <span>Live Cross-Sync</span>
          </div>
        </div>
      </div>

      {/* Dispatched Notification Alert */}
      {lastDispatchedMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-4 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{lastDispatchedMessage}</span>
          </div>
          <button 
            onClick={() => setLastDispatchedMessage('')} 
            className="text-emerald-700 hover:text-emerald-950 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Key Aggregate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            ST Enrolled in Schools / Colleges
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {totalEnrolled.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1 mt-1">
            <School className="w-3.5 h-3.5" /> Source: UDISE+ & AISHE
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Availing MoTA Scholarship
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            {totalRecipients.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Across all 5 Schemes
          </span>
        </div>

        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-300 shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
            Unreached Eligible ST Students
          </span>
          <span className="text-2xl font-black text-amber-900 mt-1 block">
            {totalUnreached.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-amber-800 font-bold flex items-center gap-1 mt-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Dropout Risk Identified
          </span>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Overall Scholarship Saturation
          </span>
          <span className="text-2xl font-black text-amber-400 mt-1 block">
            {overallCoverage}%
          </span>
          <span className="text-[11px] text-slate-300 font-medium block mt-1">
            Target: 100% Saturation by 2027
          </span>
        </div>
      </div>

      {/* District-wise UDISE+ Matching Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              District Gap Analysis & PVTG Saturation Map
            </h3>
            <p className="text-xs text-slate-500">
              Targeted high-density tribal and Particularly Vulnerable Tribal Group (PVTG) regions.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">5 High-Priority Tribal Clusters</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
              <tr>
                <th className="px-5 py-3.5">District & State</th>
                <th className="px-4 py-3.5">Identified PVTG Groups</th>
                <th className="px-4 py-3.5">UDISE+ Enrolled</th>
                <th className="px-4 py-3.5">Scholarship Beneficiaries</th>
                <th className="px-4 py-3.5">Unreached Gap</th>
                <th className="px-4 py-3.5">Saturation %</th>
                <th className="px-5 py-3.5 text-right">Targeted Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {districts.map((d) => (
                <tr key={d.district} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{d.district}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {d.pvtgGroups.map((pvtg) => (
                        <span key={pvtg} className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {pvtg}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono">{d.enrolledUdise.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4 font-mono text-emerald-700 font-bold">
                    {d.scholarshipRecipients.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-4 font-mono text-amber-700 font-bold">
                    {d.unreachedEligible.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${d.coveragePercent}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-[11px]">{d.coveragePercent}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {d.outreachCampaignStatus === 'DISPATCHED_NOW' || d.outreachCampaignStatus === 'COMPLETED' ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDispatchCampaign(d.district)}
                        disabled={dispatchingId === d.district}
                        className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] inline-flex items-center gap-1.5 transition cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        <Radio className={`w-3.5 h-3.5 text-amber-400 ${dispatchingId === d.district ? 'animate-spin' : ''}`} />
                        <span>{dispatchingId === d.district ? 'Broadcasting...' : 'Launch Dialect IVRS'}</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
