export const generateRealQA = (qnaData) => {
  return qnaData?.map((item, index) => ({
    question: item.question,
    answer: item.answer,
    pageNumber: item.page_no,
    pageSection: item.section_detail,
    references: item.deep_links.length ? item.deep_links : [`Ref ${index + 1}`],
    tags: item.tags || [`Tag ${index + 1}`]
  }));
};

export const transformDataForApi = (inputData) => {
  return {
    summary: inputData.summary,
    usecase_id: "9b0adf39-2b8b-4679-a0fd-b34803b6b6e2",
    doc_name: inputData.documentName,
    doc_url: "http://example.com/abc.pdf",
    type_of_doc: "main-cms",
    doc_metadata: {
      tag: "a",
      tag: "b",
      tag: "c"
    },
    user_id: "f8a57d3a-d0fd-4261-b9d3-b1b02c4b54c1",
    questions: inputData.qaList.map((qa) => ({
      question: qa.question,
      answer: qa.answer,
      is_llm_generated: true,
      section: qa.pageSection,
      page_no: qa.pageNumber,
      qna_metadata: {
      info: qa.tags?.join(", ") || ""
        // "tags": [
        //         "RDG Account",
        //         "Government Securities",
        //         "Primary Market",
        //         "Secondary Market"
        //     ]
      },
      deep_links: qa.references?.length ? { url: qa.references?.[0] } : {}
      // deep_links: {
      //   url: 'a',
      //   url: 'b'
      // }
    })),
    storage_path: inputData.fileUploadResponse?.object_path || "",
    mime_type: inputData.fileUploadResponse?.mimeType || "application/pdf"
  };
};
