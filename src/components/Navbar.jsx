import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  User, 
  GraduationCap, 
  Layers, 
  FolderLock, 
  CreditCard, 
  Bot, 
  Compass, 
  FileCheck2,
  Video,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  currentLang, 
  onLangChange, 
  t, 
  activeTab, 
  setActiveTab, 
  userRole, 
  currentUser,
  onLogout,
  onOpenProfile
}) {
  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  // Strictly define navigation items accessible to each role
  // A student never sees officer or admin dashboards; an officer/admin only sees authorized modules
  const allNavItems = [
    { id: 'dashboard', label: t.dashboard, icon: GraduationCap, roles: ['student'] },
    { id: 'officer', label: t.officerQueue, icon: FileCheck2, roles: ['officer', 'admin'] },
    { id: 'outreach', label: t.outreach, icon: Compass, roles: ['admin'] },
    { id: 'schemes', label: t.allSchemes, icon: Layers, roles: ['student', 'officer', 'admin'] },
    { id: 'wallet', label: t.docWallet, icon: FolderLock, roles: ['student', 'officer'] },
    { id: 'dbt', label: t.dbtTracker, icon: CreditCard, roles: ['student'] },
    { id: 'jago', label: t.jagoBot, icon: Bot, roles: ['student', 'officer', 'admin'] },
    { id: 'videoGuide', label: t.videoGuide, icon: Video, roles: ['student', 'officer', 'admin'] },
  ];

  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Gov Branding Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-1 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-semibold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>GOVERNMENT OF INDIA</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">Ministry of Tribal Affairs (MoTA)</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="hidden md:inline text-slate-400">Smart India Hackathon 2026 Initiative</span>
        </div>

        {/* Right Portal Badge & Language Selector (No Cross-Role Switcher to enforce role isolation) */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Active Portal Role Indicator - Replaces the cross-dashboard switcher */}
          {userRole === 'student' && (
            <div className="flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Student Beneficiary Portal</span>
            </div>
          )}

          {userRole === 'officer' && (
            <div className="flex items-center space-x-1.5 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>District Welfare Officer Portal</span>
            </div>
          )}

          {userRole === 'admin' && (
            <div className="flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-md text-[11px] font-bold">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>MoTA Central HQ Admin Portal</span>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currentLang}
              onChange={(e) => onLangChange(e.target.value)}
              className="bg-transparent text-white text-xs font-medium focus:outline-hidden cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.native} ({l.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          {/* Indian Emblem & Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-500/20 font-black text-xl tracking-tighter">
              <span>मो</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">{t.portalName}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  PRERNA-ST
                </span>
                <span className="hidden lg:inline text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  5 Schemes Unified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{t.portalTagline}</p>
            </div>
          </div>
        </div>

        {/* User Profile Trigger & Logout */}
        <div className="flex items-center space-x-3">
          {/* Interactive User Profile Card Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-left transition-all cursor-pointer group shadow-2xs hover:shadow-xs"
            title="Click to view complete user profile and verified credentials"
            aria-label="View complete user profile"
          >
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-end space-x-1 group-hover:text-blue-900 transition-colors">
                <span className="truncate max-w-[130px]">{currentUser?.name || 'Ramesh Birhor'}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </div>
              <div className="text-[10px] text-amber-800 font-semibold bg-amber-50 group-hover:bg-amber-100 px-1.5 py-0.2 rounded border border-amber-200 inline-flex items-center gap-1 transition-colors">
                <span className="truncate max-w-[140px]">
                  {currentUser?.role === 'officer' 
                    ? 'DWO Verifier • Dumka' 
                    : currentUser?.role === 'admin' 
                    ? 'MoTA HQ • Joint Secy' 
                    : (currentUser?.tribe ? currentUser.tribe.split(' ')[0] : 'PVTG Birhor')}
                </span>
                <span className="text-[9px] text-blue-700 underline font-bold ml-0.5">Profile</span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-900 border border-white/40 flex items-center justify-center text-amber-300 font-black text-sm shadow-xs group-hover:scale-105 group-hover:ring-2 group-hover:ring-amber-400/50 transition-all shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0) : <User className="w-4 h-4 text-white" />}
            </div>
          </button>

          {/* Logout / Switch Role Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-300 hover:border-red-300 px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Sign Out to switch role or exit portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.logout}</span>
            </button>
          )}
        </div>
      </div>

      {/* Role-Specific Navigation Tabs Bar */}
      <div className="border-t border-slate-200 bg-slate-50/70 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-sm shadow-blue-900/20'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.id === 'videoGuide' && (
                  <span className="ml-1 text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                    HOT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
