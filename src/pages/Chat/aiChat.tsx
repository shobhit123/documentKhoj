import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Define types
interface ChatEntry {
  query: string;
  response: string;
  source?: string;
}

// Mock responses with sources
const mockResponses: Record<
  string,
  string
  // { response: string; nextQuestions: string[]; source?: string }
> = {
  //   "How to establish customer identity through other modes?": {
  //     response: `To establish customer identification through other modes for Insta Debit Card issuance, there are specific steps to follow when biometric authentication is not possible. This could be due to reasons such as the customer's fingerprint not being recognized, the e-KYC machine not working, or the customer not agreeing to biometric verification.

  // - In such cases, the customer should be requested to produce either their existing debit card or a cancelled cheque leaf from the account linked to the existing card or the account where the Insta Debit Card is to be issued.

  // - If the customer cannot provide either, the Insta Debit Card cannot be issued.

  // - Additionally, a copy of an Officially Valid Document (OVD) must be obtained from the customer and verified against the original. The copy should be certified as 'Original Seen & Verified'.

  // - If the customer provides an existing debit card, the branch must confirm that the card is linked to the same account where the new Insta Debit Card is to be issued.

  // - After confirming the details, the debit card should be returned to the customer, and they should be requested to hotlist their existing debit card immediately.

  // Would you like more details on any specific part of the process?
  // `,
  //     nextQuestions: [
  //       "Do you need next steps if the customer provides an existing debit card?",
  //       "Are you looking for next steps if customer provides a cancelled cheque?",
  //     ],
  //     source: "https://www.rbi.org.in/guidelines/AadharAuthentication",
  //   },
  //   "How do I complete Aadhar Biometric Authentication?": {
  //     response: `When a customer comes to the branch for an Insta Debit Card, you should follow these steps:

  // 1. **Verify the Customer's Identity**
  //    - Use Aadhaar biometric authentication for both managed and non-managed customers.
  //    - If the customer agrees, initiate e-KYC biometric authentication through the e-KYC machine.
  //    - Ensure the photograph and name on the e-KYC printout match the customer and the name in the system.

  // 2. **Exception Process**
  //    - If biometric authentication cannot be carried out due to reasons like unrecognized fingerprints or a non-functional e-KYC machine:
  //      - Request the customer to produce an existing debit card or a cancelled cheque leaf.
  //      - Verify the customer's ID proof against the original and certify it as *"Original Seen & Verified."*

  // 3. **Issue the Insta Debit Card**
  //    - Upon successful identification, issue the Insta Debit Card packet in a sealed condition to the customer in person.
  //    - Ensure the customer submits the completed IDC application form available in the packet.

  // 4. **Complete the Process**
  //    - Check the completeness of the form.
  //    - Carry out signature verification.
  //    - Obtain the customer's acknowledgment on the Deliverables Delivery Register.

  // 5. **Data Entry**
  //    - The IDC Custodian should input the details mentioned in the Insta Debit Card Application for issuance in **Flexcube under FC fast path CM01**.

  // 6. **Authorization**
  //    - The authorizer should review the application form, evidence the signature verification on the delivery register, and authorize the request in **FC**.

  // 7. **End-of-Day Review**
  //    - All processed IDC application forms should be reviewed/verified by an independent staff member for correctness against the **BA009 report** at the end of the day.
  //    - These forms should be filed separately.
  //    - The branch should retain the IDC Application along with supporting customer documents in the day’s voucher.

  // 8. **Activation Status**
  //    - The IDC custodian should verify the activation status of the IDC through the **Bulletin Board** on the next working day.
  //    - If necessary, they should cure any rejects.

  // Following these steps will ensure that the process is handled smoothly and securely.

  // `,
  //     nextQuestions: [
  //       "How do I complete Aadhar Biometric Authentication?",
  //       "How to establish customer identity through other modes?",
  //     ],
  //     source: "https://www.rbi.org.in/guidelines/AadharAuthentication",
  //   },
  //   "Do you need next steps if the customer provides an existing debit card?": {
  //     response: `If a customer provides an existing debit card, here are the next steps to be followed:

  // 1. The branch needs to check and confirm that the debit card provided by the customer is linked to the same account for which the new Insta Debit Card is to be issued. Once confirmed, the debit card should be returned to the customer.**

  // 2. The customer should be requested to hotlist their existing debit card immediately as per the existing process.

  // 3. Branch to retain copy of front side of the existing card and attach the same to the Insta Debit Card application form. (Please note copy of back side of the existing card is not to be taken). Branch to annotate “Original card sighted” on the copy of existing card.

  // 4. Customer to provide declaration confirming an upgrade/reissuance request of existing card, and signature on declaration to match as per Bank’s records (Annexure – I).

  // 5. Application form along with copy of front side of the existing card and Annexure – I to be filed with IDC application form.

  // If you need any further assistance or details, feel free to ask!
  // `,
  //     nextQuestions: [
  //       "Do you require format for Annexure I?",
  //       "Would you like to know the process if customer chooses a debit card upgrade?",
  //     ],
  //   },
  //   "Do you require format for Annexure I?":{
  //     response: `The Annexure I format for the issuance of Insta Debit Cards is available in the document titled 323_2023_Process for Issuance of Insta Debit Card at Branches. Refer Page # 4`,
  //     nextQuestions:['']
  //   }
  "Customer has shared the account number and death certificate": "Validate the Account number from the Flexcube system and check if nomination is updated & Account has any Linkage.",
  "Where should I check for nomination": "You have to use the Flexcube fastpath BA525",
  "Account linkage?":"Use the Flexcube fastpath CH021. Also check for mode of operation in the account.",
  "Nomination is updated, mode of operation is single and no-Account linkage. What should bedone?": `Yes, I will help you with the next steps:
1. Ensure that Date of Nomination updated is prior to the date of death of the a/c holder
2. If date of nomination is after the date of death, BM to approve these claims in case:
- a. Nomination is updated in the account/ deposit after the date of death of account holder & there was no nominee in the account prior to that, branch to follow the No Nomination based claim process.
- b. Nomination is updated in the account/ deposit after the date of death of account holder but there was already a nominee registered in the account, Branch to process the claim in favour of the nominee updated in the account prior to this change.Documentation as per nomination-based claim to be used. 
If the nominee, previously updated, has expired then Branch will follow No Nomination based claim through fast track or legal representation as the case may be.`,
  "Nomination updation was done before date of death" : "Is the nominee in the account is same, the person who has intimated the death of the customer?",
  "No, nominee is the spouse and the intimation is received from the son of the deceased":  `You need to follow the below mentioned process:
1. The Customer ID must be flagged off as deceased in CIM32 by maintaining the date of death.
2. Intimation to Nominee (as per Annexure 14) to be sent by branch.
3. All claims to be reported in RBB portal on date of intimation. Once complete set of documents are received from the nominee the same should be settled within 15 days.`,
  "What documents should be collected from customer?": `Yes, below are the list of documents to be collected for nomination based death claim:
1. Original/Certified Copy of Death Certificate
2. Officially Valid Document of Claimant
3. Annexure 17 - Claim Application from Nominee
4. Annexure 18 - Declaration from the Appointee of a Minor Nominee
5. Annexure 23 - Receipt6. Account Closure Form Approval Grid:
- BM approval mandatory irrespective of amount. If you need any further assistance, feel free to ask.`,
  "Can you give me the steps to be followed after collecting document?" : `Certainly! you need to scrutinize the documents collected:
1. Check all the documents are collected
2. Original Death Certificate to ensure that the same is genuine and issued by appropriate authority.
3. Nominee has been properly identified to the bank's satisfaction. The OVD furnished by theclaimant(s) must be acceptable to the bank and adequate. The signature must be done in front ofthe Bank staff.
4. Documents received from nominee(s) to ensure that they are in order in all respects and thenomination is in force. In case the Nominee is a minor, documents are required to be signed by theappointee.
5. Branch should check date of nominee addition in the deceased’s account, which should be beforethe date of death of account holder.
6. Cross-check the details mentioned in the claim documents with noting’s in the to ensure theircorrectness.
7. There are no dues from the deceased and the deposits claimed are free from any lien or charge.
8. Branch Manager should ensure that there are no attachment orders pertaining to the relationship(s) of the deceased constituent(s).`,
  "What should we do post checking the documents?": `You have to process the claim settlement and pay to the nominee: Payment to nominee:
1. Account(s) of the deceased should be closed in normal manner keeping in view guidelines indicated.
2. Payment to nominee should be made by credit to his/their account(s) with the bank or by an account payee 'Not Negotiable Crossed' Manager's Cheque/Demand Draft if no account ismaintained with the bank and to be issued in the format "Bank Name - Claimant Name -Account Number". 
Alternatively, the settlement amount can be transferred to the accountof the nominee’s account in another bank via RTGS /NEFT.
3. A signature from the claimant acknowledging receipt of funds will be obtained on the claim application form. (Annexure 23)
4.In case the Nominee is a minor, while appointee can sign the required documentation,payment is to be made in favor of the Minor u/g natural guardian.`
};

