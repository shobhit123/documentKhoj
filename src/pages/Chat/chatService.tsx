// @ts-nocheck
import { useRef } from "react";
import { getSearchResults } from "../../services/getSearchResult";


type MetadataItem = {
  similarity: number;
  [key: string]: any; // Allows other properties
}

/**
 * Handles the api to execute based on user search
 * @param query the user query
 * @param sessionId the sessionId
 * @param setChatMessages state to set the chat messages based on chat api response
 * @param setSearchResults state to set the search api response
 * @param setLoading state to handle the loader
 * @param setError  state to handle the error
 * @returns null
 */
export const handleSearch = async (
  query: string,
  sessionId: string,
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<void> => {
  setChatMessages([]); // clearing the chatbot results for fresh search results
  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  setLoading(true); // Show loader
  setError(null); // Reset error state

  try {
    const response = await getSearchResults(query, "search", sessionId);
    if (response) {
      setSearchResults([
        {
          type: "text",
          title: "Search Result",
          content: response.content,
          metadata: response.metadata
            .sort(
              (a: MetadataItem, b: MetadataItem) => b.similarity - a.similarity
            ) // Sort by similarity
            .slice(0, 5), // Show top 5 results
        },
      ]);
    } else {
      setError("No results found. Please try a different query.");
    }
  } catch (error) {
    setError("An error occurred while fetching results. Please try again.");
  } finally {
    setLoading(false); // Hide loader
  }
};

/**
 * 
 * @param message {String} the message to interact with the bot
 * @returns {Object} the bot response
 */
export const fetchBotResponse = async (message: string, sessionId: string) => {
  try {
    const response = await getSearchResults(message, "chatbot", sessionId);
    return {
      botResponse: response.content,
      source: response?.metadata?.[0]?.doc_url ?? "-",
    }; // Return the bot's response
  } catch (error) {
    console.error("Error fetching bot response:", error);
    return {
      botResponse: "Sorry, I couldn't process your request.",
      source: "-",
    }; 
  }
};
