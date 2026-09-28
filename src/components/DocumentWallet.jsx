import React, { useState } from 'react';
import { 
  FolderLock, 
  CheckCircle2, 
  RefreshCw, 
  Upload, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  QrCode, 
  Sparkles, 
  Info,
  Check
} from 'lucide-react';
import { documentWallet as initialDocs } from '../data/scholarshipData';

export default function DocumentWallet({ t }) {
  const [docs, setDocs] = useState(initialDocs);
  const [isFetching, setIsFetching] = useState(false);
  const [activePreviewDoc, setActivePreviewDoc] = useState(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  // Simulate fetching a new document from DigiLocker / UGC-NTA
  const handleFetchDigiLocker = () => {
    setIsFetching(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${docs.length + 1}`,
        name: "UGC-NET / JRF Fellowship Qualification",
        category: "Research Eligibility",
        issuer: "National Testing Agency (UGC-NTA)",
        docNumber: "NTA-UGC-JRF-2025-09941",
        verifiedDate: new Date().toLocaleDateString('en-GB'),
        isDigiLocker: true,
        status: "VERIFIED",
        reusableSchemes: ["NFST", "NOS"],
        previewUrl: "mock_nta_cert.pdf"
      };

      setDocs([newDoc, ...docs]);
      setIsFetching(false);
      setUploadSuccessMessage('Successfully fetched & cryptographically verified UGC-NTA JRF Certificate via DigiLocker API!');
      setTimeout(() => setUploadSuccessMessage(''), 5000);
    }, 1500);
  };

  const handleSimulatedUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: `doc-${docs.length + 1}`,
      name: file.name.replace(/\.[^/.]+$/, ""),
      category: "Supplementary Document",
      issuer: "Uploaded by Student (PWA Compressed)",
      docNumber: `UPL-${Math.floor(100000 + Math.random() * 900000)}`,
      verifiedDate: "Just Now",
      isDigiLocker: false,
      status: "VERIFIED",
      reusableSchemes: ["All 5 Schemes"],
      previewUrl: "mock_user_upload.pdf"
    };

    setDocs([newDoc, ...docs]);
    setUploadSuccessMessage(`Uploaded "${file.name}" with 65% automatic image compression for low-bandwidth tribal sync!`);
    setTimeout(() => setUploadSuccessMessage(''), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FolderLock className="w-6 h-6 text-blue-700" />
            <span>{t.walletTitle}</span>
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            {t.walletSubtitle}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <label className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs border border-slate-300 flex items-center gap-2 cursor-pointer transition shadow-xs">
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Upload Offline Doc</span>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleSimulatedUpload}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>

          <button
            onClick={handleFetchDigiLocker}
            disabled={isFetching}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-md shadow-blue-900/20 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isFetching ? 'animate-spin' : ''}`} />
            <span>{isFetching ? 'Syncing DigiLocker...' : t.fetchDigiLocker}</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {uploadSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{uploadSuccessMessage}</span>
          </div>
          <button 
            onClick={() => setUploadSuccessMessage('')} 
            className="text-emerald-700 hover:text-emerald-900 font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Reusability Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Single-Source Trust Layer (Zero Re-submission)</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-0.5">
              Every document fetched from DigiLocker or verified through State e-District API carries a tamper-proof SHA-256 digital certificate. When a student transitions from <strong>Post-Matric</strong> to <strong>Top Class</strong> or <strong>NFST</strong>, the system fetches from this vault automatically.
            </p>
          </div>
        </div>
        <div className="shrink-0 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Reusable Assets</span>
          <span className="text-lg font-black text-emerald-400">{docs.length} Active Docs</span>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  API Verified
                </span>
              </div>

              {/* Doc Name */}
              <h3 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                {doc.name}
              </h3>

              <p className="text-[11px] text-slate-500 mb-3">
                Issuer: <span className="font-medium text-slate-700">{doc.issuer}</span>
              </p>

              {/* Doc Details */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-[11px] font-mono text-slate-600 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Doc ID:</span>
                  <span className="font-bold text-slate-800">{doc.docNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verified On:</span>
                  <span className="text-slate-700">{doc.verifiedDate}</span>
                </div>
                {doc.validTill && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valid Till:</span>
                    <span className="font-semibold text-emerald-700">{doc.validTill}</span>
                  </div>
                )}
              </div>

              {/* Reusable Pill */}
              <div className="mb-4">
                <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 font-semibold px-2 py-0.5 rounded-md inline-block">
                  ✓ Valid for all 5 MoTA Schemes
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setActivePreviewDoc(doc)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>View Cryptographic Certificate</span>
            </button>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-slate-900">{activePreviewDoc.name}</h3>
              </div>
              <button
                onClick={() => setActivePreviewDoc(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="my-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Issuer Node</p>
                  <p className="font-bold text-slate-900">{activePreviewDoc.issuer}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-800" />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <p><strong>Document Number:</strong> {activePreviewDoc.docNumber}</p>
                <p><strong>Verification Mode:</strong> Direct API Handshake (DigiLocker / e-District)</p>
                <p><strong>Digital Signature:</strong> SHA-256 e-Sign (NIC-CERT Validated)</p>
                <p><strong>Cross-Scheme Portability:</strong> Enabled (1-Click Consent)</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => setActivePreviewDoc(null)}
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
