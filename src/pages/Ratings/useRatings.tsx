import { useState, useEffect } from "react";

interface RatingData {
  question: string;
  answer: string;
  page_no?: number;
  section_detail?: string;
  deep_links?: string[];
  tags?: string[];
  references?: string;
}

const mockData: RatingData[] = 
[
  {
      "question": "What is the minimum size for printed material using the HDFC Securities logo?",
      "answer": "The minimum size for all printed material is 35 mm wide (at 72dpi).",
      // "page_no": 7,
      // "section_detail": "LOGO SIZE & POSITIONING",
      // "deep_links": [],
      "tags": [
          "logo",
          "size",
          "print",
          "minimum size"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "What are the brand values of HDFC Securities?",
      "answer": "Integrity, Expertise, Purposeful, Progressive",
      // "page_no": 14,
      // "section_detail": "BRAND PERSONALITY",
      // "deep_links": [],
      "tags": [
          "brand",
          "values",
          "integrity",
          "expertise"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "What is the recommended font for Word and PowerPoint templates?",
      "answer": "Calibri (a Sans Serif typeface)",
      // "page_no": 11,
      // "section_detail": "TYPEFACE",
      // "deep_links": [],
      "tags": [
          "font",
          "Word",
          "PowerPoint",
          "Calibri"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "What is the tagline of HDFC Securities?",
      "answer": "Click. Invest. Grow.",
      // "page_no": 4,
      // "section_detail": "LOGO",
      // "deep_links": [],
      "tags": [
          "tagline",
          "HDFC Securities",
          "Click",
          "Invest",
          "Grow"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "What are the primary colours used in the HDFC Securities brand?",
      "answer": "HDFC Blue, HDFC Red, Pure Blue, and White.",
      // "page_no": 10,
      // "section_detail": "COLOUR PALETTE",
      // "deep_links": [],
      "tags": [
          "colours",
          "primary colours",
          "branding",
          "HDFC Securities"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "What are the guidelines for using the HDFC Securities logo in co-branding situations?",
      "answer": "In case of co-branding with other financial brands, make sure that the height of our channel partner's logo matches the height of our logo; with the width adjusted proportionately.",
      // "page_no": 8,
      // "section_detail": "LOGO CO-BRANDING",
      // "deep_links": [],
      "tags": [
          "co-branding",
          "logo",
          "guidelines",
          "financial brands"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  },
  {
      "question": "How does HDFC Securities describe its brand persona?",
      "answer": "Sincere, Honest, Unambiguous, Consumer-centric",
      // "page_no": 14,
      // "section_detail": "BRAND PERSONALITY",
      // "deep_links": [],
      "tags": [
          "brand",
          "persona",
          "personality",
          "consumer-centric"
      ],
      "references": "https://platform.openai.com/docs/gpt/model-reference/api/v4/guides/text-generation?utm_source=chatgpt&utm_medium=referral&utm_campaign=docs_link"
  }
]

export const useRatings = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [sourceGenuineness, setSourceGenuineness] = useState<{ [key: string]: number }>({});
  const [overallResponse, setOverallResponse] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  console.log({sourceGenuineness, overallResponse, ratings})

  const totalPages = Math.ceil(mockData.length / itemsPerPage); // Calculate total pages correctly

  const paginatedData = mockData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // const paginatedData = mockData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => () => {
    //todo:
    setDrawerOpen(open);
  };


  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRatingChange = (question: string, value: number | null) => {
    setRatings((prev) => ({ ...prev, [question]: value ?? 0 }));
  };

  const handleSourceGenuinenessChange = (question: string, value: number | null) => {
    setSourceGenuineness((prev) => ({ ...prev, [question]: value ?? 0 }));
  };

  const handleOverallResponseChange = (question: string, value: number | null) => {
    setOverallResponse((prev) => ({ ...prev, [question]: value ?? 0 }));
  };

  const handleSubmit = () => {
    console.log("Ratings Submitted:", { ratings, sourceGenuineness, overallResponse });
    setSnackbarOpen(true);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };


  return {
    paginatedData,
    ratings,
    sourceGenuineness,
    overallResponse,
    loading,
    snackbarOpen,
    page,
    handleRatingChange,
    handleSourceGenuinenessChange,
    handleOverallResponseChange,
    handleSubmit,
    handlePageChange,
    closeSnackbar,
    totalPages,
    drawerOpen,
    toggleDrawer
  };
};