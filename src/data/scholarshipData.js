// Comprehensive Data Store for MoTA-SETU Unified Platform

export const motaSchemes = [
  {
    id: "pre-matric",
    titleKey: "scheme1",
    descKey: "scheme1Desc",
    legacyPortal: "National Scholarship Portal (NSP)",
    coverage: "Classes IX & X",
    targetGroup: "ST Students in secondary school",
    annualGrant: "₹3,500 - ₹7,000 / year",
    incomeCeiling: "₹2.50 Lakh / annum",
    verifierSystem: "UDISE+ & State e-District",
    color: "from-blue-500 to-indigo-600",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    isActiveForUser: false,
    eligible: false,
    ineligibilityReason: "Student has already graduated beyond Secondary School (Currently enrolled in B.Tech at IIT Kharagpur)."
  },
  {
    id: "post-matric",
    titleKey: "scheme2",
    descKey: "scheme2Desc",
    legacyPortal: "NSP & State Portals",
    coverage: "Class XI to Post-Graduation",
    targetGroup: "All higher secondary & college ST students",
    annualGrant: "₹12,000 - ₹35,000 / year + Tuition",
    incomeCeiling: "₹2.50 Lakh / annum",
    verifierSystem: "AISHE, DigiLocker & State e-District",
    color: "from-emerald-500 to-teal-700",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    isActiveForUser: false,
    eligible: true,
    ineligibilityReason: "Student chose higher-value Top Class Scheme. Under 'One-Scheme-Only' rule, Post-Matric cannot be availed concurrently."
  },
  {
    id: "top-class",
    titleKey: "scheme3",
    descKey: "scheme3Desc",
    legacyPortal: "National Scholarship Portal (NSP)",
    coverage: "Undergraduate & Post-Graduate",
    targetGroup: "ST scholars admitted to 260+ premier institutes (IITs, IIMs, AIIMS, NLUs)",
    annualGrant: "Full Tuition (up to ₹2.0 L) + ₹2,220/mo + ₹45,000 book/computer grant",
    incomeCeiling: "₹6.00 Lakh / annum",
    verifierSystem: "AISHE Institute Node & DigiLocker",
    color: "from-amber-500 to-orange-600",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    isActiveForUser: true, // CURRENT ACTIVE SCHEME FOR DEMO USER
    eligible: true,
    currentStatus: "MoTA Sanctioned - DBT Processing",
    statusStep: 4,
    sanctionedAmount: "₹1,85,000"
  },
  {
    id: "nfst",
    titleKey: "scheme4",
    descKey: "scheme4Desc",
    legacyPortal: "SFMP (Canara Bank Fellowship Portal)",
    coverage: "M.Phil & Ph.D. Research",
    targetGroup: "Tribal researchers qualifying UGC-NET / CSIR-NET / GATE",
    annualGrant: "₹31,000 - ₹35,000 / month + HRA + Contingency",
    incomeCeiling: "No income ceiling (Merit & Research based)",
    verifierSystem: "UGC-NTA & SFMP Bank Node",
    color: "from-purple-500 to-indigo-700",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    isActiveForUser: false,
    eligible: false,
    ineligibilityReason: "Requires active enrollment in Ph.D./M.Phil program and UGC-NET qualification."
  },
  {
    id: "nos",
    titleKey: "scheme5",
    descKey: "scheme5Desc",
    legacyPortal: "Standalone National Overseas Portal",
    coverage: "Masters & Ph.D. Abroad",
    targetGroup: "ST scholars pursuing studies in QS Top 500 World Universities",
    annualGrant: "100% Tuition Fees + $15,400 USD / £9,900 GBP annual living allowance + Airfare",
    incomeCeiling: "₹8.00 Lakh / annum",
    verifierSystem: "Indian Embassy / Visa & Passport Verification",
    color: "from-rose-500 to-pink-700",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    isActiveForUser: false,
    eligible: true,
    ineligibilityReason: "Eligibility open for future international study; cannot run parallel to Top Class India grant."
  }
];

