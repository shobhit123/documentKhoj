import { useState } from "react";

interface TableRowData {
  id: number;
  source: string;
  tags: string[];
  topic: string;
  subTopic: string;
}

const initialData: TableRowData[] = [
  {
    id: 6,
    source:
      "20250306 - 40 PDF documents → Banking - Compliance → RBI Digital Lending Guidelines.pdf",
    tags: ["Finance", "Banking", "Compliance"],
    topic: "Regulations",
    subTopic: "Digital Lending",
  },
  {
    id: 7,
    source:
      "20250306 - 25 Excel files → Banking - Customer Data → Loan Default Predictions.xlsx",
    tags: ["Banking", "AI", "Risk Analysis"],
    topic: "Predictive Analytics",
    subTopic: "Loan Defaults",
  },
  {
    id: 8,
    source:
      "20250307 - 18 PPT files → AI in Banking - Strategy → AI-driven Fraud Detection.pptx",
    tags: ["AI", "Fraud Prevention", "Banking"],
    topic: "Generative AI",
    subTopic: "Fraud Detection",
  },
  {
    id: 9,
    source:
      "20250307 - 30 PDF documents → Banking - Research Papers → AI & Credit Scoring.pdf",
    tags: ["AI", "Finance", "Banking"],
    topic: "Risk Assessment",
    subTopic: "Credit Scoring",
  },
  {
    id: 10,
    source:
      "20250308 - 20 PDF documents → Finance - Investment → AI-Powered Portfolio Management.pdf",
    tags: ["Investment", "AI", "Banking"],
    topic: "Wealth Management",
    subTopic: "AI Portfolio Advisory",
  },
  {
    id: 11,
    source:
      "20250308 - 15 Word documents → Banking - Policy → Open Banking Framework 2025.docx",
    tags: ["Banking", "Regulations", "Data Sharing"],
    topic: "Open Banking",
    subTopic: "API Integrations",
  },
  {
    id: 12,
    source:
      "20250309 - 12 PDF documents → Banking - Customer Service → AI Chatbots for Banks.pdf",
    tags: ["AI", "Customer Experience", "Automation"],
    topic: "Chatbots",
    subTopic: "Conversational AI",
  },
  {
    id: 13,
    source:
      "20250309 - 10 PPT files → GenAI - Finance → AI-Generated Financial Reports.pptx",
    tags: ["Finance", "Automation", "AI"],
    topic: "Generative AI",
    subTopic: "Automated Report Generation",
  },
  {
    id: 14,
    source:
      "20250310 - 8 Word documents → Banking - Security → AI & Cybersecurity in Banking.docx",
    tags: ["Cybersecurity", "Banking", "AI"],
    topic: "Threat Detection",
    subTopic: "AI-based Security Systems",
  },
  {
    id: 15,
    source:
      "20250310 - 22 PDF documents → GenAI - Risk Analysis → AI-Generated Risk Models.pdf",
    tags: ["AI", "Risk Management", "Banking"],
    topic: "Predictive AI",
    subTopic: "Risk Mitigation Strategies",
  }
];


type RatingsState = Record<number, number>; // Object where keys are numbers and values are ratings

const useTableData = () => {
  const [data, setData] = useState<TableRowData[]>(initialData);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<TableRowData | null>(null);

  const [rating, setRating] = useState<RatingsState>({});
  const [sourceGenuineness, setSourceGenuineness] = useState<RatingsState>({});
  const [overallResponse, setOverallResponse] = useState<RatingsState>({});

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => () => {
    setDrawerOpen(open);
  };

  const openModal = (row: TableRowData) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Source Genuineness:", sourceGenuineness);
    console.log("Overall Response:", overallResponse);
  };

  return {
    data,
    modalOpen,
    selectedRow,
    openModal,
    // closeModal,
    rating,
    setRating,
    sourceGenuineness,
    setSourceGenuineness,
    overallResponse,
    setOverallResponse,
    handleSubmit,
    drawerOpen,
    toggleDrawer,
  };
};

export default useTableData;
