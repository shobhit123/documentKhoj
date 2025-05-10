import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStrings } from "src/helper/strings";
import { useLanguage } from "src/providers/language/languageContext";
import { submitDocument } from "src/services/submitDocument";

const useDocumentUploadHook = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => () => {
    //todo:
    setDrawerOpen(open);
  };

  const [documentData, setDocumentData] = useState({
    documentName: "",
    pageLink: "",
    summary: "",
    numQA: "",
    tags: [],
    fileUploadResponse: { object_path: "", mimeType: "" }, //todo check structure
    isDocumentUploaded: false,
    qaList: [],
    question_guidance: "",
    topic: "",
    subTopic: "",
  });

  const navigate = useNavigate();
  const [updatedDocument, setUpdatedDocument] = useState<any>(
    documentData || {}
  ); //todo: check type
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showPDF, setShowPDF] = useState(false);
  const [isLocale, setIsLocale] = useState<"en" | "hi">("en");
  const [isToggleOn, setIsToggleOff] = useState(false);
  const [isAddNewQuestionSelected, setIsAddNewQuestionSelected] =
    useState(false);
  const [accordionExpanded, setAccordionExpanded] = useState(false)

  const toggleLanguage = () => {
    if (isLocale === "en") {
      setIsLocale("hi");
    } else {
      setIsLocale("en");
    }
    setIsToggleOff(!isToggleOn);
  };

  // const STRINGS = getStrings(isLocale);
  const { language} = useLanguage()

    const STRINGS = getStrings(language)

  const handleUploadSuccess = (response: any, fileType: any) => {
    //todo: refactor types
    setDocumentData((prevData: any) => ({
      ...prevData,
      fileUploadResponse: {
        object_path: response?.object_path,
        mimeType: fileType,
      },
      isDocumentUploaded: true,
    }));
  };

  const handleChange = (field: string, value: string | number) => {
    setDocumentData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleTagsChange = (newTags: any) => {
    //todo: refactor types
    setDocumentData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleQAListChange = (type: any, newTags: any, qnaList: any) => {
    //todo: refactor types
    if (type === "TAG") {
      setUpdatedDocument({
        ...documentData,
        tags: newTags,
      });
    } else if (type === "REF") {
      setUpdatedDocument({
        ...documentData,
        qaList: qnaList,
      });
    } else if (type === "QA_LIST") {
      setTimeout(() => {
        setDocumentData((prevData) => {
          const updatedData = { ...prevData, qaList: qnaList };
          setUpdatedDocument(updatedData);
          return updatedData;
        });
      });
    } else {
      setUpdatedDocument({
        ...documentData,
        qaList: qnaList,
      });
    }
  };

  const handleOnSubmit = async () => {
    setLoading(true); // Show loader
    try {
      const response = await submitDocument(updatedDocument);
      if (response?.status === "success") {
        // Check status instead of record_id
        setDocumentData({
          documentName: "",
          pageLink: "",
          summary: "",
          numQA: "",
          tags: [],
          fileUploadResponse: { object_path: "", mimeType: "" }, // todo : was set to null check once with Sh
          isDocumentUploaded: false,
          qaList: [],
          question_guidance: "",
          topic: "",
          subTopic: "",
        });

        alert(STRINGS.document_submitted_successfully);
        window.location.reload(); // Reload page on success
      } else {
        alert(STRINGS.something_went_wrong);
      }
    } catch (error) {
      alert(STRINGS.something_went_wrong);
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };

  const handleOnAddNewQuestionClick = (state: any) => {
    //todo: debug and update the type
    setIsAddNewQuestionSelected(state);
  };

  return {
    drawerOpen,
    setDrawerOpen,
    toggleDrawer,
    navigate,
    loading,
    expanded,
    setExpanded,
    showPDF,
    setShowPDF,
    isAddNewQuestionSelected,
    toggleLanguage,
    handleUploadSuccess,
    handleChange,
    handleTagsChange,
    handleQAListChange,
    handleOnSubmit,
    handleOnAddNewQuestionClick,
    STRINGS,
    documentData,
    setDocumentData,
    setLoading,
    setUpdatedDocument,
    isToggleOn,
    setAccordionExpanded,
    accordionExpanded
  }
};

export default useDocumentUploadHook;
