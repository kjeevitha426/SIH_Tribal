import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Languages, 
  Film, 
  Eye, 
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { missingGapsAnalysis, videoPresentationScript } from '../data/scholarshipData';

export default function VideoPresentationGuide({ t }) {
  const [activeScriptLang, setActiveScriptLang] = useState('English');
  const [expandedScene, setExpandedScene] = useState(1);
  const [activeSection, setActiveSection] = useState('script'); // 'script' or 'gaps'

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs animate-pulse">
                <Video className="w-3.5 h-3.5" />
                Hackathon Video Pitch Blueprint
              </span>
              <span className="bg-white/20 text-slate-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                Ideal Duration: 5 Mins 30 Secs
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Demonstration Video Script & Critical Gaps Analysis
            </h2>
            <p className="text-xs text-rose-200 max-w-2xl mt-1 leading-relaxed">
              Use this exact rehearsal blueprint to record your demonstration video. It highlights all missing requirements, demonstrates the 5 unified schemes, multi-language switching (Tamil, Hindi, English), and the JAGO chatbot.
            </p>
          </div>

          {/* Section Switcher */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl text-xs font-bold border border-white/10">
            <button
              onClick={() => setActiveSection('script')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeSection === 'script' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-200 hover:text-white'
              }`}
            >
              Scene Script
            </button>
            <button
              onClick={() => setActiveSection('gaps')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeSection === 'gaps' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-200 hover:text-white'
              }`}
            >
              What is Missing? (7 Gaps)
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: SCENE-BY-SCENE VIDEO SCRIPT */}
      {activeSection === 'script' && (
        <div className="space-y-4">
          {/* Script Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-red-600" />
              <span className="font-extrabold text-sm text-slate-900">Narration Language for Recording:</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['English', 'Hindi', 'Tamil'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveScriptLang(lang)}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    activeScriptLang === lang
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Scenes Accordion */}
          <div className="space-y-4">
            {videoPresentationScript.map((scene) => {
              const isExpanded = expandedScene === scene.scene;

              return (
                <div
                  key={scene.scene}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
                >
                  {/* Scene Header */}
                  <div
                    onClick={() => setExpandedScene(isExpanded ? null : scene.scene)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-black text-xs flex items-center justify-center shrink-0">
                        {scene.scene}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm text-slate-900">{scene.title}</h3>
                          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {scene.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Key focus: {scene.keyTakeaway}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>

                  {/* Scene Details */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs">
                      {/* Visual Cue Box */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-amber-950">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 mb-1">
                          <Eye className="w-3.5 h-3.5 text-amber-700" />
                          <span>Screen Recording Action (What to show on screen):</span>
                        </div>
                        <p className="text-amber-800 leading-relaxed font-medium">
                          {scene.visualCue}
                        </p>
                      </div>

                      {/* Narration Box */}
                      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
                          <span className="font-bold text-amber-400">Spoken Voiceover Script ({activeScriptLang}):</span>
                          <span>Read clearly into the microphone</span>
                        </div>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-200 italic font-serif">
                          "{activeScriptLang === 'Hindi'
                            ? scene.narrationHindi
                            : activeScriptLang === 'Tamil'
                            ? scene.narrationTamil
                            : scene.narrationEnglish}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: WHAT IS MISSING? (7 CRITICAL GAPS ANALYSIS) */}
      {activeSection === 'gaps' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>What is Missing in Existing Systems & How MoTA-SETU Solves It</span>
            </h3>
            <p className="text-xs text-slate-500 max-w-3xl">
              This comparison matrix proves to hackathon evaluators that our solution doesn't just create a skin over existing portals, but resolves foundational architectural flaws.
            </p>
          </div>

          <div className="space-y-4">
            {missingGapsAnalysis.map((gap) => (
              <div
                key={gap.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-900 text-white text-[11px] flex items-center justify-center font-bold">
                      {gap.id}
                    </span>
                    {gap.dimension}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                    {gap.impact}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-950">
                    <span className="text-[10px] uppercase font-bold text-red-700 block mb-0.5">
                      ❌ Existing System Gap / Flaw
                    </span>
                    <p className="text-red-900 leading-relaxed font-medium">
                      {gap.existingProblem}
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-950">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-0.5">
                      ✓ MoTA-SETU Built Solution
                    </span>
                    <p className="text-emerald-900 leading-relaxed font-medium">
                      {gap.motaSetuInnovation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