export const currentStudent = {
  name: "Ramesh Birhor",
  tribe: "Birhor (Particularly Vulnerable Tribal Group - PVTG)",
  state: "Jharkhand (Hazaribagh District)",
  apaarId: "9021-4412-8874-1299",
  aadhaarMasked: "XXXX-XXXX-4921",
  institute: "Indian Institute of Technology, Kharagpur (AISHE: U-0120)",
  course: "B.Tech Computer Science & Engineering (Year 2)",
  activeApplicationId: "MOTA-2025-TC-991204",
  appliedSchemeId: "top-class",
  submissionDate: "14 August 2025",
  sanctionOrderNumber: "MoTA/2025/TC-ST/ORD-8821",
  sanctionDate: "12 September 2025",
  sanctionAmount: 185000,
  
  // 5 Stages Lifecycle
  timeline: [
    {
      step: 1,
      title: "Application & OTR Authentication",
      date: "14 Aug 2025",
      status: "COMPLETED",
      description: "One-Time Registration verified with UIDAI Aadhaar FaceRD/OTP.",
      actor: "Student / UIDAI"
    },
    {
      step: 2,
      title: "Digital API Auto-Verification",
      date: "16 Aug 2025",
      status: "COMPLETED",
      description: "Caste Certificate verified via Jharkhand e-District; 12th Marks via DigiLocker.",
      actor: "DigiLocker & State e-District"
    },
    {
      step: 3,
      title: "Institution Nodal Officer Verification",
      date: "24 Aug 2025",
      status: "COMPLETED",
      description: "IIT Kharagpur Nodal Officer validated AISHE admission code and fee structure.",
      actor: "IIT Kharagpur (AISHE: U-0120)"
    },
    {
      step: 4,
      title: "MoTA Scheme Sanction Order",
      date: "12 Sep 2025",
      status: "COMPLETED",
      description: "Ministry Sanction Committee approved ₹1,85,000 under Top Class ST Quota.",
      actor: "Ministry of Tribal Affairs"
    },
    {
      step: 5,
      title: "DBT Direct Bank Disbursement (PFMS)",
      date: "In Transit (Expected 02 Oct 2025)",
      status: "IN_PROGRESS",
      description: "Batch 44 PFMS clearance forwarded to NPCI Aadhaar Bridge bank account.",
      actor: "PFMS / NPCI Aadhaar Bridge"
    }
  ]
};

export const documentWallet = [
  {
    id: "doc-1",
    name: "ST / PVTG Caste Certificate",
    category: "Identity & Community",
    issuer: "State e-District Portal (Jharkhand)",
    docNumber: "JH-ST-PVTG-2023-99410",
    verifiedDate: "16 Aug 2025",
    isDigiLocker: true,
    status: "VERIFIED",
    reusableSchemes: ["Pre-Matric", "Post-Matric", "Top Class", "NFST", "NOS"],
    previewUrl: "mock_caste_cert.pdf"
  },
  {
    id: "doc-2",
    name: "Income Certificate (Family Annual: ₹1.80 L)",
    category: "Economic Eligibility",
    issuer: "Revenue Dept, Hazaribagh",
    docNumber: "REV-INC-2025-41092",
    verifiedDate: "16 Aug 2025",
    isDigiLocker: true,
    status: "VERIFIED",
    reusableSchemes: ["Pre-Matric", "Post-Matric", "Top Class", "NOS"],
    validTill: "31 March 2026",
    previewUrl: "mock_income_cert.pdf"
  },
  {
    id: "doc-3",
    name: "APAAR ID Card (Academic Registry)",
    category: "Academic",
    issuer: "Ministry of Education (EduLocker)",
    docNumber: "APAAR-9021-4412-8874-1299",
    verifiedDate: "14 Aug 2025",
    isDigiLocker: true,
    status: "VERIFIED",
    reusableSchemes: ["All Schemes"],
    previewUrl: "mock_apaar_card.pdf"
  },
  {
    id: "doc-4",
    name: "Higher Secondary (Class XII) Marksheet",
    category: "Academic Credentials",
    issuer: "CBSE / State Board",
    docNumber: "CBSE-XII-2024-88412",
    verifiedDate: "15 Aug 2025",
    isDigiLocker: true,
    status: "VERIFIED",
    reusableSchemes: ["Post-Matric", "Top Class", "NFST", "NOS"],
    previewUrl: "mock_marksheet.pdf"
  },
  {
    id: "doc-5",
    name: "IIT Kharagpur Bonafide & Fee Structure",
    category: "Institutional",
    issuer: "IIT Kharagpur Registrar (AISHE U-0120)",
    docNumber: "IITKGP-BON-2025-081",
    verifiedDate: "24 Aug 2025",
    isDigiLocker: true,
    status: "VERIFIED",
    reusableSchemes: ["Top Class"],
    previewUrl: "mock_bonafide.pdf"
  }
];

