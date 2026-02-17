import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 I can help you find your dream job. Choose a topic below or type your question!", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isTyping]);

    const SUGGESTED_QUESTIONS = [
        { label: "Find Jobs", query: "jobs", answer: "You can browse all open positions on our 'Jobs' page. We have roles in Engineering, Design, and Marketing!" },
        { label: "Salary Info", query: "salary", answer: "Our jobs offer competitive salaries ranging from $70k to over $200k, depending on experience and role. 💰" },
        { label: "Remote Work", query: "remote", answer: "Yes! We are a Remote-First company. You can work from anywhere in the world. 🌍" },
        { label: "How to Apply", query: "apply", answer: "It's easy! Click 'Details' on any job card, then use the 'Apply Now' button at the bottom of the description." },
        { label: "Contact Support", query: "support", answer: "Need human help? Email us at support@reactjobs.com and we'll get back to you within 24 hours." }
    ];

    const generateResponse = (text) => {
        const lowerInput = text.toLowerCase();

        // Check for exact match in suggestions first
        const match = SUGGESTED_QUESTIONS.find(q => q.query === lowerInput || q.label.toLowerCase() === lowerInput);
        if (match) return match.answer;

        // Keyword matching
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello! 👋 How can I help you today?";
        if (lowerInput.includes('job') || lowerInput.includes('openings')) return "Check out the 'Jobs' page to see all available listings.";
        if (lowerInput.includes('salary') || lowerInput.includes('pay')) return "Salaries vary by role, but we offer competitive packages! 💰";
        if (lowerInput.includes('remote') || lowerInput.includes('wfh')) return "Yes, most of our roles offer remote options! 🏠";
        if (lowerInput.includes('apply')) return "You can apply directly through the specific job's detail page.";
        if (lowerInput.includes('thank')) return "You're welcome! Good luck with your job search! 🚀";

        return "I'm not sure about that one. Try one of the suggested topics below! 👇";
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        processMessage(inputText);
        setInputText("");
    };

    const handleChipClick = (question) => {
        processMessage(question.label, question.answer);
    };

    const processMessage = (userText, instantAnswer = null) => {
        const newMessage = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, newMessage]);

        setIsTyping(true);

        // Simulate thinking time
        setTimeout(() => {
            const replyText = instantAnswer || generateResponse(userText);

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: replyText,
                sender: 'bot'
            }]);
            setIsTyping(false);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white shrink-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <h3 className="font-bold">ReactJobs Assistant</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/20 p-1 rounded-full transition"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-gray-500 p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-sm">
                                        Thinking... 💭
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        <div className="p-3 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0">
                            <div className="flex space-x-2">
                                {SUGGESTED_QUESTIONS.map((q, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleChipClick(q)}
                                        className="px-3 py-1 bg-white border border-indigo-100 text-indigo-600 text-xs rounded-full hover:bg-indigo-50 transition shadow-sm"
                                    >
                                        {q.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            />
                            <button
                                type="submit"
                                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
                                disabled={!inputText.trim()}
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full 
          shadow-lg flex items-center justify-center hover:shadow-indigo-500/30 hover:shadow-xl transition-shadow"
            >
                {isOpen ? (
                    <XMarkIcon className="w-7 h-7" />
                ) : (
                    <ChatBubbleLeftRightIcon className="w-7 h-7" />
                )}
            </motion.button>
        </div>
    );
};

export default ChatBot;
