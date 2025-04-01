import { useState, useRef } from 'react';
import { getStrings } from 'src/helper/strings';
import { useLanguage } from 'src/providers/language/languageContext';
import { generateSessionId } from "../../helper";
import { fetchBotResponse } from './chatService';


type ChatMessage = {
    text: string;
    isUser: boolean;
    source?: string | undefined;
  };
  
  type SearchResult = {
    type: string,
    title: string,
    content: string,
    metadata: string
  }
  
  type ChatError = string | null ;

const useChatHook = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [showFullText, setShowFullText] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState<ChatError>(null); // Error state
    const [chatLoading, setChatLoading] = useState(false); // Loading state for chatbot
    // const STRINGS = getStrings("en"); //ToDo: Will map this in future with actual locale
    const { language} = useLanguage()

    const STRINGS = getStrings(language)
    const sessionId = useRef(generateSessionId()).current;

    // Handle chat send
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    const userMessage = { text: chatInput, isUser: true };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput("");
    const { botResponse, source } = await fetchBotResponse(chatInput, sessionId);
    setChatMessages((prev) => [
      ...prev,
      { text: botResponse, isUser: false, source },
    ]);
    setChatLoading(false);
  };

  // Reset search and chat
  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsChatOpen(false);
    setChatMessages([]);
    setError(null); // Clear any errors
  };


    return {
        searchResults,
        handleChatSend,
        resetSearch,
        showFullText,
        setShowFullText,
        STRINGS,
        searchQuery,
        sessionId,
        setChatMessages,
        setSearchResults,
        setLoading,
        setError,
        setSearchQuery,
        loading,
        error,
        isChatOpen,
        setIsChatOpen,
        chatMessages,
        chatLoading,
        chatInput,
        setChatInput,
    }
};

export default useChatHook;
