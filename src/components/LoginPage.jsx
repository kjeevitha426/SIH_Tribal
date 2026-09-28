import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  GraduationCap, 
  FileCheck2, 
  Compass, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  ArrowRight, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Upload,
  BookOpen,
  IndianRupee,
  BadgeCheck,
  FileText,
  Building2,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoginPage({ currentLang, onLangChange, t, onLogin }) {
  // Step 1: Category selection (null initially or active category)
  const [selectedCategory, setSelectedCategory] = useState(null); // null | 'student' | 'officer' | 'admin'

  // Tab: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  // Login input method: 'email' | 'phone'
  const [loginMethod, setLoginMethod] = useState('email');

  // Login credentials state
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('Tribal@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Student Registration Form State
  const [regName, setRegName] = useState('');
  const [regTribe, setRegTribe] = useState('Birhor (PVTG)');
  const [regApaar, setRegApaar] = useState('');
  const [regEduLevel, setRegEduLevel] = useState('Undergraduate (B.Tech / MBBS / B.Sc)');
  const [regInstitute, setRegInstitute] = useState('Indian Institute of Technology, Kharagpur');
  const [regPercentage, setRegPercentage] = useState('92.4%');
  const [regIncome, setRegIncome] = useState('180000');
  const [regIncomeCert, setRegIncomeCert] = useState('JH-INC-2025-41092');
  const [regIncomeAuthority, setRegIncomeAuthority] = useState('Tehsildar / Sub-Divisional Officer, Hazaribagh');
  const [regCasteCertNum, setRegCasteCertNum] = useState('JH-ST-PVTG-2023-99410');
  const [regCasteState, setRegCasteState] = useState('Jharkhand (Hazaribagh)');
  
  // Mandatory Caste Certificate Upload State
  const [casteFile, setCasteFile] = useState(null);
  const [casteFileName, setCasteFileName] = useState('');
  const [isAutoFetchingCaste, setIsAutoFetchingCaste] = useState(false);
  const [casteVerifiedViaDigi, setCasteVerifiedViaDigi] = useState(false);

  // Officer / Admin Registration State
  const [regOfficerName, setRegOfficerName] = useState('');
  const [regEmpId, setRegEmpId] = useState('');
  const [regDepartment, setRegDepartment] = useState('District Welfare Office (DWO), Dumka');

  // Contact & Password for Registration
  const [regIdentifierType, setRegIdentifierType] = useState('phone'); // 'phone' | 'email'
  const [regIdentifierValue, setRegIdentifierValue] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '', '', '']);

  // Preset demo accounts for rapid testing and video presentation
  const demoProfiles = {
    student: {
      role: 'student',
      name: 'Ramesh Birhor',
      tribe: 'Birhor (Particularly Vulnerable Tribal Group - PVTG)',
      apaarId: '9021-4412-8874-1299',
      email: 'ramesh.birhor@iitkgp.ac.in',
      phone: '9876543210',
      badge: 'Student Beneficiary',
      institute: 'Indian Institute of Technology, Kharagpur (AISHE: U-0120)',
      course: 'B.Tech Computer Science & Engineering (Year 2)',
      income: '₹1,80,000 / year',
      casteCert: 'JH-ST-PVTG-2023-99410'
    },
    officer: {
      role: 'officer',
      name: 'Dr. Sanjay K. Marandi',
      designation: 'District Welfare Officer (DWO)',
      district: 'Dumka District, Jharkhand',
      email: 'dwo.dumka@tribal.gov.in',
      phone: '9845112233',
      badge: 'Verification Officer'
    },
    admin: {
      role: 'admin',
      name: 'Smt. R. Ananthalakshmi (IAS)',
      designation: 'Joint Secretary, Ministry of Tribal Affairs',
      department: 'Central Scholarship Division, MoTA HQ',
      email: 'admin.mota@nic.in',
      phone: '9811004455',
      badge: 'MoTA National Admin'
    }
  };

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  // Handle selecting a category
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setErrorMsg('');
    setOtpSent(false);
    // Prefill demo credentials for that category
    const profile = demoProfiles[category];
    setEmail(profile.email);
    setPhone(profile.phone);
    if (category === 'student') {
      setRegName('Ramesh Birhor');
      setRegApaar('9021-4412-8874-1299');
      setRegIdentifierValue('9876543210');
      setCasteFileName('caste_certificate_birhor.pdf');
    } else if (category === 'officer') {
      setRegOfficerName('Dr. Sanjay K. Marandi');
      setRegEmpId('NIC-DWO-JH-8812');
      setRegIdentifierValue('dwo.dumka@tribal.gov.in');
    } else {
      setRegOfficerName('Smt. R. Ananthalakshmi (IAS)');
      setRegEmpId('MOTA-JS-HQ-019');
      setRegIdentifierValue('admin.mota@nic.in');
    }
  };

  // 1-Click Auto-Fetch Caste Certificate from DigiLocker
  const handleAutoFetchCasteCert = () => {
    setIsAutoFetchingCaste(true);
    setTimeout(() => {
      setIsAutoFetchingCaste(false);
      setCasteVerifiedViaDigi(true);
      setCasteFileName('eDistrict_ST_Cert_JH99410.pdf (Verified via DigiLocker API)');
      setErrorMsg('');
    }, 1200);
  };

  // Upload local caste certificate
  const handleCasteFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCasteFile(file);
      setCasteFileName(file.name);
      setCasteVerifiedViaDigi(false);
      setErrorMsg('');
    }
  };

  // Submit Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      const user = demoProfiles[selectedCategory];
      onLogin(user);
    }, 600);
  };

  // Quick Demo Login
  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = demoProfiles[selectedCategory];
      onLogin(user);
    }, 400);
  };

  // Send OTP for Registration
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation for Student
    if (selectedCategory === 'student') {
      if (!regName.trim() || !regIdentifierValue.trim() || !regPassword.trim()) {
        setErrorMsg('Please fill in your full name, contact information, and password.');
        return;
      }
      if (!casteFileName && !casteFile && !casteVerifiedViaDigi) {
        setErrorMsg('Caste Certificate is mandatory! Please upload the certificate or auto-fetch from DigiLocker.');
        return;
      }
    } else {
      if (!regOfficerName.trim() || !regIdentifierValue.trim() || !regPassword.trim()) {
        setErrorMsg('Please fill in your name, official identifier, and password.');
        return;
      }
    }

    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
  };

  const handleOtpDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...enteredOtp];
    newOtp[index] = value.slice(-1);
    setEnteredOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`reg-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Verify OTP & complete registration
  const handleVerifyOtpAndRegister = () => {
    const fullOtp = enteredOtp.join('');
    if (fullOtp.length !== 6 && fullOtp !== generatedOtp) {
      setErrorMsg('Please enter the 6-digit OTP code shown above.');
      return;
    }

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    // Build the newly registered user object with all details
    let newUser;
    if (selectedCategory === 'student') {
      newUser = {
        role: 'student',
        name: regName,
        tribe: regTribe,
        apaarId: regApaar || 'APAAR-2026-ST',
        course: regEduLevel,
        institute: regInstitute,
        percentage: regPercentage,
        annualIncome: `₹${parseInt(regIncome || 180000).toLocaleString('en-IN')} / year`,
        incomeCertNumber: regIncomeCert,
        incomeAuthority: regIncomeAuthority,
        casteCertNumber: regCasteCertNum,
        casteState: regCasteState,
        uploadedCasteCert: casteFileName || 'Uploaded_ST_Certificate.pdf',
        email: regIdentifierType === 'email' ? regIdentifierValue : `${regName.toLowerCase().replace(/\s+/g, '')}@student.gov.in`,
        phone: regIdentifierType === 'phone' ? regIdentifierValue : '9876543210',
        badge: 'Student Beneficiary'
      };
    } else if (selectedCategory === 'officer') {
      newUser = {
        role: 'officer',
        name: regOfficerName,
        designation: 'District Welfare Officer (DWO)',
        district: regDepartment,
        empId: regEmpId,
        email: regIdentifierType === 'email' ? regIdentifierValue : 'dwo@tribal.gov.in',
        phone: regIdentifierType === 'phone' ? regIdentifierValue : '9845112233',
        badge: 'Verification Officer'
      };
    } else {
      newUser = {
        role: 'admin',
        name: regOfficerName,
        designation: 'Ministry Administrator',
        department: regDepartment,
        empId: regEmpId,
        email: regIdentifierType === 'email' ? regIdentifierValue : 'admin.mota@nic.in',
        phone: regIdentifierType === 'phone' ? regIdentifierValue : '9811004455',
        badge: 'MoTA National Admin'
      };
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(newUser);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Saffron/Emerald Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Gov Header & Language Selector */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-md font-black text-xl tracking-tighter">
            <span>मो</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black text-white tracking-tight">{t.portalName}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                PRERNA-ST
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{t.ministry}</p>
          </div>
        </div>

        {/* Language selector in header */}
        <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={currentLang}
            onChange={(e) => onLangChange(e.target.value)}
            className="bg-transparent text-white text-xs font-semibold focus:outline-hidden cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                {l.native} ({l.label})
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Authentication Body */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.loginPortalTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            {selectedCategory === null 
              ? (t.selectRoleSub || "Select your category to proceed to sign-in or registration")
              : (t.loginPortalSubtitle || "Direct role-based routing to Student, Verifier, or Ministry Dashboard")}
          </p>
        </div>

        {/* STEP 1: INITIAL PORTAL ENTRY - SHOW 3 CATEGORIES PROMINENTLY */}
        {selectedCategory === null ? (
          <div className="max-w-4xl mx-auto w-full animate-in fade-in duration-300">
            <div className="text-center mb-5">
              <span className="bg-amber-400/20 text-amber-300 text-xs uppercase font-extrabold px-3 py-1 rounded-full border border-amber-400/30">
                {t.selectRoleTitle || "Step 1: Select Your Category to Open the Portal"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Category 1: Student */}
              <div
                onClick={() => handleSelectCategory('student')}
                className="bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/30 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/40 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    {t.roleStudent || "Student / Tribal Beneficiary"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t.roleStudentDesc || "Track 5 scholarship schemes, DigiLocker wallet & DBT payments"}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Open Student Portal</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Category 2: DWO / Verifier */}
              <div
                onClick={() => handleSelectCategory('officer')}
                className="bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/30 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <FileCheck2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    {t.roleOfficer || "District Welfare Officer (DWO)"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t.roleOfficerDesc || "Handle fuzzy name match exceptions and 48-hr grace verification"}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Open Verifier Desk</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Category 3: MoTA Admin */}
              <div
                onClick={() => handleSelectCategory('admin')}
                className="bg-slate-800/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/30 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition">
                    {t.roleAdmin || "Ministry Administrator (MoTA HQ)"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {t.roleAdminDesc || "Proactive UDISE+ discovery, coverage heatmap & IVRS campaigns"}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Open Ministry HQ</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: CATEGORY SELECTED -> SHOW LOGIN / REGISTRATION ACCORDING TO USER ROLE */
          <div className="max-w-2xl w-full mx-auto animate-in fade-in duration-300">
            {/* Category Breadcrumb Bar */}
            <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Selected Category:</span>
                <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                  {selectedCategory === 'student' ? 'Student / Tribal Beneficiary' : selectedCategory === 'officer' ? 'District Welfare Officer (DWO)' : 'Ministry Administrator (MoTA HQ)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold cursor-pointer underline"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{t.changeRole || "Change Category"}</span>
              </button>
            </div>

            {/* Auth Card Container */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              {/* Tab Switcher: Login vs Register */}
              <div className="flex rounded-xl bg-slate-900 p-1 mb-6 border border-slate-700/80">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMsg(''); setOtpSent(false); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    authMode === 'login' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.loginTab}
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    authMode === 'register' ? 'bg-amber-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.registerTab} (with Education, Income & Caste)
                </button>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-4 bg-red-900/40 border border-red-500/50 text-red-200 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* TAB 1: EXISTING USER LOGIN */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-1">
                    <span className="text-slate-300 font-semibold">Choose Sign-in Identifier:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setLoginMethod('email')}
                        className={`cursor-pointer transition ${
                          loginMethod === 'email' ? 'text-amber-400 font-bold underline' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.loginWithEmail}
                      </button>
                      <span className="text-slate-600">|</span>
                      <button
                        type="button"
                        onClick={() => setLoginMethod('phone')}
                        className={`cursor-pointer transition ${
                          loginMethod === 'phone' ? 'text-amber-400 font-bold underline' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.loginWithPhone}
                      </button>
                    </div>
                  </div>

                  {loginMethod === 'email' ? (
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">{t.emailAddress}</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. user@tribal.gov.in"
                          required
                          className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">{t.phoneNumber}</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          required
                          className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-medium text-slate-300">{t.password}</label>
                      <span className="text-[10px] text-amber-400/80 hover:text-amber-400 cursor-pointer">
                        Forgot password?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-slate-900/90 border border-slate-700 text-white rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition hover:scale-101 cursor-pointer shadow-lg shadow-amber-400/20 disabled:opacity-50 mt-2"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    ) : (
                      <>
                        <span>{t.loginButton}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Quick Demo Login Helper */}
                  <div className="pt-3 border-t border-slate-700/80 text-center">
                    <button
                      type="button"
                      onClick={handleQuickDemoLogin}
                      className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-400/30 px-4 py-2 rounded-xl inline-flex items-center gap-2 transition hover:bg-amber-500/20 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.quickDemoLogin} ({demoProfiles[selectedCategory].name})</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: DETAILED REGISTRATION (EDUCATION, INCOMES, MANDATORY CASTE UPLOAD & OTP) */}
              {authMode === 'register' && (
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      {/* Form Banner */}
                      <div className="bg-amber-500/10 border border-amber-400/30 p-3 rounded-2xl text-xs text-amber-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Please provide your educational, economic, and verified tribal identity details below.</span>
                      </div>

                      {/* If Student Category is selected */}
                      {selectedCategory === 'student' ? (
                        <>
                          {/* SECTION 1: EDUCATIONAL INFORMATION */}
                          <div className="bg-slate-900/70 border border-slate-700/80 p-4 rounded-2xl space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                              <BookOpen className="w-4 h-4" />
                              <span>{t.educationSectionTitle || "1. Educational Information"}</span>
                            </h4>

                            <div>
                              <label className="block text-[11px] text-slate-300 mb-1">{t.fullName}</label>
                              <input
                                type="text"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                                placeholder="e.g. Ramesh Birhor"
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.eduLevel || "Current Level of Study"}</label>
                                <select
                                  value={regEduLevel}
                                  onChange={(e) => setRegEduLevel(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                >
                                  <option value="Secondary (Class IX & X)">Secondary (Class IX & X - Pre-Matric)</option>
                                  <option value="Higher Secondary (Class XI & XII)">Higher Secondary (Class XI & XII - Post-Matric)</option>
                                  <option value="Undergraduate (B.Tech / MBBS / B.Sc)">Undergraduate (B.Tech / MBBS / B.Sc / BA - Top Class)</option>
                                  <option value="Postgraduate (M.Tech / M.Sc / MA)">Postgraduate (M.Tech / M.Sc / MA)</option>
                                  <option value="Ph.D. / M.Phil Research (Fellowship)">Ph.D. / M.Phil Research (NFST Fellowship)</option>
                                  <option value="International Overseas Degree">International Overseas Degree (NOS Masters/Ph.D.)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.previousPercentage || "Previous Exam Score (% or CGPA)"}</label>
                                <input
                                  type="text"
                                  value={regPercentage}
                                  onChange={(e) => setRegPercentage(e.target.value)}
                                  placeholder="e.g. 92.4% or 9.1 CGPA"
                                  required
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.institutionName || "Institution / College Name"}</label>
                                <input
                                  type="text"
                                  value={regInstitute}
                                  onChange={(e) => setRegInstitute(e.target.value)}
                                  placeholder="e.g. IIT Kharagpur, EMRS Ranchi"
                                  required
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.apaarOrEmpId || "APAAR ID / UDISE Code"}</label>
                                <input
                                  type="text"
                                  value={regApaar}
                                  onChange={(e) => setRegApaar(e.target.value)}
                                  placeholder="e.g. 9021-4412-8874-1299"
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                />
                              </div>
                            </div>
                          </div>

                          {/* SECTION 2: ECONOMIC & INCOME VERIFICATION */}
                          <div className="bg-slate-900/70 border border-slate-700/80 p-4 rounded-2xl space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <IndianRupee className="w-4 h-4" />
                              <span>{t.incomeSectionTitle || "2. Economic & Income Verification"}</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.annualIncome || "Annual Family Income (in ₹)"}</label>
                                <div className="relative">
                                  <span className="absolute left-3.5 top-2 text-slate-400 text-xs">₹</span>
                                  <input
                                    type="number"
                                    value={regIncome}
                                    onChange={(e) => setRegIncome(e.target.value)}
                                    placeholder="e.g. 180000"
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl pl-8 pr-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.incomeCertNum || "Income Certificate Number"}</label>
                                <input
                                  type="text"
                                  value={regIncomeCert}
                                  onChange={(e) => setRegIncomeCert(e.target.value)}
                                  placeholder="e.g. JH-INC-2025-41092"
                                  required
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-300 mb-1">{t.incomeIssuingAuthority || "Issuing Revenue Authority / Tehsildar"}</label>
                              <input
                                type="text"
                                value={regIncomeAuthority}
                                onChange={(e) => setRegIncomeAuthority(e.target.value)}
                                placeholder="e.g. Tehsildar, Hazaribagh District"
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                              />
                            </div>
                          </div>

                          {/* SECTION 3: TRIBAL IDENTITY & MANDATORY CASTE CERTIFICATE UPLOAD */}
                          <div className="bg-slate-900/70 border border-amber-500/40 p-4 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                <BadgeCheck className="w-4 h-4 text-amber-400" />
                                <span>{t.casteSectionTitle || "3. Tribal Identity & Caste Certificate (Mandatory)"}</span>
                              </h4>
                              <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded">
                                Required
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.tribeNameLabel || "Specific Tribe / Community Name"}</label>
                                <select
                                  value={regTribe}
                                  onChange={(e) => setRegTribe(e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                >
                                  <option value="Birhor (PVTG)">Birhor (Particularly Vulnerable Tribal Group - PVTG)</option>
                                  <option value="Santhal (ST)">Santhal (Scheduled Tribe)</option>
                                  <option value="Irular (PVTG)">Irular (PVTG - Tamil Nadu)</option>
                                  <option value="Toda (PVTG)">Toda (PVTG - Nilgiris)</option>
                                  <option value="Madia Gond (PVTG)">Madia Gond (PVTG - Maharashtra)</option>
                                  <option value="Abujh Maria (PVTG)">Abujh Maria (PVTG - Chhattisgarh)</option>
                                  <option value="Munda (ST)">Munda (Scheduled Tribe)</option>
                                  <option value="Oraon (ST)">Oraon (Scheduled Tribe)</option>
                                  <option value="Bhil (ST)">Bhil (Scheduled Tribe)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] text-slate-300 mb-1">{t.casteCertNum || "Caste Certificate Number"}</label>
                                <input
                                  type="text"
                                  value={regCasteCertNum}
                                  onChange={(e) => setRegCasteCertNum(e.target.value)}
                                  placeholder="e.g. JH-ST-PVTG-2023-99410"
                                  required
                                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                                />
                              </div>
                            </div>

                            {/* MANDATORY CERTIFICATE UPLOAD SECTION */}
                            <div className="pt-2 border-t border-slate-800">
                              <label className="block text-[11px] font-bold text-amber-300 mb-1">
                                {t.casteUploadLabel || "Upload Caste Certificate Document (PDF/JPG/PNG) *"}
                              </label>
                              <p className="text-[10px] text-slate-400 mb-2">
                                {t.casteUploadHelp || "Mandatory for digital verification & anti-fraud cross-check"}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {/* Option A: Local File Upload */}
                                <label className="border-2 border-dashed border-slate-700 hover:border-amber-400/70 bg-slate-900/60 p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition text-center">
                                  <Upload className="w-4 h-4 text-amber-400 shrink-0" />
                                  <span className="text-xs text-slate-300 font-medium">
                                    Choose File from Device
                                  </span>
                                  <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleCasteFileUpload}
                                    className="hidden"
                                  />
                                </label>

                                {/* Option B: 1-Click Auto-Fetch from State e-District / DigiLocker */}
                                <button
                                  type="button"
                                  onClick={handleAutoFetchCasteCert}
                                  disabled={isAutoFetchingCaste}
                                  className="bg-blue-900/60 hover:bg-blue-800 border border-blue-500/50 text-blue-200 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
                                >
                                  <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isAutoFetchingCaste ? 'animate-spin' : ''}`} />
                                  <span>{isAutoFetchingCaste ? 'Connecting e-District...' : (t.casteAutoFetchDigi || 'Fetch from State e-District')}</span>
                                </button>
                              </div>

                              {/* Upload Confirmation Badge */}
                              {casteFileName && (
                                <div className="mt-2.5 bg-emerald-950/60 border border-emerald-500/50 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                                  <div className="flex items-center gap-2 truncate">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="truncate font-semibold">{casteFileName}</span>
                                  </div>
                                  <span className="shrink-0 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded font-bold">
                                    {casteVerifiedViaDigi ? 'DigiLocker Verified' : 'Ready for Sync'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        /* If Officer or Admin Category is selected */
                        <div className="bg-slate-900/70 border border-slate-700/80 p-4 rounded-2xl space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" />
                            <span>Official Designation & Department</span>
                          </h4>

                          <div>
                            <label className="block text-[11px] text-slate-300 mb-1">Official Full Name</label>
                            <input
                              type="text"
                              value={regOfficerName}
                              onChange={(e) => setRegOfficerName(e.target.value)}
                              placeholder="e.g. Dr. Sanjay K. Marandi"
                              required
                              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-300 mb-1">Employee / NIC Official ID</label>
                              <input
                                type="text"
                                value={regEmpId}
                                onChange={(e) => setRegEmpId(e.target.value)}
                                placeholder="e.g. NIC-DWO-JH-8812"
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-300 mb-1">Department / Jurisdiction</label>
                              <input
                                type="text"
                                value={regDepartment}
                                onChange={(e) => setRegDepartment(e.target.value)}
                                placeholder="e.g. District Welfare Office, Dumka"
                                required
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONTACT IDENTIFIER & PASSWORD */}
                      <div className="bg-slate-900/70 border border-slate-700/80 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <label className="text-slate-300 font-bold">Contact Identifier for OTP Verification:</label>
                          <div className="space-x-2">
                            <button
                              type="button"
                              onClick={() => setRegIdentifierType('phone')}
                              className={`cursor-pointer ${regIdentifierType === 'phone' ? 'text-amber-400 font-bold underline' : 'text-slate-400'}`}
                            >
                              Phone Number
                            </button>
                            <span className="text-slate-600">|</span>
                            <button
                              type="button"
                              onClick={() => setRegIdentifierType('email')}
                              className={`cursor-pointer ${regIdentifierType === 'email' ? 'text-amber-400 font-bold underline' : 'text-slate-400'}`}
                            >
                              Email ID
                            </button>
                          </div>
                        </div>

                        <input
                          type={regIdentifierType === 'phone' ? 'tel' : 'email'}
                          value={regIdentifierValue}
                          onChange={(e) => setRegIdentifierValue(e.target.value)}
                          placeholder={regIdentifierType === 'phone' ? 'Enter 10-digit mobile number' : 'Enter email address'}
                          required
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                        />

                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1">{t.password}</label>
                          <input
                            type="password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Create password"
                            required
                            className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-amber-400"
                          />
                        </div>
                      </div>

                      {/* Submit & Generate OTP Button */}
                      <button
                        type="submit"
                        className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition hover:scale-101 cursor-pointer shadow-lg shadow-amber-400/20"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>{t.sendOtp}</span>
                      </button>
                    </form>
                  ) : (
                    /* OTP VERIFICATION VIEW */
                    <div className="space-y-4 text-center animate-in fade-in py-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 mx-auto flex items-center justify-center">
                        <KeyRound className="w-7 h-7" />
                      </div>

                      <div>
                        <h3 className="font-extrabold text-white text-base">{t.enterOtp}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {t.otpSentTo} <strong className="text-white">{regIdentifierValue}</strong>
                        </p>
                      </div>

                      {/* Demo OTP Box */}
                      <div className="bg-amber-500/10 border border-amber-400/40 text-amber-300 rounded-xl p-3 text-xs max-w-sm mx-auto">
                        <span>Generated Verification OTP: </span>
                        <strong className="font-mono text-base tracking-widest text-amber-400 bg-slate-900 px-2.5 py-0.5 rounded border border-amber-400/30">
                          {generatedOtp}
                        </strong>
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(generatedOtp.split(''))}
                          className="ml-2 underline text-[11px] text-amber-200 hover:text-white cursor-pointer font-bold block sm:inline mt-1 sm:mt-0"
                        >
                          (Auto-fill OTP)
                        </button>
                      </div>

                      {/* 6 Digit Input Boxes */}
                      <div className="flex justify-center gap-2 sm:gap-2.5 my-3">
                        {enteredOtp.map((digit, index) => (
                          <input
                            key={index}
                            id={`reg-otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                            className="w-10 h-12 text-center text-lg font-black text-white bg-slate-900 border-2 border-slate-700 focus:border-amber-400 rounded-xl focus:outline-hidden"
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyOtpAndRegister}
                        disabled={isLoading}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition hover:scale-101 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>{t.verifyOtp}</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-1">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="hover:text-slate-200 cursor-pointer"
                        >
                          Edit Registration Details
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newMock = Math.floor(100000 + Math.random() * 900000).toString();
                            setGeneratedOtp(newMock);
                          }}
                          className="text-amber-400 hover:underline cursor-pointer font-semibold"
                        >
                          {t.resendOtp}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Gov Footer */}
      <footer className="relative z-10 py-4 text-center text-slate-500 text-[11px] border-t border-slate-800">
        <p>© 2026 Ministry of Tribal Affairs (MoTA) • Government of India • National Scholarship Single Sign-On</p>
      </footer>
    </div>
  );
}