// Initial set of questions
const initialQuestions = [
  "How do I complete Aadhar Biometric Authentication?",
  "How to establish customer identity through other modes?",
];

type AIChatProps = {
  setChatLoading: (chatLoad: boolean) => void;
  triggerQuery: string | null;
};

const AIChat: React.FC<AIChatProps> = ({ setChatLoading, triggerQuery }) => {
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingQuery, setLoadingQuery] = useState<string | null>(null);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  const verifiedStamp = require("../../assets/verified-icon.png");
  const amberStamp = require("../../assets/amber-stamp.png");
  const aiStamp = require("../../assets/ai-stamp.png");
  const redStamp = require("../../assets/red-stamp.png");

  useEffect(() => {
    if (triggerQuery) {
      handleQuery(triggerQuery);
    }
  }, [triggerQuery]);

  // useEffect(() => {
  //   setChatLoading(true);
  //   setTimeout(() => {
  //     setSuggestions(initialQuestions);
  //     setChatLoading(false);
  //   }, 3000);
  // }, []);

  const handleQuery = async (newQuery: string) => {
    setLoadingQuery(newQuery);
    setChatLoading(true);

    setChatHistory((prev) => [...prev, { query: newQuery, response: "" }]);

    setTimeout(() => {
      const result =
        // mockResponses[newQuery] || mockResponses[initialQuestions[0]]; // Default to first question
        mockResponses[newQuery];

      setChatHistory((prev) =>
        prev.map((entry) =>
          entry.query === newQuery
            ? // ? { ...entry, response: result.response, source: result.source }
              { ...entry, response: result }
            : entry
        )
      );

      // setSuggestions(result.nextQuestions);
      setLoadingQuery(null);
      setChatLoading(false);
    }, 2000);
  };

  // Auto-scroll to latest response
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [chatHistory]);

  return (
    <Stack
      spacing={2}
      sx={{
        mt: 2,
        maxWidth: "600px",
        margin: "auto",
        overflowY: "auto",
        maxHeight: "80vh",
        padding: "24px",
      }}
    >
      {chatHistory.map((entry, index) => (
        <Stack
          key={index}
          spacing={1}
          direction="column"
          ref={index === chatHistory.length - 1 ? latestMessageRef : null}
        >
          {/* User query */}
          <Card
            variant="outlined"
            sx={{
              alignSelf: "flex-end",
              borderRadius: "12px",
              padding: "12px 20px",
              color: "black",
              background: "#d9fdd3",
            }}
          >
            <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
              <Typography
                variant="body1"
                align="left"
                sx={{ fontSize: "14px", pb: "0px !important" }}
              >
                {entry.query}
              </Typography>
            </CardContent>
          </Card>

          {/* AI Response or Skeleton Loader */}
          {entry.response === "" ? (
            <Stack
              spacing={1}
              sx={{
                textAlign: "initial",
                alignSelf: "flex-start",
                width: "300px",
              }}
            >
              <Skeleton variant="text" width={250} height={20} />
              <Skeleton variant="text" width={200} height={20} />
              <Skeleton variant="text" width={220} height={20} />
            </Stack>
          ) : (
            <Stack
              sx={{
                alignSelf: "flex-start",
                padding: "8px",
                borderRadius: "12px",
                lineHeight: "1.4",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              {/* Verified Stamp (Right) */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <img
                  src={index === 3 ? amberStamp : index === 5 ? redStamp: verifiedStamp}
                  alt="Verified"
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                />
              </Box>
              {/* Response Text */}
              <Box
                sx={{
                  fontSize: "14px",
                  textAlign: 'left !important',
                  border: "1px solid grey",
                  padding: "12px 20px",
                  marginTop: 2,
                  borderRadius: 4,
                  bgcolor: "#f5f5dc",
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p style={{ margin: '0px', textAlign:'left'}}>
                        {children}
                      </p>
                    ),
                  }}
                >
                  {entry.response}
                </ReactMarkdown>
              </Box>

              {/* Verified Icon on Next Line, Right-Aligned */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                {/* Like/Dislike Buttons (Left) */}
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton sx={{ p: 0.5 }}>
                    <ThumbUpAltIcon fontSize="small" />
                  </IconButton>
                  <IconButton sx={{ p: 0.5 }}>
                    <ThumbDownAltIcon fontSize="small" />
                  </IconButton>
                  <IconButton sx={{ p: 0.5 }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Stack>
          )}
        </Stack>
      ))}

      {/* Show leading questions */}
      {loadingQuery === null && suggestions.length > 0 && (
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                textTransform: "none",
                fontSize: "12px",
                borderRadius: "10px",
                bgcolor: "#455172",
                alignSelf: "flex-end",
              }}
              onClick={() => handleQuery(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default AIChat;
