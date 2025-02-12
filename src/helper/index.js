
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