export const dbtDetails = {
  bankName: "State Bank of India",
  accountMasked: "XXXXXXXX8812",
  ifsc: "SBIN0000202",
  npciStatus: "ACTIVE",
  npciSeededDate: "04 January 2024",
  totalSanctioned: 185000,
  installments: [
    {
      id: "inst-1",
      installment: "Installment 1: Institutional Tuition Fee",
      amount: 92500,
      beneficiary: "Direct to IIT Kharagpur (Fee Account)",
      status: "CREDITED",
      utr: "SBIN882194819012",
      date: "18 Sep 2025"
    },
    {
      id: "inst-2",
      installment: "Installment 2: Living Allowance & Laptop Grant",
      amount: 92500,
      beneficiary: "Direct to Student Aadhaar Seeded Account",
      status: "PROCESSING",
      utr: "PFMS-GEN-2025-BATCH44",
      expectedDate: "02 Oct 2025"
    }
  ]
};

// Proactive Unreached ST Discovery Data (Matching UDISE+, APAAR & Census)
export const unreachedOutreachData = [
  {
    district: "Mayurbhanj, Odisha",
    stPopulation: 142000,
    enrolledUdise: 42100,
    scholarshipRecipients: 24500,
    unreachedEligible: 17600,
    coveragePercent: 58.2,
    pvtgGroups: ["Lodha", "Mankidia", "Hill Kharia"],
    outreachCampaignStatus: "SCHEDULED_IVRS"
  },
  {
    district: "Bastar, Chhattisgarh",
    stPopulation: 198000,
    enrolledUdise: 51200,
    scholarshipRecipients: 29800,
    unreachedEligible: 21400,
    coveragePercent: 58.1,
    pvtgGroups: ["Abujh Maria"],
    outreachCampaignStatus: "DISPATCHED_SMS"
  },
  {
    district: "Nilgiris, Tamil Nadu",
    stPopulation: 34000,
    enrolledUdise: 9400,
    scholarshipRecipients: 7600,
    unreachedEligible: 1800,
    coveragePercent: 80.8,
    pvtgGroups: ["Toda", "Kota", "Kurumba", "Paniyan", "Kattunayakan"],
    outreachCampaignStatus: "COMPLETED"
  },
  {
    district: "Hazaribagh, Jharkhand",
    stPopulation: 89000,
    enrolledUdise: 28400,
    scholarshipRecipients: 18200,
    unreachedEligible: 10200,
    coveragePercent: 64.1,
    pvtgGroups: ["Birhor"],
    outreachCampaignStatus: "ACTIVE"
  },
  {
    district: "Gadchiroli, Maharashtra",
    stPopulation: 112000,
    enrolledUdise: 33500,
    scholarshipRecipients: 20100,
    unreachedEligible: 13400,
    coveragePercent: 60.0,
    pvtgGroups: ["Madia Gond", "Kolam"],
    outreachCampaignStatus: "SCHEDULED_CAMP"
  }
];

// Officer Exception & Fuzzy Name Match Queue
export const officerExceptions = [
  {
    id: "EXC-8812",
    studentNameAadhaar: "Sunita Kumari Murmu",
    studentNameAcademic: "Sunita K Murmu",
    tribe: "Santhal",
    scheme: "Post-Matric ST",
    district: "Dumka, Jharkhand",
    issueType: "Minor Name Spelling / Initial Variation",
    similarityScore: 92, // Fuzzy match 92%
    status: "PENDING_GRACE_APPROVAL",
    dwoNote: "Aadhaar token and Father's name match 100%. Recommended for 48-hr Grace Approval."
  },
  {
    id: "EXC-8813",
    studentNameAadhaar: "Karthik Subramanian Irular",
    studentNameAcademic: "Karthik S",
    tribe: "Irular (PVTG)",
    scheme: "Pre-Matric ST",
    district: "Kanchipuram, Tamil Nadu",
    issueType: "Surname missing in School Registry",
    similarityScore: 88,
    status: "PENDING_GRACE_APPROVAL",
    dwoNote: "UDISE+ Student code matched with Gram Panchayat tribal verification certificate."
  },
  {
    id: "EXC-8814",
    studentNameAadhaar: "Pooja Maravi",
    studentNameAcademic: "Pooja Maravi",
    tribe: "Gond",
    scheme: "Top Class (AIIMS Bhopal)",
    district: "Mandla, MP",
    issueType: "Income Certificate renewal required",
    similarityScore: 100,
    status: "ACTION_REQUIRED_STUDENT",
    dwoNote: "Flagged to JAGO chatbot: Student notified to fetch renewed certificate from DigiLocker."
  }
];

