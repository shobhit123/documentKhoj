import { generateQA } from "src/services/generateQA";
import { generateRealQA } from "src/helper";

type documentDataItem = {
  documentName: string;
  pageLink: string;
  summary: string;
  numQA: string;
  tags: string[];
  fileUploadResponse: { object_path: string; mimeType: string }; //todo check structure
  isDocumentUploaded: boolean;
  qaList: string[]; //todo: reconfirm the type
  question_guidance: string;
  topic: string;
  subTopic: string;
};

export const handleGenerateQA = async (
  documentData: documentDataItem,
  STRINGS: Record<string, string>,
  setLoading: (loading: boolean) => void,
  setExpanded: (expanded: boolean) => void,
  setDocumentData: (documentData: any) => void, //todo: check type
  setUpdatedDocument: (documentData: documentDataItem) => void
) => {
  const {
    documentName,
    summary,
    pageLink,
    fileUploadResponse,
    question_guidance,
    numQA,
    topic,
    subTopic,
  } = documentData;
  let missingFields = [];

  // Check for missing fields
  if (!documentName) missingFields.push("Document Name");
  if (!summary) missingFields.push("Summary");
  if (!pageLink) missingFields.push("Reference Link");
  if (!question_guidance) missingFields.push("Question Guidance");
  if (!topic) missingFields.push("Topic");
  if (!subTopic) missingFields.push("SubTopic");

  if (missingFields.length > 0) {
    const missingFieldsText = missingFields.join(", ");
    alert(
      `${STRINGS.formValidationMessage}: ${missingFieldsText} are required.`
    );
    return;
  }

  setLoading(true);
  const response = await generateQA(
    fileUploadResponse?.object_path,
    fileUploadResponse?.mimeType,
    question_guidance,
    numQA
  );

  if (response?.qna_response?.length) {
    const generatedQA = generateRealQA(response.qna_response);

    setTimeout(() => {
      setDocumentData((prevData:any) => { //todo: check type
        const updatedData  = { ...prevData, qaList: generatedQA };
        setUpdatedDocument(updatedData);
        return updatedData;
      });

      setLoading(false);
      setExpanded(false); // Collapse document section after generating questions
    }, 2000);
  }
};
