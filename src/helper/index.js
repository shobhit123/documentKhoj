
export const generateMockQA = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    question: `Sample Question ${index + 1}`,
    answer: `Sample Answer ${index + 1}`,
    pageNumber: index + 1,
    pageSection: `Section ${index + 1}`,
    references: [`Ref ${index + 1}`],
    tags: [`Tag ${index + 1}`]
  }));
};