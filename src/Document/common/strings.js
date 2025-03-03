const locales = {
  en: {
    title: "Q&A Generator",
    description: "Generate Q&A based on uploaded documents",
    version: "(Version: 0.1.0)",
    documentDetails: "File Details",
    fileName: "File Name *",
    pageLink: "Reference Link *",
    summary: "File Summary *",
    numQA: "Number of Questions",
    generateQA: "Generate Q&A",
    formValidationMessage:
      "Please fill all the required fields before generating Q&A.",
    uploadWarning: "Please upload a file to enable this action.",
    uploadButton: "Upload",
    uploadedFile: "Uploaded File",
    invalidFileType:
      "Invalid file type. Only PDF, DOCX, XLS, and CSV are allowed.",
    fileSizeExceeded: "File size exceeds the 10MB limit.",
    selectFileFirst: "Please select a file first.",
    uploadFailed: "Upload failed",
    fileReadError: "Failed to read the file.",
    previewNotAvailable: "Preview not available",
    submit: "Submit",
    selectFile: "Select File to Upload",
    documentUploadSuccess: "File uploaded successfully",
    uploading: "Uploading File...",
    document_submitted_successfully:
      "File has been successfully submitted based on your feedback.",
    something_went_wrong_to_upload:
      "Something went wrong while uploading the file.",
    pageLinkPlaceHolder:
      "Enter a reference link related to this file, e.g., https://www.hdfcbank.com",
    fileNamePlaceholder: "Enter file name here",
    summaryPlaceHolder:
      "The document provides an overview or summary of its content.",
    questionPlaceHolder:
      "Enter the number of questions required for the selected file. (Max. 100)",
    tagPlaceHolder: "Type and press Enter to add a tag",
    sureToDelete: "Are you sure you want to delete this Q&A?",
    addNewQnA_action: "Add New Q&A",
    noQAgenerated: "No Q&A generated yet. Click below to add a new Q&A.",
    answerLabel: "Answer:",
    sectionLabel: "Section:",
    referencesLabel: "References:",
    editQA: "Edit Q&A",
    addQA: "Add New Q&A",
    questionLabel: "Question",
    answer: "Answer",
    pageNumber: "Page Number",
    pageSection: "Page Section",
    saveQA: "Save Q&A",
    cancel: "Cancel",
    special_characters_not_Allowed:
      "Special characters are not allowed in tags.",
    questionAnswerRequired: "Question and Answer are required!",
    selectedLanguage: "English",
    question_guidance: "Question Guidance",
    question_guidancePlaceHolder:
      "Provide any specific guidance or context to generate relevant questions.",
    processing_request: "Please wait, processing your request...",
    restartJourney: "ReStart the Journey",
    editProvidedDetails: "Edit the provided Details",
    regenerateQA: "ReGenerate Q&A",
    confirmation_restart_journey:
      "Are you sure you want to restart the journey? \n\nPlease note that doing so will erase all the details you have entered on this page.",
    confirmation_EditJourney:
      "Are you sure you want to edit the previously provided details? \n\nThis will allow you to reprocess your request with the updated information.",
    confirmation_generateJourney:
      "Are you sure you want to regenerate the question? \n\nThis will generate a new set of questions based on your inputs.",
    generatedQuestion: "Generated Questions",
    referencesLabel: "Add Reference",
    add: "Add",
    somethingWentWrong:
      "Something went wrong! \nPlease reUpload the file again.",
      chatWithUs: 'Chat with us...'
  },
  hi: {
    title: "प्रश्न-उत्तर जनरेटर",
    description:
      "अपलोड किए गए दस्तावेज़ों के आधार पर प्रश्न-उत्तर उत्पन्न करें",
    version: "(संस्करण: 0.1.0)",
    documentDetails: "फ़ाइल विवरण",
    fileName: "फ़ाइल नाम *",
    pageLink: "संदर्भ लिंक *",
    summary: "फ़ाइल सारांश *",
    numQA: "प्रश्नों की संख्या",
    generateQA: "प्रश्न-उत्तर उत्पन्न करें",
    formValidationMessage:
      "कृपया प्रश्न-उत्तर उत्पन्न करने से पहले सभी आवश्यक फ़ील्ड भरें।",
    uploadWarning: "कृपया इस क्रिया को सक्षम करने के लिए एक फ़ाइल अपलोड करें।",
    uploadButton: "अपलोड करें",
    uploadedFile: "अपलोड की गई फ़ाइल",
    invalidFileType:
      "अमान्य फ़ाइल प्रकार। केवल PDF, DOCX, XLS, और CSV अनुमत हैं।",
    fileSizeExceeded: "फ़ाइल का आकार 10MB सीमा से अधिक है।",
    selectFileFirst: "कृपया पहले एक फ़ाइल चुनें।",
    uploadFailed: "अपलोड विफल",
    fileReadError: "फ़ाइल पढ़ने में असफल।",
    previewNotAvailable: "पूर्वावलोकन उपलब्ध नहीं है",
    submit: "सबमिट करें",
    selectFile: "अपलोड करने के लिए फ़ाइल चुनें",
    documentUploadSuccess: "फ़ाइल सफलतापूर्वक अपलोड हो गई",
    uploading: "फ़ाइल अपलोड हो रही है...",
    document_submitted_successfully:
      "आपकी प्रतिक्रिया के आधार पर फ़ाइल सफलतापूर्वक सबमिट कर दी गई है।",
    something_went_wrong_to_upload: "फ़ाइल अपलोड करते समय कुछ गड़बड़ हो गई।",
    pageLinkPlaceHolder:
      "इस फ़ाइल से संबंधित एक संदर्भ लिंक दर्ज करें, जैसे https://www.hdfcbank.com",
    fileNamePlaceholder: "यहाँ फ़ाइल नाम दर्ज करें",
    summaryPlaceHolder:
      "दस्तावेज़ इसकी सामग्री का अवलोकन या सारांश प्रदान करता है।",
    questionPlaceHolder:
      "चयनित फ़ाइल के लिए आवश्यक प्रश्नों की संख्या दर्ज करें। (अधिकतम 100)",
    tagPlaceHolder: "टाइप करें और टैग जोड़ने के लिए एंटर दबाएँ",
    sureToDelete: "क्या आप वाकई इस प्रश्न-उत्तर को हटाना चाहते हैं?",
    addNewQnA_action: "नया प्रश्न-उत्तर जोड़ें",
    noQAgenerated:
      "कोई प्रश्न-उत्तर अभी तक उत्पन्न नहीं हुआ। नीचे क्लिक करके नया जोड़ें।",
    answerLabel: "उत्तर:",
    sectionLabel: "अनुभाग:",
    referencesLabel: "संदर्भ:",
    editQA: "प्रश्न-उत्तर संपादित करें",
    addQA: "नया प्रश्न-उत्तर जोड़ें",
    questionLabel: "प्रश्न",
    answer: "उत्तर",
    pageNumber: "पृष्ठ संख्या",
    pageSection: "पृष्ठ अनुभाग",
    saveQA: "प्रश्न-उत्तर सहेजें",
    cancel: "रद्द करें",
    special_characters_not_Allowed: "टैग में विशेष अक्षर की अनुमति नहीं है।",
    questionAnswerRequired: "प्रश्न और उत्तर आवश्यक हैं!",
    selectedLanguage: "हिन्दी",
    question_guidance: "प्रश्न मार्गदर्शन",
    question_guidancePlaceHolder:
      "प्रासंगिक प्रश्न उत्पन्न करने के लिए कोई विशिष्ट मार्गदर्शन या संदर्भ प्रदान करें।",
    processing_request:
      "कृपया प्रतीक्षा करें, आपका अनुरोध संसाधित किया जा रहा है...",
    restartJourney: "यात्रा पुनः प्रारंभ करें",
    editProvidedDetails: "प्रदान किए गए विवरण संपादित करें",
    regenerateQA: "प्रश्न-उत्तर पुनः उत्पन्न करें",
    confirmation_restart_journey:
      "क्या आप वाकई यात्रा को पुनः प्रारंभ करना चाहते हैं? \n\nकृपया ध्यान दें कि ऐसा करने से इस पृष्ठ पर दर्ज किए गए सभी विवरण मिट जाएंगे।",
    confirmation_EditJourney:
      "क्या आप वाकई पहले से प्रदान किए गए विवरणों को संपादित करना चाहते हैं? \n\nयह आपको अद्यतन जानकारी के साथ अपने अनुरोध को पुनः संसाधित करने की अनुमति देगा।",
    confirmation_generateJourney:
      "क्या आप वाकई प्रश्नों को पुनः उत्पन्न करना चाहते हैं? \n\nयह आपके इनपुट के आधार पर एक नया प्रश्न सेट उत्पन्न करेगा।",
    generatedQuestion: "उत्पन्न प्रश्न",
    referencesLabel: "संदर्भ जोड़ें",
    add: "जोड़ें",
    somethingWentWrong: "कुछ गलत हो गया! \nकृपया फ़ाइल को पुनः अपलोड करें।",
    chatWithUs: 'Chat with us...'
  }
};

// Function to get strings based on the selected locale
export const getStrings = (locale) => {
  return locales[locale];
};