// Critical Missing Gaps Analysis Matrix (For Hackathon Evaluation & Presentation)
export const missingGapsAnalysis = [
  {
    id: 1,
    dimension: "Cross-Portal Data Silos",
    existingProblem: "MoTA schemes are scattered across 3 isolated portals: NSP, Canara Bank SFMP, and standalone NOS. Students and families have zero unified view.",
    motaSetuInnovation: "Unified MoTA-SETU Data Mesh with single SSO, unifying all 5 schemes from Pre-Matric to Overseas Ph.D.",
    impact: "100% single-pane transparency for students and MoTA leadership."
  },
  {
    id: 2,
    dimension: "Enforcing 'One-Scheme-Only' Rule",
    existingProblem: "Deduplication is post-facto. Audits regularly detect students inadvertently claiming state post-matric and national fellowship concurrently.",
    motaSetuInnovation: "Pre-submission Cross-Scheme Deduplication Engine powered by APAAR ID & Aadhaar Vault Token.",
    impact: "Zero duplicate claims, zero recovery notices, seamless scheme upgrade."
  },
  {
    id: 3,
    dimension: "High Rejection of Tribal Names (Fuzzy Matching)",
    existingProblem: "Tribal names frequently have initial variations or traditional clan names in Aadhaar vs marksheets, causing hard rejections on NSP.",
    motaSetuInnovation: "Levenshtein-Soundex Fuzzy Match Layer. Scores >85% auto-clear; 70-85% routed to DWO for 48-hour Grace Approval instead of rejection.",
    impact: "Prevents wrongful rejection of over 42,000 genuine tribal applicants yearly."
  },
  {
    id: 4,
    dimension: "Unreached Tribal Students (Proactive Discovery)",
    existingProblem: "Existing portals only process applicants who reach them. ~38% of eligible ST students in remote forest areas drop out without applying.",
    motaSetuInnovation: "Proactive Gap Outreach Engine combining UDISE+ (school census), APAAR, and Census data to trigger native dialect IVRS & SMS campaigns.",
    impact: "Proactively identifies over 64,000 unreached tribal youth in high-priority PVTG blocks."
  },
  {
    id: 5,
    dimension: "PVTG (Particularly Vulnerable Tribal Groups) Fast-Track",
    existingProblem: "All 75 PVTG groups face identical rigid documentation requirements as urban applicants despite severe isolation.",
    motaSetuInnovation: "Dedicated PVTG Fast-Track Pipeline with Gram Panchayat digital verification and relaxed initial documentation.",
    impact: "Ensures 100% saturation for endangered tribal communities."
  },
  {
    id: 6,
    dimension: "DBT Failure Transparency & NPCI Diagnostics",
    existingProblem: "When scholarship money bounces due to dormant bank accounts or unlinked Aadhaar bridge, students are left in the dark for months.",
    motaSetuInnovation: "In-app real-time NPCI Aadhaar Bridge health check with 1-click Bank Branch escalation tickets.",
    impact: "Reduces DBT payment failure resolution time from 90 days to under 48 hours."
  },
  {
    id: 7,
    dimension: "Multilingual & Low-Bandwidth Accessibility",
    existingProblem: "Most portals operate in English and formal Hindi text only, excluding tribal students from South India (Tamil, Telugu) and Eastern tribal belts.",
    motaSetuInnovation: "Full native support for 6+ languages (Tamil, Hindi, English, Telugu, Bengali, Marathi) plus JAGO Voice AI assistant.",
    impact: "Empowers students to interact comfortably in their native mother tongue."
  }
];

