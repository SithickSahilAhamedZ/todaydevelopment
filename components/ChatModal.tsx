
import React from 'react';
import { X, Mic, Send } from 'lucide-react';

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    isListening: boolean;
    startListening: (lang: 'en-IN' | 'hi-IN') => void;
    stopListening: () => void;
    currentLang: 'en-IN' | 'hi-IN';
    setLang: (lang: 'en-IN' | 'hi-IN') => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, messages, isListening, startListening, stopListening, currentLang, setLang }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            <div className="bg-orange-50 dark:bg-gray-800 w-full max-w-lg h-[80vh] rounded-t-2xl flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">PilgrimPath Assistant</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isListening && <div className="text-center text-gray-500 dark:text-gray-400">Listening...</div>}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Language:</span>
                            <button onClick={() => setLang('en-IN')} className={`px-3 py-1 text-sm rounded-full ${currentLang === 'en-IN' ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>English</button>
                            <button onClick={() => setLang('hi-IN')} className={`px-3 py-1 text-sm rounded-full ${currentLang === 'hi-IN' ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>हिन्दी</button>
                        </div>
                        <button 
                            onClick={isListening ? stopListening : () => startListening(currentLang)} 
                            className={`p-4 rounded-full text-white transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}
                        >
                            <Mic size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
