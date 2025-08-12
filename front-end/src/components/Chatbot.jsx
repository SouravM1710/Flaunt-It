import { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm your Flaunt-It fashion assistant. How can I help you with your style today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample fashion advice responses
  const fashionResponses = {
    casual: "For a casual look, try pairing slim jeans with a quality t-shirt and white sneakers. Layer with a denim jacket or cardigan for cooler weather. Accessories like a simple watch or minimal jewelry can elevate the look.",
    formal: "For formal occasions, a well-fitted suit in navy or charcoal is timeless. Pair with a crisp white shirt and a coordinating tie. Ensure your shoes are polished, and consider a pocket square for extra sophistication.",
    summer: "For summer style, opt for breathable fabrics like linen and cotton. Light colors reflect heat - try white, pastels, or light neutrals. Shorts or flowy dresses paired with sandals or espadrilles are perfect for hot days.",
    winter: "Layer up for winter with thermal base layers, wool sweaters, and a quality coat. Don't forget accessories like scarves, beanies, and gloves not just for warmth but as style statements. Boots with good tread will keep you stylish and safe.",
    "plus size": "Embrace styles that highlight your favorite features! Look for A-line dresses, vertical stripes, and wrap styles that create definition. Well-fitted garments (not too tight or too loose) are most flattering. Don't be afraid of color and patterns!",
    petite: "For petite frames, try high-waisted bottoms to elongate your legs and monochromatic outfits for a streamlined look. Be mindful of proportions - avoid oversized pieces that might overwhelm your frame. Tailoring is your best friend!",
    workwear: "For office attire, invest in quality basics like tailored pants, knee-length skirts, and button-down shirts. A blazer instantly elevates any outfit. Stick to a cohesive color palette for easy mixing and matching.",
    "first date": "For a first date, wear something that makes you feel confident but comfortable. A nice pair of jeans with a button-up shirt or a casual dress works well. Add a unique accessory that might serve as a conversation starter!",
    wedding: "For wedding guests, follow the dress code if specified. Generally, a suit or dress in muted colors works well (avoid white or anything too flashy). If the wedding is outdoors, consider the terrain when choosing shoes.",
    accessories: "Accessories can transform an outfit! Start with versatile pieces like a quality watch, simple necklace, or classic handbag. Remember the rule of 'last on, first off' - put on all accessories, then remove one to avoid over-accessorizing.",
    sustainable: "For sustainable fashion, invest in quality pieces that last, shop secondhand, choose natural fibers, and support ethical brands. Building a capsule wardrobe helps reduce consumption while maximizing outfit combinations.",
    trends: "While trends are fun to explore, focus on incorporating them through accessories or one statement piece rather than overhauling your wardrobe. This allows you to stay current without sacrificing your personal style or budget."
  };

  // Predefined conversation suggestions
  const conversationSuggestions = [
    "How should I dress for a casual day out?",
    "What's appropriate for a formal event?",
    "Can you suggest summer outfit ideas?",
    "How can I style for winter?",
    "Fashion tips for plus size body types?",
    "Workwear fashion advice?",
    "What should I wear on a first date?",
    "How to accessorize outfits?",
    "Tips for sustainable fashion?"
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    handleUserMessage(suggestion);
  };

  const handleUserMessage = (message) => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: generateBotResponse(message),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message) => {
    const lowerCaseMsg = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(fashionResponses)) {
      if (lowerCaseMsg.includes(keyword)) {
        return response;
      }
    }
    
    // General responses if no keyword matches
    if (lowerCaseMsg.includes('hello') || lowerCaseMsg.includes('hi') || lowerCaseMsg.includes('hey')) {
      return "Hello! How can I help with your fashion questions today?";
    }
    
    if (lowerCaseMsg.includes('thanks') || lowerCaseMsg.includes('thank you')) {
      return "You're welcome! Feel free to ask if you have any other fashion questions.";
    }
    
    if (lowerCaseMsg.includes('bye') || lowerCaseMsg.includes('goodbye')) {
      return "Goodbye! Feel free to come back anytime for more fashion advice!";
    }

    if (lowerCaseMsg.includes('color') || lowerCaseMsg.includes('colours') || lowerCaseMsg.includes('colors')) {
      return "Colors play a crucial role in fashion! Consider your skin tone: warm tones look great in earthy colors (yellows, oranges, reds), while cool tones shine in blues, purples, and greens. Don't be afraid to experiment, and remember that confidence is the best accessory!";
    }

    if (lowerCaseMsg.includes('body type') || lowerCaseMsg.includes('shape')) {
      return "Dressing for your body type is about emphasizing your favorite features! Apple shapes can highlight legs with A-line styles, pear shapes can draw attention to the upper body with detailed tops, hourglass shapes benefit from fitted clothes, and rectangle shapes can create curves with belted outfits or layering.";
    }

    // Default response
    return "That's an interesting fashion question! For personalized style advice, try asking about specific occasions (casual, formal), seasons (summer, winter), or style concerns (colors, accessories, body types). I'm here to help you look and feel your best!";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(input);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Button */}
      <div 
        className="fixed bottom-6 right-6 bg-black text-white rounded-full p-3 cursor-pointer shadow-lg z-50"
        onClick={toggleChatbot}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200 flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="font-medium">Fashion Assistant</h3>
            </div>
            <button onClick={toggleChatbot}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-white border border-gray-200 text-gray-800' 
                      : 'bg-black text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-gray-300'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="p-3 bg-gray-100 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {conversationSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button 
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your fashion question..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-black text-white rounded-r-lg px-4 py-2"
              disabled={!input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;