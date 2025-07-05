
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' }
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: 'VayuRakshak',
    tagline: 'Breathe the Future',
    heroDescription: 'AI-powered air pollution monitoring from space using satellite data, machine learning, and real-time predictions to protect public health',
    exploreData: 'Explore Live Data',
    viewPredictions: 'View AI Predictions',
    livePollutionMapping: 'Live Pollution Mapping',
    pollutionDescription: 'Real-time PM2.5 and PM10 concentrations across India using ISRO satellite data and AI predictions',
    liveSatelliteMapping: 'Live Satellite Mapping',
    satelliteDescription: 'Real-time Air Quality Monitoring from Space',
    currentAQI: 'Current AQI',
    healthTips: 'Health Tips',
    tomorrowForecast: 'Tomorrow Forecast',
    emergencyHelp: 'Emergency Help',
    satelliteData: 'Satellite Data',
    locationAnalysis: 'Location Analysis',
    aiAssistantGreeting: 'नमस्ते! I\'m VayuRakshak AI Assistant 🇮🇳. I provide real-time air quality insights, health recommendations, and environmental predictions using ISRO satellite data and advanced AI. How can I help you breathe better today?',
    stations: 'CPCB Stations',
    accuracy: 'AI Accuracy',
    monitoring: 'Real-time Monitoring'
  },
  hi: {
    appName: 'वायुरक्षक',
    tagline: 'भविष्य की सांस लें',
    heroDescription: 'उपग्रह डेटा, मशीन लर्निंग और रियल-टाइम भविष्यवाणियों का उपयोग करके अंतरिक्ष से AI-संचालित वायु प्रदूषण निगरानी',
    exploreData: 'लाइव डेटा देखें',
    viewPredictions: 'AI भविष्यवाणी देखें',
    livePollutionMapping: 'लाइव प्रदूषण मैपिंग',
    pollutionDescription: 'ISRO उपग्रह डेटा और AI भविष्यवाणियों का उपयोग करके भारत में वास्तविक समय PM2.5 और PM10 सांद्रता',
    liveSatelliteMapping: 'लाइव सैटेलाइट मैपिंग',
    satelliteDescription: 'अंतरिक्ष से वास्तविक समय वायु गुणवत्ता निगरानी',
    currentAQI: 'वर्तमान AQI',
    healthTips: 'स्वास्थ्य सुझाव',
    tomorrowForecast: 'कल का पूर्वानुमान',
    emergencyHelp: 'आपातकालीन सहायता',
    satelliteData: 'उपग्रह डेटा',
    locationAnalysis: 'स्थान विश्लेषण',
    aiAssistantGreeting: 'नमस्ते! मैं वायुरक्षक AI सहायक हूं 🇮🇳। मैं ISRO उपग्रह डेटा और उन्नत AI का उपयोग करके वास्तविक समय वायु गुणवत्ता अंतर्दृष्टि, स्वास्थ्य सिफारिशें और पर्यावरणीय भविष्यवाणी प्रदान करता हूं।',
    stations: 'CPCB स्टेशन',
    accuracy: 'AI सटीकता',
    monitoring: 'वास्तविक समय निगरानी'
  },
  bn: {
    appName: 'বায়ুরক্ষক',
    tagline: 'ভবিষ্যতের শ্বাস নিন',
    heroDescription: 'স্যাটেলাইট ডেটা, মেশিন লার্নিং এবং রিয়েল-টাইম পূর্বাভাস ব্যবহার করে মহাকাশ থেকে AI-চালিত বায়ু দূষণ পর্যবেক্ষণ',
    exploreData: 'লাইভ ডেটা অন্বেষণ করুন',
    viewPredictions: 'AI পূর্বাভাস দেখুন',
    livePollutionMapping: 'লাইভ দূষণ ম্যাপিং',
    pollutionDescription: 'ISRO স্যাটেলাইট ডেটা এবং AI পূর্বাভাস ব্যবহার করে ভারত জুড়ে রিয়েল-টাইম PM2.5 এবং PM10 ঘনত্ব',
    liveSatelliteMapping: 'লাইভ স্যাটেলাইট ম্যাপিং',
    satelliteDescription: 'মহাকাশ থেকে রিয়েল-টাইম বায়ুর গুণমান পর্যবেক্ষণ',
    currentAQI: 'বর্তমান AQI',
    healthTips: 'স্বাস্থ্য টিপস',
    tomorrowForecast: 'আগামীকালের পূর্বাভাস',
    emergencyHelp: 'জরুরি সাহায্য',
    satelliteData: 'স্যাটেলাইট ডেটা',
    locationAnalysis: 'অবস্থান বিশ্লেষণ',
    aiAssistantGreeting: 'নমস্কার! আমি বায়ুরক্ষক AI সহায়ক 🇮🇳। আমি ISRO স্যাটেলাইট ডেটা এবং উন্নত AI ব্যবহার করে রিয়েল-টাইম বায়ুর গুণমান অন্তর্দৃষ্টি, স্বাস্থ্য সুপারিশ এবং পরিবেশগত পূর্বাভাস প্রদান করি।',
    stations: 'CPCB স্টেশন',
    accuracy: 'AI নির্ভুলতা',
    monitoring: 'রিয়েল-টাইম পর্যবেক্ষণ'
  },
  te: {
    appName: 'వాయురక్షక్',
    tagline: 'భవిష్యత్తును ఊపిరాడండి',
    heroDescription: 'ఉపగ్రహ డేటా, మెషిన్ లెర్నింగ్ మరియు రియల్-టైమ్ అంచనాలను ఉపయోగించి అంతరిక్షం నుండి AI-శక్తితో వాయు కాలుష్య పర్యవేక్షణ',
    exploreData: 'లైవ్ డేటాను అన్వేషించండి',
    viewPredictions: 'AI అంచనాలను చూడండి',
    livePollutionMapping: 'లైవ్ కాలుష్య మ్యాపింగ్',
    pollutionDescription: 'ISRO ఉపగ్రహ డేటా మరియు AI అంచనాలను ఉపయోగించి భారతదేశంలో రియల్-టైమ్ PM2.5 మరియు PM10 సాంద్రతలు',
    liveSatelliteMapping: 'లైవ్ సాటిలైట్ మ్యాపింగ్',
    satelliteDescription: 'అంతరిక్షం నుండి రియల్-టైమ్ వాయు నాణ్యత పర్యవేక్షణ',
    currentAQI: 'ప్రస్తుత AQI',
    healthTips: 'ఆరోగ్య చిట్కాలు',
    tomorrowForecast: 'రేపటి అంచనా',
    emergencyHelp: 'అత్యవసర సహాయం',
    satelliteData: 'ఉపగ్రహ డేటా',
    locationAnalysis: 'స్థాన విశ్లేషణ',
    aiAssistantGreeting: 'నమస్కారం! నేను వాయురక్షక్ AI అసిస్టెంట్ 🇮🇳। నేను ISRO ఉపగ్రహ డేటా మరియు అధునాతన AIని ఉపయోగించి రియల్-టైమ్ వాయు నాణ్యత అంతర్దృష్టులు, ఆరోగ్య సిఫార్సులు మరియు పర్యావరణ అంచనాలను అందిస్తాను।',
    stations: 'CPCB స్టేషన్లు',
    accuracy: 'AI ఖచ్చితత్వం',
    monitoring: 'రియల్-టైమ్ పర్యవేక్షణ'
  },
  mr: {
    appName: 'वायुरक्षक',
    tagline: 'भविष्याचा श्वास घ्या',
    heroDescription: 'उपग्रह डेटा, मशीन लर्निंग आणि रियल-टाइम अंदाज वापरून अंतराळातून AI-चालित हवा प्रदूषण निरीक्षण',
    exploreData: 'लाइव्ह डेटा शोधा',
    viewPredictions: 'AI अंदाज पहा',
    livePollutionMapping: 'लाइव्ह प्रदूषण मॅपिंग',
    pollutionDescription: 'ISRO उपग्रह डेटा आणि AI अंदाज वापरून भारतातील रियल-टाइम PM2.5 आणि PM10 सांद्रता',
    liveSatelliteMapping: 'लाइव्ह सॅटेलाइट मॅपिंग',
    satelliteDescription: 'अंतराळातून रियल-टाइम हवेची गुणवत्ता निरीक्षण',
    currentAQI: 'सध्याचा AQI',
    healthTips: 'आरोग्य टिप्स',
    tomorrowForecast: 'उद्याचा अंदाज',
    emergencyHelp: 'आणीबाणीची मदत',
    satelliteData: 'उपग्रह डेटा',
    locationAnalysis: 'स्थान विश्लेषण',
    aiAssistantGreeting: 'नमस्कार! मी वायुरक्षक AI असिस्टंट आहे 🇮🇳। मी ISRO उपग्रह डेटा आणि प्रगत AI वापरून रियल-टाइम हवेची गुणवत्ता अंतर्दृष्टी, आरोग्य शिफारसी आणि पर्यावरणीय अंदाज प्रदान करतो।',
    stations: 'CPCB स्टेशन',
    accuracy: 'AI अचूकता',
    monitoring: 'रियल-टाइम निरीक्षण'
  },
  ta: {
    appName: 'வாயுரக்ஷக்',
    tagline: 'எதிர்காலத்தை சுவாசிக்கவும்',
    heroDescription: 'செயற்கைக்கோள் தரவு, இயந்திர கற்றல் மற்றும் நிகழ்நேர கணிப்புகளைப் பயன்படுத்தி விண்வெளியிலிருந்து AI-இயங்கும் காற்று மாசு கண்காணிப்பு',
    exploreData: 'நேரடி தரவை ஆராயுங்கள்',
    viewPredictions: 'AI கணிப்புகளைப் பார்க்கவும்',
    livePollutionMapping: 'நேரடி மாசு வரைபடம்',
    pollutionDescription: 'ISRO செயற்கைக்கோள் தரவு மற்றும் AI கணிப்புகளைப் பயன்படுத்தி இந்தியா முழுவதும் நிகழ்நேர PM2.5 மற்றும் PM10 செறிவுகள்',
    liveSatelliteMapping: 'நேரடி செயற்கைக்கோள் வரைபடம்',
    satelliteDescription: 'விண்வெளியிலிருந்து நிகழ்நேர காற்றின் தரக் கண்காணிப்பு',
    currentAQI: 'தற்போதைய AQI',
    healthTips: 'சுகாதார குறிப்புகள்',
    tomorrowForecast: 'நாளைய கணிப்பு',
    emergencyHelp: 'அவசர உதவி',
    satelliteData: 'செயற்கைக்கோள் தரவு',
    locationAnalysis: 'இட பகுப்பாய்வு',
    aiAssistantGreeting: 'வணக்கம்! நான் வாயுரக்ஷக் AI உதவியாளர் 🇮🇳। நான் ISRO செயற்கைக்கோள் தரவு மற்றும் மேம்பட்ட AIஐப் பயன்படுத்தி நிகழ்நேர காற்றின் தர நுண்ணறிவு, சுகாதார பரிந்துரைகள் மற்றும் சுற்றுச்சூழல் கணிப்புகளை வழங்குகிறேன்।',
    stations: 'CPCB நிலையங்கள்',
    accuracy: 'AI துல்லியம்',
    monitoring: 'நிகழ்நேர கண்காணிப்பு'
  },
  gu: {
    appName: 'વાયુરક્ષક',
    tagline: 'ભવિષ્યનો શ્વાસ લો',
    heroDescription: 'ઉપગ્રહ ડેટા, મશીન લર્નિંગ અને રીઅલ-ટાઈમ આગાહીઓનો ઉપયોગ કરીને અવકાશમાંથી AI-સંચાલિત હવા પ્રદૂષણ નિરીક્ષણ',
    exploreData: 'લાઈવ ડેટા અન્વેષણ કરો',
    viewPredictions: 'AI આગાહીઓ જુઓ',
    livePollutionMapping: 'લાઈવ પ્રદૂષણ મેપિંગ',
    pollutionDescription: 'ISRO ઉપગ્રહ ડેટા અને AI આગાહીઓનો ઉપયોગ કરીને ભારતમાં રીઅલ-ટાઈમ PM2.5 અને PM10 સાંદ્રતા',
    liveSatelliteMapping: 'લાઈવ સેટેલાઈટ મેપિંગ',
    satelliteDescription: 'અવકાશમાંથી રીઅલ-ટાઈમ હવાની ગુણવત્તા નિરીક્ષણ',
    currentAQI: 'વર્તમાન AQI',
    healthTips: 'આરોગ્ય ટિપ્સ',
    tomorrowForecast: 'આવતીકાલની આગાહી',
    emergencyHelp: 'કટોકટી સહાય',
    satelliteData: 'ઉપગ્રહ ડેટા',
    locationAnalysis: 'સ્થાન વિશ્લેષણ',
    aiAssistantGreeting: 'નમસ્કાર! હું વાયુરક્ષક AI સહાયક છું 🇮🇳। હું ISRO ઉપગ્રહ ડેટા અને અદ્યતન AIનો ઉપયોગ કરીને રીઅલ-ટાઈમ હવાની ગુણવત્તા આંતરદૃષ્ટિ, આરોગ્ય ભલામણો અને પર્યાવરણીય આગાહીઓ પ્રદાન કરું છું।',
    stations: 'CPCB સ્ટેશનો',
    accuracy: 'AI ચોકસાઈ',
    monitoring: 'રીઅલ-ટાઈમ નિરીક્ષણ'
  },
  kn: {
    appName: 'ವಾಯುರಕ್ಷಕ',
    tagline: 'ಭವಿಷ್ಯದ ಉಸಿರಾಟ',
    heroDescription: 'ಉಪಗ್ರಹ ಡೇಟಾ, ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮತ್ತು ನೈಜ-ಸಮಯ ಮುನ್ನೋಟಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಅಂತರಿಕ್ಷದಿಂದ AI-ಚಾಲಿತ ವಾಯು ಮಾಲಿನ್ಯ ಮೇಲ್ವಿಚಾರಣೆ',
    exploreData: 'ಲೈವ್ ಡೇಟಾವನ್ನು ಅನ್ವೇಷಿಸಿ',
    viewPredictions: 'AI ಮುನ್ನೋಟಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    livePollutionMapping: 'ಲೈವ್ ಮಾಲಿನ್ಯ ಮ್ಯಾಪಿಂಗ್',
    pollutionDescription: 'ISRO ಉಪಗ್ರಹ ಡೇಟಾ ಮತ್ತು AI ಮುನ್ನೋಟಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಭಾರತದಾದ್ಯಂತ ನೈಜ-ಸಮಯ PM2.5 ಮತ್ತು PM10 ಸಾಂದ್ರತೆಗಳು',
    liveSatelliteMapping: 'ಲೈವ್ ಉಪಗ್ರಹ ಮ್ಯಾಪಿಂಗ್',
    satelliteDescription: 'ಅಂತರಿಕ್ಷದಿಂದ ನೈಜ-ಸಮಯ ವಾಯು ಗುಣಮಟ್ಟ ಮೇಲ್ವಿಚಾರಣೆ',
    currentAQI: 'ಪ್ರಸ್ತುತ AQI',
    healthTips: 'ಆರೋಗ್ಯ ಸಲಹೆಗಳು',
    tomorrowForecast: 'ನಾಳಿನ ಮುನ್ನೋಟ',
    emergencyHelp: 'ತುರ್ತು ಸಹಾಯ',
    satelliteData: 'ಉಪಗ್ರಹ ಡೇಟಾ',
    locationAnalysis: 'ಸ್ಥಳ ವಿಶ್ಲೇಷಣೆ',
    aiAssistantGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ವಾಯುರಕ್ಷಕ AI ಸಹಾಯಕ 🇮🇳। ನಾನು ISRO ಉಪಗ್ರಹ ಡೇಟಾ ಮತ್ತು ಅತ್ಯಾಧುನಿಕ AIಯನ್ನು ಬಳಸಿಕೊಂಡು ನೈಜ-ಸಮಯ ವಾಯು ಗುಣಮಟ್ಟ ಒಳನೋಟಗಳು, ಆರೋಗ್ಯ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಪರಿಸರ ಮುನ್ನೋಟಗಳನ್ನು ಒದಗಿಸುತ್ತೇನೆ।',
    stations: 'CPCB ಕೇಂದ್ರಗಳು',
    accuracy: 'AI ನಿಖರತೆ',
    monitoring: 'ನೈಜ-ಸಮಯ ಮೇಲ್ವಿಚಾರಣೆ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    const translation = translations[currentLanguage.code as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
