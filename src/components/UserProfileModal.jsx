import React, { useEffect } from 'react';
import { 
  User, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  BadgeCheck, 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  Download,
  X,
  Sparkles,
  Printer,
  QrCode,
  Landmark,
  FileCheck2,
  Clock,
  Layers
} from 'lucide-react';

export default function UserProfileModal({ user, studentData, onClose, t }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const isStudent = user.role === 'student';
  const isOfficer = user.role === 'officer';
  const isAdmin = user.role === 'admin';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-6 relative flex flex-col max-h-[90vh]">
        {/* Header with National/Gov Identity Accent */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-5 sm:p-6 text-white relative shrink-0">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              title="Print Profile / Official Record"
            >
              <Printer className="w-4 h-4 text-slate-200" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              title="Close Profile (Esc)"
            >
              <X className="w-4 h-4 text-slate-200" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl border-2 border-white/30 shrink-0">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="flex-1 min-w-0 pr-12 sm:pr-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white truncate">{user.name}</h2>
                <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UIDAI Aadhaar Verified</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
                {isStudent 
                  ? (studentData?.tribe || user.tribe || 'Birhor (Particularly Vulnerable Tribal Group - PVTG)') 
                  : isOfficer 
                  ? (user.designation || 'District Welfare Officer (DWO) • Dumka') 
                  : (user.designation || 'Joint Secretary, Ministry of Tribal Affairs (MoTA HQ)')}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="text-[11px] font-mono bg-white/15 text-slate-100 px-2.5 py-0.5 rounded-md border border-white/10">
                  {isStudent 
                    ? `APAAR ID: ${studentData?.apaarId || user.apaarId || '9021-4412-8874-1299'}` 
                    : `Employee ID: ${user.empId || 'NIC-DWO-JH-8812'}`}
                </span>
                <span className="text-[11px] font-medium bg-amber-400/20 text-amber-200 px-2.5 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {isStudent ? 'MoTA-SETU Zero-Paperwork Beneficiary' : isOfficer ? 'Level-2 Grace Approver' : 'Central Admin Authority'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* 1. STUDENT COMPLETE PROFILE DETAILS */}
          {isStudent && (
            <>
              {/* Personal & Domicile Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-blue-700" />
                    <span>Personal & Domicile Identity</span>
                  </h3>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                    Aadhaar Vault Seeded
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Full Legal Name:</span>
                    <span className="font-bold text-slate-800">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Aadhaar Masked Number:</span>
                    <span className="font-mono font-bold text-slate-800">{studentData?.aadhaarMasked || 'XXXX-XXXX-4921'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">UIDAI Vault Token:</span>
                    <span className="font-mono text-slate-700">JH-UID-8812</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Domicile State & District:</span>
                    <span className="font-bold text-slate-800">{studentData?.state || 'Jharkhand (Hazaribagh District)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Sub-Tribe Community:</span>
                    <span className="font-semibold text-slate-800">{studentData?.tribe || user.tribe || 'Birhor (PVTG)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">FaceRD / Biometric Auth:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified via UIDAI RD
                    </span>
                  </div>
                </div>
              </div>

              {/* Educational Qualifications & Enrolment */}
              <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-blue-200/60 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Academic Enrolment & Institution Records</span>
                  </h3>
                  <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                    AISHE & APAAR Linked
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Current Degree / Course:</span>
                    <span className="font-bold text-slate-900">{studentData?.course || user.course || 'B.Tech Computer Science & Engineering (Year 2)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Academic Institution:</span>
                    <span className="font-bold text-slate-900">{studentData?.institute || user.institute || 'Indian Institute of Technology, Kharagpur'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Institution AISHE Code:</span>
                    <span className="font-mono font-bold text-slate-800">U-0120 (Centrally Funded Institute)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Academic Registry (APAAR ID):</span>
                    <span className="font-mono font-bold text-indigo-900">{studentData?.apaarId || user.apaarId || '9021-4412-8874-1299'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Qualifying Academic Score:</span>
                    <span className="font-semibold text-emerald-700">{user.percentage || '92.4% (First Class with Distinction)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Institute Nodal Verification:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cleared by IIT Kharagpur Nodal Office
                    </span>
                  </div>
                </div>
              </div>

              {/* Caste & Tribal Identity Verification Section */}
              <div className="bg-amber-50/70 border border-amber-300/80 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-amber-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-amber-700" />
                    <span>Tribal Identity & Caste Certificate Verification</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Digitally Sealed via e-District
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Tribal Community / Category:</span>
                    <span className="font-bold text-slate-900">{studentData?.tribe || user.tribe || 'Birhor (Particularly Vulnerable Tribal Group - PVTG)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Caste Certificate Number:</span>
                    <span className="font-mono font-bold text-slate-800">{user.casteCertNumber || user.casteCert || 'JH-ST-PVTG-2023-99410'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Issuing Revenue Authority & State:</span>
                    <span className="font-semibold text-slate-800">{user.casteState || 'State e-District Portal (Govt. of Jharkhand)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Stored Document Asset:</span>
                    <span className="font-mono text-blue-700 font-semibold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      {user.uploadedCasteCert || 'caste_certificate_birhor.pdf'}
                    </span>
                  </div>
                  <div className="sm:col-span-2 bg-white/80 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>100% Reusable Across All 5 MoTA Schemes:</strong> Validated once via Jharkhand State e-District API. You will NEVER be asked to submit paper proof again.
                    </span>
                  </div>
                </div>
              </div>

              {/* Economic & Income Details */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-emerald-200/60 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-emerald-700" />
                    <span>Family Income & Scholarship Entitlement</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                    Income Below Ceiling
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Annual Family Income:</span>
                    <span className="font-black text-emerald-800 text-sm">{user.annualIncome || user.income || '₹1,80,000 / year'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Income Certificate Number:</span>
                    <span className="font-mono text-slate-800">{user.incomeCertNumber || 'JH-INC-2025-41092'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Issuing Revenue Officer:</span>
                    <span className="text-slate-700">{user.incomeAuthority || 'Sub-Divisional Officer / Tehsildar, Hazaribagh'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">MoTA Scheme Entitlement:</span>
                    <span className="font-bold text-emerald-700">100% Full Grant (Tuition + Maintenance + IT Laptop Allowance)</span>
                  </div>
                </div>
              </div>

              {/* Direct Benefit Transfer (DBT) & Bank Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                    <span>Aadhaar-Seeded DBT Bank Account (PFMS Bridge)</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    NPCI Bridge Active
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bank Name:</span>
                    <span className="font-bold text-slate-800">State Bank of India (SBI)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Account Number:</span>
                    <span className="font-mono text-slate-800">XXXXXXXX8812</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">IFSC Code:</span>
                    <span className="font-mono text-slate-800">SBIN0000202</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Branch:</span>
                    <span className="text-slate-700">IIT Kharagpur Campus</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Active Scheme Sanction:</span>
                    <span className="font-bold text-blue-900">Top Class Higher Education for ST Students</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Sanction Order Number:</span>
                    <span className="font-mono font-bold text-emerald-800">{studentData?.sanctionOrderNumber || 'MoTA/2025/TC-ST/ORD-8821'}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 2. OFFICER / VERIFIER PROFILE DETAILS */}
          {isOfficer && (
            <div className="space-y-4">
              <div className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-indigo-200/60 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-indigo-700" />
                    <span>District Verification Officer Credentials</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    NIC Certified Official
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Official Designation:</span>
                    <span className="font-bold text-slate-900">{user.designation || 'District Welfare Officer (DWO)'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Jurisdiction & District:</span>
                    <span className="font-bold text-slate-900">{user.district || 'Dumka District, Jharkhand'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">NIC Employee Code:</span>
                    <span className="font-mono font-bold text-indigo-900">{user.empId || 'NIC-DWO-JH-8812'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Department:</span>
                    <span className="font-semibold text-slate-800">Tribal Welfare Department, Govt. of Jharkhand</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">MoTA Approval Level:</span>
                    <span className="font-semibold text-emerald-700">Level-2 Verification & Grace Approval Authority</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Digital Signature Certificate:</span>
                    <span className="font-mono text-indigo-700 font-bold">DSC-SHA256-VALID (e-Sign Active)</span>
                  </div>
                </div>
              </div>

              {/* Exception Desk Queue Stats */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span>Assigned District Queue Metrics</span>
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] text-slate-500 block">Total In Queue</span>
                    <span className="text-lg font-black text-slate-900">24</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 shadow-2xs">
                    <span className="text-[11px] text-emerald-700 block">Auto-Cleared</span>
                    <span className="text-lg font-black text-emerald-800">18</span>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 shadow-2xs">
                    <span className="text-[11px] text-amber-700 block">Fuzzy Exceptions</span>
                    <span className="text-lg font-black text-amber-800">6</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MINISTRY ADMIN PROFILE DETAILS */}
          {isAdmin && (
            <div className="space-y-4">
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-amber-200/60 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-700" />
                    <span>Ministry of Tribal Affairs Leadership Credentials</span>
                  </h3>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    SuperAdmin Scope
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Officer Designation:</span>
                    <span className="font-bold text-slate-900">{user.designation || 'Joint Secretary, Ministry of Tribal Affairs'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Central Division:</span>
                    <span className="font-bold text-slate-900">{user.department || 'Central Scholarship & Fellowship Division, MoTA HQ'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Official ID:</span>
                    <span className="font-mono font-bold text-slate-800">{user.empId || 'MOTA-JS-HQ-019'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Ministry Headquarters:</span>
                    <span className="text-slate-800">Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Administrative Governance Scope:</span>
                    <span className="font-semibold text-emerald-800">
                      National 5-Scheme Unified Oversight, UDISE+ Drop-Out Discovery Engine, PFMS DBT Central Sanctions & Inter-State Saturation Monitoring
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-600" />
                  <span>Governed Schemes & Sub-systems</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">1. Pre-Matric ST</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">2. Post-Matric ST</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">3. Top Class Education</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">4. National Fellowship (NFST)</span>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium">5. National Overseas (NOS)</span>
                </div>
              </div>
            </div>
          )}

          {/* Registered Contact Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-slate-600" />
              <span>Registered Communication Channels (OTP Verified)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-slate-200">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <div className="min-w-0">
                  <span className="text-slate-400 block text-[10px]">Verified Email Address</span>
                  <span className="font-mono text-slate-800 font-medium truncate block">{user.email || 'ramesh.birhor@iitkgp.ac.in'}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-slate-200">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Verified Mobile Number</span>
                  <span className="font-mono text-slate-800 font-medium">{user.phone || '+91 98765-43210'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Protected under Aadhaar Act 2016 & DigiLocker National Encrypted Vault</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial bg-white hover:bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer shadow-xs"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
