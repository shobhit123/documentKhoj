interface QnaItem {
  question: string;
  answer: string;
  page_no: number;
  section_detail: string;
  deep_links?: string[];
  tags?: string[];
}

interface RealQA {
  question: string;
  answer: string;
  pageNumber: number;
  pageSection: string;
  references: string[];
  tags: string[];
}

export const generateRealQA = (qnaData: QnaItem[] = []): RealQA[] => {
  return qnaData.map((item, index) => ({
    question: item.question,
    answer: item.answer,
    pageNumber: item.page_no,
    pageSection: item.section_detail,
    references: item.deep_links?.length ? item.deep_links : [],
    tags: item.tags || [`Tag ${index + 1}`],
  }));
};

const metaData = [
  "Khoj Q&A Generator",
  "Generate Q&A based on uploaded documents",
  "(Version: 0.1.0)"
];

interface QAItem {
  question?: string;
  answer?: string;
  is_llm_generated?: boolean;
  pageSection?: string;
  pageNumber?: string;
  tags?: string[];
  references?: string[];
}

interface FileUploadResponse {
  object_path?: string;
  mimeType?: string;
}

interface InputData {
  summary?: string;
  documentName?: string;
  pageLink?: string;
  qaList?: QAItem[];
  fileUploadResponse?: FileUploadResponse;
  question_guidance?: string;
  topic?: string;
  subTopic?: string;
}

export const transformDataForApi = (inputData: InputData = {}) => {
  const {
    summary = "",
    documentName = "",
    pageLink = "",
    qaList = [],
    fileUploadResponse = {},
    question_guidance = "",
    topic = "",
    subTopic = ""
  } = inputData;

  return {
    summary,
    usecase_id: "f8a57d3a-d0fd-4261-b9d3-b1b02c4b54c1",
    doc_name: documentName,
    doc_url: pageLink,
    type_of_doc: "main-cms",
    question_context: question_guidance,
    doc_metadata: metaData,
    user_id: "9b0adf39-2b8b-4679-a0fd-b34803b6b6e2",
    questions: qaList.map((qa: QAItem = {}) => {
      const {
        question = "",
        answer = "",
        is_llm_generated = false,
        pageSection = "",
        pageNumber = "",
        tags = [],
        references = []
      } = qa;

      return {
        question,
        answer,
        is_llm_generated,
        section: pageSection,
        page_no: pageNumber,
        qna_metadata: tags,
        deep_links: references.length > 0 ? references : []
      };
    }),
    storage_path: fileUploadResponse?.object_path || "",
    mime_type: fileUploadResponse?.mimeType || "application/pdf",
    topic,
    sub_topic: subTopic
  };
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
