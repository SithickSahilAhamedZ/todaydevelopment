import React, { useState, useEffect, useRef } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NavigationPage from './pages/NavigationPage';
import BookingPage from './pages/BookingPage';
import EmergencyPage from './pages/EmergencyPage';
import ReportPage from './pages/ReportPage';
import GalleryPage from './pages/GalleryPage';
import ChatModal from './components/ChatModal';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { getAIResponse } from './services/aiService';
import { I18nProvider } from './i18n';

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const App: React.FC = () => {
  const [activePage, setActivePageInternal] = useState<Page>(Page.Home);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pageContext, setPageContext] = useState<any>(null);
  
  // Lifted Chat State
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      { text: "Hello! I am your PilgrimPath assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [currentLang, setCurrentLang] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const prevTranscriptRef = useRef('');

  useEffect(() => {
      if (!isListening && transcript && transcript !== prevTranscriptRef.current) {
          handleSendMessage(transcript);
          prevTranscriptRef.current = transcript;
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript]);

  const setActivePage = (page: Page, context: any = null) => {
    setActivePageInternal(page);
    setPageContext(context);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleSendMessage = async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = { text, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);

      const aiResponseText = await getAIResponse(text);
      const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
  };

  const handleVoiceSearch = () => {
    setChatOpen(true);
    // Timeout to allow modal to open before starting listening
    setTimeout(() => startListening(currentLang), 300);
  }

  const renderPage = () => {
    switch (activePage) {
      case Page.Home: return <HomePage setChatOpen={setChatOpen} setActivePage={setActivePage} />;
      case Page.Navigation: return <NavigationPage />;
      case Page.Booking: return <BookingPage initialTab={pageContext?.initialTab} />;
      case Page.Emergency: return <EmergencyPage />;
      case Page.Report: return <ReportPage />;
      case Page.Gallery: return <GalleryPage />;
      default: return <HomePage setChatOpen={setChatOpen} setActivePage={setActivePage} />;
    }
  };

  return (
    <I18nProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          isMenuOpen={isMenuOpen} 
          setMenuOpen={setMenuOpen} 
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header setMenuOpen={setMenuOpen} onVoiceSearch={handleVoiceSearch} />
          <main key={activePage} className="flex-1 overflow-x-hidden overflow-y-auto bg-orange-50 dark:bg-gray-900 animate-fade-in">
            {renderPage()}
          </main>
        </div>
         <ChatModal 
            isOpen={isChatOpen}
            onClose={() => setChatOpen(false)}
            messages={messages}
            isListening={isListening}
            startListening={startListening}
            stopListening={stopListening}
            currentLang={currentLang}
            setLang={setCurrentLang}
        />
      </div>
    </I18nProvider>
  );
};

export default App;