// @ts-nocheck
import { useRef } from "react";
import { getSearchResults } from "../../services/getSearchResult";

type MetadataItem = {
  similarity: number;
  [key: string]: any; // Allows other properties
};

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
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsChatOpen: (isChatOpen: boolean) => void
): Promise<void> => {
  setIsChatOpen(false);
  setChatMessages([]); // clearing the chatbot results for fresh search results
  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  setLoading(true); // Show loader
  setError(null); // Reset error state

  try {
    await new Promise((resolve) => setTimeout(resolve, 2200)); 
    // const response = await getSearchResults(query, "search", sessionId);
    const response = {
      content: `When a customer comes to the branch for an Insta Debit Card, you should follow these steps:
      \n1.	Verify the Customer's Identity: Use Aadhaar biometric authentication for both managed and non-managed customers. If the customer agrees, initiate e-KYC biometric authentication through the e-KYC machine. Ensure the photograph and name on the e-KYC printout match the customer and the name in the system.
      \n2.	Exception Process: If biometric authentication cannot be carried out due to reasons like unrecognized fingerprints or a non-functional e-KYC machine, request the customer to produce an existing debit card or a cancelled cheque leaf. Verify the customer's ID proof against the original and certify it as 'Original Seen & Verified.
      \n3.	Issue the Insta Debit Card: Upon successful identification, issue the Insta Debit Card packet in a sealed condition to the customer in person. Ensure the customer submits the completed IDC application form available in the packet.
      \n4.	Complete the Process: Check the completeness of the form, carry out signature verification, and obtain the customer's acknowledgment on the Deliverables Delivery Register. 
      \n5.	Data Entry: IDC Custodian to input the details mentioned in Insta Debit Card Application for issuance in Flexcube under FC fast path CM01.
      \n6.	Authorization: The authorizer should review the application form, evidence the signature verification on the delivery register, and authorize the request FC.
      \n7.	End-of-Day Review: All processed IDC application forms should be reviewed/verified by an independent staff member for correctness against the BA009 report at the end of the day and filed separately. Branch to retain IDC Application along with supporting customer documents in day’s voucher
      \n8.	Activation Status: The IDC custodian should verify the activation status of the IDC through the Bulletin Board on the next working day and cure any rejects if necessary
      Following these steps will ensure that the process is handled smoothly and securely. `,
      metadata: [
        {
          page_no: 1,
          topic: "Debit Card",
          sub_topic: "Insta Debit Cards",
          section: "Customer Authentication",
          doc_url: "https://www.rbi.org.in/guidelines/AadharAuthentication",
          source: "Circular 323/2023 Process for Issuance of Insta Debit Cards at Branches : Revision of Guidelines.pdf"
        },
      ],
    };
    if (response) {
      setIsChatOpen(true);
      setSearchResults([
        {
          type: "text",
          title: "Search Result",
          content: response.content,
          // metadata: response.metadata
          //   .sort(
          //     (a: MetadataItem, b: MetadataItem) => b.similarity - a.similarity
          //   ) // Sort by similarity
          //   .slice(0, 5), // Show top 5 results
          metadata: response.metadata,
        },
      ]);
    } else {
      setError("No results found. Please try a different query.");
    }
  } catch (error) {
    console.log({ error });
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