// Video Presentation Scene-by-Scene Script
export const videoPresentationScript = [
  {
    scene: 1,
    timestamp: "00:00 - 00:45",
    title: "The Problem & The MoTA Fragmented Reality",
    visualCue: "Display slide showing 3 isolated portals (NSP, Canara Bank SFMP, Standalone NOS) and frustrated tribal students submitting documents 5 times.",
    narrationEnglish: "Welcome. Scheduled Tribe students across India rely on 5 flagship MoTA scholarship schemes—from 9th grade Pre-Matric to Overseas Ph.D. However, these schemes are fragmented across three separate portals: NSP, Canara Bank's SFMP, and a standalone NOS portal. Students must upload documents repeatedly, undergo repetitive manual verifications, and have no single view of their DBT funds.",
    narrationHindi: "नमस्ते। भारत भर के जनजातीय छात्र 5 प्रमुख योजनाओं पर निर्भर हैं, लेकिन ये योजनाएं तीन अलग-अलग पोर्टलों पर बिखरी हुई हैं: एनएसपी, केनरा बैंक एसएफएमपी और एनओएस। छात्रों को बार-बार दस्तावेज जमा करने पड़ते हैं और डीबीटी का कोई एकल दृश्य नहीं मिलता।",
    narrationTamil: "வணக்கம். இந்தியாவின் பழங்குடியின மாணவர்கள் 5 முக்கியமான கல்வி உதவித்தொகை திட்டங்களை நம்பியுள்ளனர். ஆனால் இவை NSP, கனரா வங்கி SFMP, மற்றும் NOS என மூன்று வெவ்வேறு தளங்களில் சிதறிக்கிடக்கின்றன. ஒரே பார்வையில் நிலை அறிவதும் கடினமாக உள்ளது.",
    keyTakeaway: "Clear visualization of portal fragmentation, duplicate availing risks, and verification bottlenecks."
  },
  {
    scene: 2,
    timestamp: "00:45 - 01:45",
    title: "Introducing MoTA-SETU: Single Unified Dashboard",
    visualCue: "Screen switches to MoTA-SETU Live Dashboard. Toggle the 6-language switcher (English -> Tamil -> Hindi). Point out the 'One-Scheme-Only' rule validation.",
    narrationEnglish: "Introducing MoTA-SETU: India's first unified, mobile-first ecosystem for all 5 tribal scholarship schemes. Notice how with a single click, our interface seamlessly transitions across English, Hindi, Tamil, Telugu, Bengali, and Marathi. The platform strictly enforces the statutory 'One-Scheme-Only' rule at pre-submission, preventing duplicate claims while preserving an upgrade path.",
    narrationHindi: "प्रस्तुत है मोता-सेतु: सभी 5 योजनाओं के लिए भारत का पहला एकीकृत मोबाइल-प्रथम इकोसिस्टम। तमिल, हिंदी, अंग्रेजी आदि 6 भाषाओं में तत्काल स्विच करें। यह पोर्टल 'एक समय में एक ही योजना' के नियम को स्वतः लागू करता है।",
    narrationTamil: "இதோ மோதா-சேது: அனைத்து 5 திட்டங்களையும் ஒருங்கிணைக்கும் இந்தியாவின் முதல் மொபைல் தளம். தமிழ், ஆங்கிலம், இந்தி என 6 மொழிகளில் உடனடியாக மாற்றிக்கொள்ளலாம். ஒரே நேரத்தில் ஒரு திட்டம் என்ற விதியை உறுதி செய்கிறது.",
    keyTakeaway: "Demonstrates 5-scheme unified tracking, 6 languages (Tamil/Hindi/English prioritized), and rule enforcement."
  },
  {
    scene: 3,
    timestamp: "01:45 - 02:45",
    title: "DigiLocker Digital Wallet & Single-Click API Verification",
    visualCue: "Click on 'DigiLocker Wallet' tab. Show green verified checkmarks for Caste (e-District), Income, APAAR ID, and AISHE. Click 'Reuse Across All Schemes'.",
    narrationEnglish: "Next, we solve repetitive documentation through our Digital Document Locker. By integrating with DigiLocker, APAAR, UDISE+, and State e-Districts, certificates are verified automatically in real-time. Once verified, these documents are 100% reusable across any of the 5 schemes without ever re-submitting.",
    narrationHindi: "डिजिलॉकर, अपार (APAAR) और राज्य ई-डिस्ट्रिक्ट के एकीकरण से प्रमाण पत्र स्वतः सत्यापित हो जाते हैं। एक बार सत्यापित होने के बाद, ये सभी 5 योजनाओं में दोबारा इस्तेमाल किए जा सकते हैं।",
    narrationTamil: "டிஜிலாக்கர் மற்றும் அபார் (APAAR) இணைப்பின் மூலம் சான்றிதழ்கள் நொடியில் தானாகவே சரிபார்க்கப்படுகின்றன. மீண்டும் மீண்டும் ஆவணங்களை பதிவேற்ற தேவையின்றி 5 திட்டங்களிலும் பயன்படுத்தலாம்.",
    keyTakeaway: "Zero manual paper verification; instant API-based trust layer; document re-use."
  },
  {
    scene: 4,
    timestamp: "02:45 - 03:45",
    title: "JAGO AI Assistant: Multilingual Voice & Instant Deficiency Resolution",
    visualCue: "Open JAGO AI chatbot. Show voice audio wave. Trigger quick query: 'Track my scholarship' and 'Why was my income certificate flagged?'.",
    narrationEnglish: "Meet JAGO, our vernacular AI assistant. JAGO speaks to tribal students in their mother tongue—Hindi, Tamil, Telugu, and English. If a document is expired or flagged, JAGO doesn't just alert the student—it allows 1-click re-syncing directly from DigiLocker inside the chat!",
    narrationHindi: "मिलिए 'जागो' से, आपका बहुभाषी एआई सहायक। यह छात्रों से उनकी मातृभाषा में बात करता है और किसी भी कमी का चैट के भीतर ही तुरंत समाधान करता है।",
    narrationTamil: "ஜாகோ AI உதவியாளரை சந்தியுங்கள். இது தமிழ் உள்ளிட்ட பிராந்திய மொழிகளில் பேசுகிறது. ஏதேனும் சான்றிதழ் குறைபாடு இருந்தால், சாட்பாட்டிலேயே உடனடியாக சரிசெய்ய உதவுகிறது.",
    keyTakeaway: "Accessible conversational interface with native voice guidance and interactive remediation."
  },
  {
    scene: 5,
    timestamp: "03:45 - 04:45",
    title: "What Was Missing: Fuzzy Matching & Unreached ST Discovery",
    visualCue: "Open 'Unreached ST Outreach' & 'Verification Exceptions' tabs. Show UDISE+ gap analytics (38% unreached) and Levenshtein 92% fuzzy match queue.",
    narrationEnglish: "Here is what existing systems completely missed: First, spelling variations in tribal names often cause wrongful rejections. Our Levenshtein fuzzy engine routes minor variations to District Welfare Officers for Grace Approval rather than rejection. Second, our Unreached ST Discovery Engine cross-references UDISE+ and APAAR to identify tribal children in remote areas who never applied, triggering targeted local-dialect IVRS outreach!",
    narrationHindi: "यह है वह समाधान जो मौजूदा प्रणालियों में गायब था: पहला, जनजातीय नामों में मामूली वर्तनी अंतर के लिए 'ग्रेस अप्रूवल' फजी इंजन। दूसरा, यूडाइस+ और अपार डेटा का मिलान करके उन बच्चों तक पहुंचना जिन्होंने कभी आवेदन नहीं किया।",
    narrationTamil: "தற்போதைய அமைப்புகளில் விடுபட்ட முக்கிய அம்சங்கள்: பழங்குடியின பெயர்களில் ஏற்படும் எழுத்துப் பிழைகளை தானாக நிராகரிக்காமல் 'கிரேஸ் அப்ரூவல்' தரும் முறை. மேலும் பள்ளி பதிவேடுகளுடன் ஒப்பிட்டு விடுபட்ட மாணவர்களை தானாக கண்டறியும் முறை.",
    keyTakeaway: "Judges' clincher: Levenshtein fuzzy resilience, DWO grace flow, and proactive UDISE+ equity outreach."
  },
  {
    scene: 6,
    timestamp: "04:45 - 05:30",
    title: "DBT & NPCI Diagnostics + Conclusion",
    visualCue: "Open DBT Tracker. Show active NPCI bank bridge, UTR records, and celebration confetti. Show impact metrics summary.",
    narrationEnglish: "Finally, our DBT Tracker monitors the NPCI Aadhaar bank bridge in real-time, preventing stalled payments. MoTA-SETU transforms tribal scholarship administration from fragmented bureaucratic silos into a proactive, compassionate, and 100% digital ecosystem. Thank you!",
    narrationHindi: "डीबीटी ट्रैकर एनपीसीआई आधार मैपर की वास्तविक समय निगरानी करता है। मोता-सेतु जनजातीय शिक्षा को सशक्त और पारदर्शी बनाता है। धन्यवाद!",
    narrationTamil: "நேரடி வங்கி பணப்பரிமாற்றம் (DBT) மற்றும் ஆதார் வங்கி இணைப்பை உடனுக்குடன் கண்காணிக்கிறது. பழங்குடியின மாணவர்களின் கல்விக்கனவை நனவாக்கும் மோதா-சேது. நன்றி!",
    keyTakeaway: "End-to-end closure with clear measurable impact and high-energy pitch."
  }
];
