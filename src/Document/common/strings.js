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
    confirmation_restart_journey:"Are you sure you want to restart the journey? \n\nPlease note that doing so will erase all the details you have entered on this page.",
    confirmation_EditJourney:"Are you sure you want to edit the previously provided details? \n\nThis will allow you to reprocess your request with the updated information.",
    confirmation_generateJourney:'Are you sure you want to regenerate the question? \n\nThis will generate a new set of questions based on your inputs.',
    generatedQuestion: "Generated Questions",
  },
  hi: {
    title: "Q&A जनरेटर",
    description: "अपलोड किए गए दस्तावेज़ों के आधार पर Q&A जनरेट करें",
    version: "(संस्करण: 0.1.0)",
    documentDetails: "फाइल विवरण",
    fileName: "फाइल नाम *",
    pageLink: "संदर्भ लिंक *",
    summary: "फाइल सारांश *",
    numQA: "प्रश्नों की संख्या",
    generateQA: "Q&A जनरेट करें",
    formValidationMessage:
      "कृपया Q&A जनरेट करने से पहले सभी आवश्यक फ़ील्ड भरें।",
    uploadWarning: "कृपया इस क्रिया को सक्षम करने के लिए एक फाइल अपलोड करें।",
    uploadButton: "अपलोड करें",
    uploadedFile: "अपलोड की गई फाइल",
    invalidFileType:
      "अमान्य फाइल प्रकार। केवल PDF, DOCX, XLS, और CSV अनुमत हैं।",
    fileSizeExceeded: "फाइल का आकार 10MB सीमा से अधिक है।",
    selectFileFirst: "कृपया पहले एक फाइल चयनित करें।",
    uploadFailed: "अपलोड असफल",
    fileReadError: "फाइल को पढ़ने में विफल",
    previewNotAvailable: "पूर्वावलोकन उपलब्ध नहीं है",
    submit: "सबमिट करें",
    selectFile: "अपलोड करने के लिए फाइल चयनित करें",
    documentUploadSuccess: "फाइल सफलतापूर्वक अपलोड हो गई",
    uploading: "फाइल अपलोड हो रही है...",
    document_submitted_successfully:
      "आपकी प्रतिक्रिया के आधार पर फाइल सफलतापूर्वक सबमिट कर दी गई है।",
    something_went_wrong_to_upload: "फाइल अपलोड करते समय कुछ गलत हो गया।",
    pageLinkPlaceHolder:
      "इस फाइल से संबंधित संदर्भ लिंक दर्ज करें, जैसे: https://www.hdfcbank.com",
    fileNamePlaceholder: "यहां फाइल नाम दर्ज करें",
    summaryPlaceHolder:
      "यह दस्तावेज़ इसके सामग्री का एक अवलोकन या सारांश प्रदान करता है।",
    questionPlaceHolder:
      "चयनित फाइल के लिए आवश्यक प्रश्नों की संख्या दर्ज करें। (अधिकतम 100)",
    tagPlaceHolder: "टैग जोड़ने के लिए टाइप करें और Enter दबाएं",
    sureToDelete: "क्या आप वाकई इस Q&A को हटाना चाहते हैं?",
    addNewQnA_action: "नया Q&A जोड़ें",
    noQAgenerated:
      "अभी तक कोई Q&A उत्पन्न नहीं हुआ है। नीचे क्लिक करके एक नया Q&A जोड़ें।",
    answerLabel: "उत्तर:",
    sectionLabel: "विभाग:",
    referencesLabel: "संदर्भ:",
    editQA: "Q&A संपादित करें",
    addQA: "नया Q&A जोड़ें",
    questionLabel: "प्रश्न",
    answer: "उत्तर",
    pageNumber: "पृष्ठ संख्या",
    pageSection: "पृष्ठ अनुभाग",
    saveQA: "Q&A सहेजें",
    cancel: "रद्द करें",
    special_characters_not_Allowed: "टैग्स में विशेष वर्णों की अनुमति नहीं है।",
    questionAnswerRequired: "प्रश्न और उत्तर आवश्यक हैं!",
    selectedLanguage: "हिंदी",
    question_guidance: "प्रश्न मार्गदर्शन",
    question_guidancePlaceHolder:
      "संबंधित प्रश्न उत्पन्न करने के लिए कोई विशेष मार्गदर्शन या संदर्भ प्रदान करें।",
    processing_request:
      "कृपया प्रतीक्षा करें, आपका अनुरोध प्रोसेस किया जा रहा है...",
    restartJourney: "यात्रा को फिर से शुरू करें",
    editProvidedDetails: "प्रदान की गई जानकारी को संपादित करें",
    regenerateQA: "प्रश्नोत्तरी फिर से उत्पन्न करें",
    generatedQuestion: "Generated Questions",
  }
};

// Function to get strings based on the selected locale
export const getStrings = (locale) => {
  return locales[locale];
};
