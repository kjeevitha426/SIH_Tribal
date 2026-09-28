import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import SchemeCards from './components/SchemeCards';
import DocumentWallet from './components/DocumentWallet';
import DbtTracker from './components/DbtTracker';
import JagoChatbot from './components/JagoChatbot';
import OutreachAnalytics from './components/OutreachAnalytics';
import OfficerExceptionQueue from './components/OfficerExceptionQueue';
import VideoPresentationGuide from './components/VideoPresentationGuide';
import UserProfileModal from './components/UserProfileModal';

import { translations } from './i18n/translations';
import { currentStudent, motaSchemes } from './data/scholarshipData';
import { Bot, ExternalLink, X, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [studentData, setStudentData] = useState(currentStudent);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const t = translations[currentLang] || translations.en;

  // Handle successful login or OTP-verified registration
  const handleLogin = (user) => {
    setCurrentUser(user);
    setUserRole(user.role);

    // If student, dynamically update profile with entered education, income, and caste details
    if (user.role === 'student') {
      setStudentData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        tribe: user.tribe || prev.tribe,
        apaarId: user.apaarId || prev.apaarId,
        institute: user.institute || prev.institute,
        course: user.course || prev.course,
      }));
      setActiveTab('dashboard');
    } else if (user.role === 'officer') {
      setActiveTab('officer');
    } else if (user.role === 'admin') {
      setActiveTab('outreach');
    }
  };

  // Handle logout / role exit
  const handleLogout = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentUser(null);
    setIsFloatingChatOpen(false);
    setIsProfileOpen(false);
  };

  // Exit Chatbox handler (returns to default role dashboard and stops audio)
  const handleExitChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (userRole === 'officer') {
      setActiveTab('officer');
    } else if (userRole === 'admin') {
      setActiveTab('outreach');
    } else {
      setActiveTab('dashboard');
    }
  };

  // If not logged in, render the Login / Registration Portal with role routing
  if (!currentUser) {
    return (
      <LoginPage
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        t={t}
        onLogin={handleLogin}
      />
    );
  }

  // Strict role isolation: verify current tab is allowed for authenticated role
  const isStudent = userRole === 'student';
  const isOfficer = userRole === 'officer';
  const isAdmin = userRole === 'admin';

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-amber-200">
      {/* Universal Header with 6-language switcher, Profile Trigger & Logout */}
      <Navbar
        currentLang={currentLang}
        onLangChange={setCurrentLang}
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Student Specific Dashboard (Only accessible to Student role) */}
        {activeTab === 'dashboard' && isStudent && (
          <StudentDashboard
            student={studentData}
            schemes={motaSchemes}
            t={t}
            setActiveTab={setActiveTab}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {/* Schemes (Common to all roles) */}
        {activeTab === 'schemes' && (
          <SchemeCards
            schemes={motaSchemes}
            student={studentData}
            t={t}
            setActiveTab={setActiveTab}
            userRole={userRole}
          />
        )}

        {/* Document Wallet (Student & Officer) */}
        {activeTab === 'wallet' && (isStudent || isOfficer) && (
          <DocumentWallet
            t={t}
          />
        )}

        {/* DBT Tracker (Student only) */}
        {activeTab === 'dbt' && isStudent && (
          <DbtTracker
            t={t}
          />
        )}

        {/* JAGO Chatbot Tab (with visible Exit/Stop header) */}
        {activeTab === 'jago' && (
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={handleExitChat}
                className="text-xs font-bold text-blue-900 hover:text-blue-700 bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-300 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                title="Exit JAGO Chatbot and return to your dashboard"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit Chat & Return to Dashboard</span>
              </button>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Active Session: {currentUser?.name} ({userRole.toUpperCase()})
              </span>
            </div>
            <JagoChatbot
              currentLang={currentLang}
              t={t}
              student={studentData}
              setActiveTab={setActiveTab}
              onExit={handleExitChat}
            />
          </div>
        )}

        {/* Outreach Analytics (Admin only) */}
        {activeTab === 'outreach' && isAdmin && (
          <OutreachAnalytics
            t={t}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {/* Officer Exception Queue (Officer & Admin) */}
        {activeTab === 'officer' && (isOfficer || isAdmin) && (
          <OfficerExceptionQueue
            t={t}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {/* Video Presentation Guide (All roles) */}
        {activeTab === 'videoGuide' && (
          <VideoPresentationGuide
            t={t}
          />
        )}
      </main>

      {/* Floating JAGO AI Assistant Trigger */}
      {activeTab !== 'jago' && (
        <div className="fixed bottom-6 right-6 z-40">
          {isFloatingChatOpen ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 w-[360px] sm:w-[420px] overflow-hidden animate-in slide-in-from-bottom-5">
              <div className="flex items-center justify-between bg-blue-950 text-white px-4 py-2.5">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-xs">JAGO AI Quick Assistant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                      setIsFloatingChatOpen(false);
                    }}
                    className="text-slate-300 hover:text-white font-bold text-xs bg-white/10 hover:bg-red-600 px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1"
                    title="Exit and close floating chatbox"
                  >
                    <span>Exit</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div>
                <JagoChatbot
                  currentLang={currentLang}
                  t={t}
                  student={studentData}
                  setActiveTab={setActiveTab}
                  onExit={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setIsFloatingChatOpen(false);
                  }}
                  isFloating={true}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsFloatingChatOpen(true)}
              className="bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white p-3.5 rounded-full shadow-xl flex items-center gap-2.5 transition hover:scale-105 cursor-pointer ring-4 ring-amber-400/30"
              title="Chat with JAGO in your native language"
            >
              <div className="relative">
                <Bot className="w-6 h-6 text-amber-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
              </div>
              <span className="font-bold text-xs pr-1 hidden sm:inline">Ask JAGO AI</span>
            </button>
          )}
        </div>
      )}

      {/* Complete User Profile Modal */}
      {isProfileOpen && (
        <UserProfileModal
          user={currentUser}
          studentData={studentData}
          onClose={() => setIsProfileOpen(false)}
          t={t}
        />
      )}

      {/* Gov Portal Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="font-black text-amber-400 text-sm">{t.portalName} (PRERNA-ST)</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold">
                Smart India Hackathon 2026
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
              An AI-driven, mobile-first unified ecosystem consolidating 5 scholarship schemes of the Ministry of Tribal Affairs (Pre-Matric, Post-Matric, Top Class, NFST, and National Overseas Scholarship) under a single zero-paperwork trust layer.
            </p>
            <div className="pt-2 text-slate-500 text-[11px]">
              <span>Official Reference Portal: </span>
              <a
                href="https://tribal.nic.in/ScholarshiP.aspx"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono"
              >
                <span>tribal.nic.in/ScholarshiP.aspx</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Supported Source Systems</p>
            <p className="text-slate-400">DigiLocker & EduLocker</p>
            <p className="text-slate-400">APAAR / ABC Academic Registry</p>
            <p className="text-slate-400">UDISE+ & AISHE Database</p>
            <p className="text-slate-400">UIDAI Aadhaar Vault & FaceRD</p>
            <p className="text-slate-400">State e-District (Caste/Income)</p>
            <p className="text-slate-400">PFMS & NPCI Aadhaar Bridge</p>
          </div>

          <div className="space-y-1.5 text-xs">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Languages Implemented</p>
            <p className="text-slate-400">English (National)</p>
            <p className="text-slate-400">हिन्दी (Hindi)</p>
            <p className="text-slate-400">தமிழ் (Tamil)</p>
            <p className="text-slate-400">తెలుగు (Telugu)</p>
            <p className="text-slate-400">বাংলা (Bengali)</p>
            <p className="text-slate-400">मराठी (Marathi)</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <p>© 2026 Ministry of Tribal Affairs, Government of India. Designed for National Inclusion & Smart Automation.</p>
          <div className="flex items-center space-x-3">
            <span>NIC Certified Security</span>
            <span>•</span>
            <span>Aadhaar Act 2016 Compliant</span>
            <span>•</span>
            <span>WCAG 2.1 AA Accessible</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
