import React, { useState, useEffect, useRef } from 'react';
import { Product, ChatMessage, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { 
  X, 
  Send, 
  Phone, 
  CheckCircle2, 
  Volume2, 
  Sparkles, 
  Tag, 
  ThumbsUp, 
  MapPin,
  Clock,
  Play,
  Pause,
  Smile
} from 'lucide-react';

interface DirectChatModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const DirectChatModal: React.FC<DirectChatModalProps> = ({
  product,
  isOpen,
  onClose,
  currentLang,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [proposedPrice, setProposedPrice] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[currentLang];

  // Initialize chat when opened with a product
  useEffect(() => {
    if (product && isOpen) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'farmer',
          senderName: product.farmerName,
          text: `राम राम जी! मैं ${product.farmerName} (${product.location} से) बोल रहा हूँ। मेरी यह ${product.name} की फसल ताज़ी कटी हुई है। आपको कितने क्विंटल या किलो चाहिए?`,
          timestamp: 'Just now',
        },
        {
          id: 'welcome-2',
          sender: 'farmer',
          senderName: product.farmerName,
          text: `वॉयस संदेश: "भाई साहब, खेत में एकदम शुद्ध जैविक खाद से तैयार माल है। आप निश्चिंत होकर ऑर्डर करें।"`,
          timestamp: 'Just now',
          audioDuration: '0:18',
        }
      ]);
      setProposedPrice(Math.round(product.price * 0.95).toString());
    }
  }, [product, isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen || !product) return null;

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      senderName: 'You (Buyer)',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');

    // Simulate Farmer's intelligent prompt response
    setIsTyping(true);
    setTimeout(() => {
      let replyText = `जी भाई साहब, बिल्कुल! यह माल आज सुबह का ही ताजा है और हम सीधे खेत से पैक करके भेजेंगे।`;
      
      if (textToSend.includes('थोक') || textToSend.includes('bulk') || textToSend.includes('discount')) {
        replyText = `अगर आप 3 क्विंटल या ज्यादा लेते हैं, तो मैं ₹100 प्रति क्विंटल का विशेष डिस्काउंट लगा दूंगा। गाड़ी कल सुबह आपके पते पर पहुंच जाएगी।`;
      } else if (textToSend.includes('डिलीवरी') || textToSend.includes('delivery')) {
        replyText = `हमारे गांव के पास किसानकनेक्ट का पिकअप सेंटर है। शाम 4 बजे से पहले आर्डर होते ही कल सुबह 11 बजे तक आपके दरवाजे पर डिलीवरी हो जाएगी।`;
      } else if (textToSend.includes('organic') || textToSend.includes('जैविक')) {
        replyText = `जी 100% देशी खाद का इस्तेमाल हुआ है, कोई यूरिया या पेस्टीसाइड नहीं है। आप टेस्ट करवा सकते हैं।`;
      }

      const farmerReply: ChatMessage = {
        id: `frm-${Date.now()}`,
        sender: 'farmer',
        senderName: product.farmerName,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, farmerReply]);
      setIsTyping(false);
    }, 1400);
  };

  const handleSendBargainOffer = () => {
    const priceNum = parseInt(proposedPrice);
    if (!priceNum || priceNum <= 0) return;

    const offerMsg: ChatMessage = {
      id: `offer-${Date.now()}`,
      sender: 'customer',
      senderName: 'You (Buyer)',
      text: `प्रस्तावित भाव (Offer): ₹${priceNum} ${product.unit}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOffer: true,
      offerAmount: priceNum,
      offerUnit: product.unit,
      offerStatus: 'pending',
    };

    setMessages((prev) => [...prev, offerMsg]);
    setShowOfferInput(false);

    // Farmer reviews offer
    setIsTyping(true);
    setTimeout(() => {
      const minAcceptable = product.price * 0.92;
      const isAccepted = priceNum >= minAcceptable;

      const reply: ChatMessage = {
        id: `offer-resp-${Date.now()}`,
        sender: 'farmer',
        senderName: product.farmerName,
        text: isAccepted
          ? `सौदा पक्का! मुझे आपका भाव ₹${priceNum} ${product.unit} स्वीकार है। आप अभी ऑर्डर कर दें, मैं सबसे बढ़िया दाने वाली बोरी अलग निकाल कर रख देता हूँ।`
          : `भाई जी, ₹${priceNum} थोड़ा कम है क्योंकि डीजल और तुलाई का खर्च भी है। आपके लिए मैं अंतिम ₹${Math.round(product.price * 0.95)} लगा सकता हूँ। बोलिए?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[720px] border border-slate-200">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-800 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center shadow-md">
                {product.emoji}
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base leading-tight">{product.farmerName}</h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-emerald-900" />
              </div>
              <p className="text-xs text-emerald-200 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{product.location}</span>
                <span>•</span>
                <span className="text-amber-300 font-semibold">{product.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.phone && (
              <a
                href={`tel:${product.phone}`}
                className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
                title="Call Farmer"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Quick Snapshot Bar */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Listed Price:</span>
            <span className="font-extrabold text-emerald-900 text-sm">
              ₹{product.price} {product.unit}
            </span>
          </div>

          <button
            onClick={() => setShowOfferInput(!showOfferInput)}
            className="text-xs font-bold text-amber-800 bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Tag className="w-3 h-3 text-amber-900" />
            <span>{t.negotiateOffer}</span>
          </button>
        </div>

        {/* Propose Offer Banner */}
        {showOfferInput && (
          <div className="bg-amber-50 p-3 border-b border-amber-200 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900">{t.proposePrice}:</span>
              <input
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="उदा. 3600"
                className="w-28 bg-white border border-amber-300 rounded-xl px-2.5 py-1 text-xs font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-xs font-bold text-slate-600">{product.unit}</span>
              <button
                onClick={handleSendBargainOffer}
                className="ml-auto px-3 py-1 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
              >
                Send Offer
              </button>
            </div>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'customer';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] text-slate-400 font-medium mb-1 px-1">
                  {msg.senderName} • {msg.timestamp}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium shadow-2xs leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  {msg.audioDuration ? (
                    <div className="flex items-center gap-3 py-1">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center cursor-pointer hover:bg-emerald-200"
                      >
                        {isPlayingAudio ? (
                          <Pause className="w-4 h-4 fill-emerald-800" />
                        ) : (
                          <Play className="w-4 h-4 fill-emerald-800 ml-0.5" />
                        )}
                      </button>
                      <div className="space-y-1">
                        <div className="font-bold text-xs text-emerald-900">
                          {t.voiceNoteText} ({msg.audioDuration})
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-3 bg-emerald-600 rounded-full animate-pulse" />
                          <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="w-1.5 h-2 bg-emerald-400 rounded-full" />
                          <span className="w-1.5 h-5 bg-emerald-600 rounded-full animate-pulse" />
                          <span className="w-1.5 h-3 bg-emerald-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    msg.text
                  )}

                  {msg.isOffer && (
                    <div className="mt-1 pt-1 border-t border-white/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Offer Proposed
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-200 px-3 py-2 rounded-2xl w-fit shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px] text-slate-500 font-semibold">
                {product.farmerName} is typing...
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Question Chips for Easy 1-Tap Rural Use */}
        <div className="bg-white px-3 py-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">
            {t.quickQuestions}
          </span>
          <button
            onClick={() => handleSendMessage(t.q1)}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold border border-slate-200 transition-colors shrink-0"
          >
            {t.q1}
          </button>
          <button
            onClick={() => handleSendMessage(t.q2)}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold border border-slate-200 transition-colors shrink-0"
          >
            {t.q2}
          </button>
          <button
            onClick={() => handleSendMessage(t.q3)}
            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold border border-slate-200 transition-colors shrink-0"
          >
            {t.q3}
          </button>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={t.typeMessagePlaceholder}
            className="flex-1 bg-slate-100 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-emerald-700/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
