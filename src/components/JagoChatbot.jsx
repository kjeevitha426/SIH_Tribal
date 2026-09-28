import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  HelpCircle,
  FolderLock,
  ArrowRight,
  Square,
  X,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';

export default function JagoChatbot({ 
  currentLang, 
  t, 
  student, 
  setActiveTab,
  onExit,
  isFloating = false 
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChatStopped, setIsChatStopped] = useState(false);
  const messagesEndRef = useRef(null);

  // Clean up any ongoing speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Multilingual Quick Prompts
  const quickQuestionsByLang = {
    en: [
      "Track my scholarship & DBT payment",
      "When will Installment 2 be credited?",
      "Can I switch to National Overseas Scholarship (NOS)?",
      "Why is my caste certificate marked reusable?"
    ],
    hi: [
      "मेरी छात्रवृत्ति और डीबीटी भुगतान ट्रैक करें",
      "दूसरी किस्त बैंक में कब आएगी?",
      "क्या मैं नेशनल ओवरसीज स्कॉलरशिप (NOS) ले सकता हूँ?",
      "मेरा जाति प्रमाण पत्र पुनः प्रयोज्य क्यों है?"
    ],
    ta: [
      "எனது உதவித்தொகை மற்றும் DBT நிலையை காண்க",
      "இரண்டாவது தவணை வங்கிக்கு எப்போது வரும்?",
      "நான் தேசிய வெளிநாட்டு உதவித்தொகை (NOS) பெற முடியுமா?",
      "எனது சாதிச் சான்றிதழ் ஏன் மீண்டும் பயன்படுத்தக்கூடியது?"
    ],
    te: [
      "నా స్కాలర్‌షిప్ & డీబీటీ స్థితిని ట్రాక్ చేయండి",
      "2వ విడత నిధులు ఎప్పుడు జమ అవుతాయి?",
      "నేను నేషనల్ ఓవర్సీస్ స్కాలర్‌షిప్ (NOS) పొందవచ్చా?",
      "నా కుల ధ్రువీకరణ పత్రం ఎందుకు పునర్వినియోగించదగినది?"
    ],
    bn: [
      "আমার বৃত্তি এবং ডিবিটি পেমেন্ট ট্র্যাক করুন",
      "দ্বিতীয় কিস্তি কবে অ্যাকাউন্টে ঢুকবে?",
      "আমি কি ন্যাশনাল ওভারসিজ স্কলারশিপ (NOS) পেতে পারি?",
      "আমার জাতিগত শংসাপত্র কেন পুনরায় ব্যবহারযোগ্য?"
    ],
    mr: [
      "माझी शिष्यवृत्ती आणि डीबीटी स्थिती तपासा",
      "दुसरा हप्ता कधी खात्यात जमा होईल?",
      "मी राष्ट्रीय परदेशी शिष्यवृत्ती (NOS) घेऊ शकतो का?",
      "माझे जात प्रमाणपत्र पुनर्वापरयोग्य का आहे?"
    ]
  };

  // Initialize initial greeting when language changes
  useEffect(() => {
    const greetingText = t.jagoGreeting || "Namaste! I am JAGO, your multilingual AI Assistant for Tribal Scholarships. How can I help you today?";
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: greetingText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: null
      }
    ]);
    setIsChatStopped(false);
  }, [currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice Speech Synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window && !isChatStopped) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (currentLang === 'hi') utterance.lang = 'hi-IN';
      else if (currentLang === 'ta') utterance.lang = 'ta-IN';
      else if (currentLang === 'te') utterance.lang = 'te-IN';
      else if (currentLang === 'bn') utterance.lang = 'bn-IN';
      else if (currentLang === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Immediate Stop Speech Action
  const handleStopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Stop entire chatbox session
  const handleStopChat = () => {
    handleStopSpeaking();
    setIsListening(false);
    setIsChatStopped(true);
  };

  // Restart chatbox session
  const handleRestartChat = () => {
    handleStopSpeaking();
    setIsChatStopped(false);
    const greetingText = t.jagoGreeting || "Namaste! I am JAGO, your multilingual AI Assistant for Tribal Scholarships. How can I help you today?";
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: greetingText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: null
      }
    ]);
  };

  // Exit Chatbox action
  const handleExitChat = () => {
    handleStopSpeaking();
    setIsListening(false);
    if (onExit) {
      onExit();
    } else if (setActiveTab) {
      const defaultTab = student?.role === 'officer' ? 'officer' : student?.role === 'admin' ? 'outreach' : 'dashboard';
      setActiveTab(defaultTab);
    }
  };

  const handleSimulatedVoiceInput = () => {
    if (isChatStopped) return;
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sampleQuestion = quickQuestionsByLang[currentLang]?.[0] || "Track my scholarship & DBT payment";
      handleSend(sampleQuestion);
    }, 2000);
  };

  const generateBotReply = (query) => {
    const q = query.toLowerCase();

    // Multilingual Status query
    if (q.includes('status') || q.includes('track') || q.includes('स्थिति') || q.includes('நிலை') || q.includes('స్థితి') || q.includes('ট্র্যাক') || q.includes('हप्ता')) {
      if (currentLang === 'hi') {
        return {
          text: `नमस्ते रमेश! आपका आवेदन (आईडी: ${student?.activeApplicationId || 'MOTA-2025-TC-991204'}) 'टॉप क्लास उच्च शिक्षा योजना' के तहत स्वीकृत हो चुका है। ₹1,85,000 की कुल राशि में से ₹92,500 (ट्यूशन फीस) आईआईटी खड़गपुर को सीधे हस्तांतरित कर दी गई है। दूसरी किस्त (₹92,500) पीएफएमएस बैच 44 के तहत 02 अक्टूबर 2025 तक आपके आधार से जुड़े एसबीआई खाते (अंतिम 8812) में भेज दी जाएगी।`,
          actionType: 'dbt'
        };
      }
      if (currentLang === 'ta') {
        return {
          text: `வணக்கம் ரமேஷ்! உங்கள் விண்ணப்பம் (எண்: ${student?.activeApplicationId || 'MOTA-2025-TC-991204'}) 'டாப் கிளாஸ் உயர் கல்வித் திட்டத்தின்' கீழ் அங்கீகரிக்கப்பட்டுள்ளது. அனுமதிக்கப்பட்ட ₹1,85,000 தொகையில், முதல் தவணையான ₹92,500 நேரடியாக ஐஐடி காரக்பூருக்கு செலுத்தப்பட்டுவிட்டது. இரண்டாவது தவணை (₹92,500) அக்டோபர் 02, 2025க்குள் உங்கள் ஆதார் இணைக்கப்பட்ட எஸ்பிஐ வங்கி கணக்கில் (முடிவு 8812) வரவு வைக்கப்படும்.`,
          actionType: 'dbt'
        };
      }
      return {
        text: `Hello Ramesh! Your application (${student?.activeApplicationId || 'MOTA-2025-TC-991204'}) under the Top Class Higher Education Scheme is SANCTIONED. Out of ₹1,85,000 approved, Installment 1 (₹92,500 tuition) has been credited directly to IIT Kharagpur (UTR: SBIN882194819012). Installment 2 (₹92,500 living allowance) is in PFMS Batch 44 and expected in your Aadhaar-seeded SBI account (*8812) by 02 Oct 2025.`,
        actionType: 'dbt'
      };
    }

    // Switch or Overseas Scholarship query
    if (q.includes('overseas') || q.includes('nos') || q.includes('विदेश') || q.includes('வெளிநாடு') || q.includes('విదేశ') || q.includes('পরদেশ') || q.includes('परदेशी')) {
      if (currentLang === 'hi') {
        return {
          text: `हां रमेश! आप भविष्य में राष्ट्रीय विदेशी छात्रवृत्ति (NOS) के लिए पात्र हैं। चूंकि आप वर्तमान में भारत में टॉप क्लास योजना का लाभ ले रहे हैं, 'एक समय में एक ही योजना' के नियम के तहत आप विदेश में मास्टर्स या पीएचडी हेतु प्रवेश मिलने पर आसानी से एनओएस में अपग्रेड कर सकते हैं। आपके सभी दस्तावेज़ डिजिलॉकर में पहले से ही सत्यापित हैं।`,
          actionType: 'schemes'
        };
      }
      if (currentLang === 'ta') {
        return {
          text: `ஆம் ரமேஷ்! நீங்கள் எதிர்காலத்தில் தேசிய வெளிநாட்டு உதவித்தொகைக்கு (NOS) தகுதியுடையவர். பழங்குடியினர் நல விதிகளின்படி ஒரே நேரத்தில் இரண்டு உதவித்தொகைகளை பெற முடியாது என்பதால், வெளிநாட்டு பல்கலைக்கழகத்தில் சேர்க்கை கிடைத்தவுடன் உங்களது தற்போதைய திட்டத்தில் இருந்து சுலபமாக NOS திட்டத்திற்கு மாறிக்கொள்ளலாம். உங்கள் டிஜிலாக்கர் ஆவணங்கள் மீண்டும் பயன்படுத்தப்படும்.`,
          actionType: 'schemes'
        };
      }
      return {
        text: `Yes Ramesh! You are fully eligible for the National Overseas Scholarship (NOS) once you secure admission into a QS Top 500 world university for Masters/Ph.D. Under MoTA's statutory One-Scheme-Only rule, your Top Class grant will seamlessly graduate to NOS. Best of all, your Caste, Income, and Academic credentials in your MoTA-SETU wallet will be auto-migrated with 0 paperwork!`,
        actionType: 'schemes'
      };
    }

    // Documents / Reusable query
    if (q.includes('caste') || q.includes('document') || q.includes('reusable') || q.includes('दस्तावेज़') || q.includes('சான்றிதழ்') || q.includes('పత్రం') || q.includes('कागदपत्र')) {
      return {
        text: `Your ST/PVTG certificate (JH-ST-PVTG-2023-99410) was digitally authenticated via Jharkhand State e-District API. It is cryptographically signed and stored in your MoTA Digital Document Locker. This means you NEVER have to re-upload it for any of the 5 MoTA schemes!`,
        actionType: 'wallet'
      };
    }

    // Default Fallback
    return {
      text: `Thank you for asking! MoTA-SETU ensures real-time tracking for all 5 tribal scholarship schemes (Pre-Matric, Post-Matric, Top Class, NFST, and NOS). All your records are securely verified via DigiLocker, APAAR, and AISHE. You can track your DBT payment status or explore scheme details directly.`,
      actionType: 'dashboard'
    };
  };

  const handleSend = (textToSend = input) => {
    if (isChatStopped) return;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Bot Typing Delay
    setTimeout(() => {
      const reply = generateBotReply(textToSend);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: reply.actionType
      };

      setMessages((prev) => [...prev, botMessage]);
      speakText(reply.text);
    }, 600);
  };

  const currentQuickQuestions = quickQuestionsByLang[currentLang] || quickQuestionsByLang['en'];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-lg flex flex-col overflow-hidden ${isFloating ? 'h-[440px]' : 'h-[640px]'}`}>
      {/* Bot Header with Exit & Stop Controls */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-3 sm:p-4 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-blue-900 animate-pulse"></span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-xs sm:text-sm text-white truncate">
                {isFloating ? 'JAGO AI Assistant' : 'JAGO Multilingual AI Assistant'}
              </h3>
              <span className="hidden sm:inline text-[9px] bg-white/20 text-amber-300 font-bold px-1.5 py-0.2 rounded border border-white/10 uppercase">
                6+ Languages
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">
              DigiLocker, PFMS & MoTA Central Mesh
            </p>
          </div>
        </div>

        {/* Action Controls: Stop Audio, Stop Chat, Exit Chat */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Stop Voice Audio (visible when bot is speaking) */}
          {isSpeaking && (
            <button
              onClick={handleStopSpeaking}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition animate-pulse cursor-pointer shadow-xs"
              title="Stop current voice speech"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Stop Audio</span>
            </button>
          )}

          {/* Voice indicator (when not speaking) */}
          {!isSpeaking && !isChatStopped && (
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-300 bg-white/10 px-2 py-1 rounded-lg border border-white/10">
              <Volume2 className="w-3 h-3 text-amber-400" />
              <span>Voice Ready</span>
            </div>
          )}

          {/* Stop / Pause Chat Session Button */}
          {!isChatStopped ? (
            <button
              onClick={handleStopChat}
              className="bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-white/15"
              title="Stop and pause the chatbox session"
            >
              <Square className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Stop Chat</span>
            </button>
          ) : (
            <button
              onClick={handleRestartChat}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
              title="Resume / restart chat session"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Resume</span>
            </button>
          )}

          {/* Exit Chatbox Button */}
          <button
            onClick={handleExitChat}
            className="bg-red-500/20 hover:bg-red-600 text-white border border-red-400/40 hover:border-transparent px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            title="Exit and close chatbox"
          >
            {isFloating ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <>
                <ArrowLeft className="w-3 h-3" />
                <span>Exit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[85%]">
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-amber-400 font-black text-xs flex items-center justify-center shrink-0 mb-1">
                    JA
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-blue-900 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Button if recommended by Bot */}
                  {!isUser && msg.actionType && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                      {msg.actionType === 'dbt' && (
                        <button
                          onClick={() => setActiveTab && setActiveTab('dbt')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>Open DBT / PFMS Tracker</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.actionType === 'schemes' && (
                        <button
                          onClick={() => setActiveTab && setActiveTab('schemes')}
                          className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <span>Explore All 5 Schemes</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {msg.actionType === 'wallet' && (
                        <button
                          onClick={() => setActiveTab && setActiveTab('wallet')}
                          className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <FolderLock className="w-3.5 h-3.5" />
                          <span>View DigiLocker Wallet</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          );
        })}

        {/* Banner displayed when chat is stopped */}
        {isChatStopped && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs text-amber-950 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Square className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>Chatbox Session Stopped & Paused</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Automated queries and voice synthesis have been stopped. You can resume the conversation anytime or exit back to your dashboard.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleRestartChat}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resume / Restart Chat</span>
              </button>
              <button
                onClick={handleExitChat}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit to Dashboard</span>
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions (disabled when chat is stopped) */}
      {!isChatStopped && (
        <div className="p-2.5 bg-slate-100/90 border-t border-slate-200 overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center space-x-2 min-w-max">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 pl-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {t.quickQuestions}:
            </span>
            {currentQuickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-300 hover:border-blue-300 font-medium px-3 py-1 rounded-full transition shadow-2xs cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box & Voice Controller */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        {isChatStopped ? (
          <div className="flex items-center justify-between p-2 bg-slate-100 rounded-xl text-xs text-slate-600">
            <span>Chat is stopped. Click resume to ask more questions.</span>
            <button
              onClick={handleRestartChat}
              className="text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer ml-2"
            >
              Resume Chat
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Simulated Mic Button */}
            <button
              type="button"
              onClick={handleSimulatedVoiceInput}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isListening
                  ? 'bg-red-500 border-red-600 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
              }`}
              title="Speak your question in your native language"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-blue-800" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? t.micListening : t.jagoPlaceholder}
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden transition"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-blue-900 hover:bg-blue-800 text-white p-2.5 rounded-xl transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              <Send className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
