import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import "./index.css";
import { InfoOutlined } from "@mui/icons-material";
import withLayout from "src/providers/hoc/withLayout";

const initialRows = [
  {
    slNo: 1,
    topic: "Banking",
    subTopic: "Account Types",
    question: "What is a savings account?",
    response:
      "A savings account is a deposit account that allows limited transactions while earning interest.",
    reference: "RBI Banking Guidelines 2024",
    dateTime: "2025-03-26 09:30 AM",
    queriedBy: "Amit Sharma",
    ratedBy: "Priya Verma",
    attemptNumber: 1,
    responseFeedback: "Concise and correct explanation.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "A savings account helps individuals save money while earning interest.",
    devComments: "Well-structured response.",
  },
  {
    slNo: 2,
    topic: "Banking",
    subTopic: "Digital Payments",
    question: "What is UPI?",
    response:
      "Unified Payments Interface (UPI) enables real-time bank-to-bank transfers using a mobile app.",
    reference: "NPCI UPI Guidelines 2024",
    dateTime: "2025-03-26 10:00 AM",
    queriedBy: "Rahul Gupta",
    ratedBy: "Sneha Mukherjee",
    attemptNumber: 1,
    responseFeedback: "Clear and concise explanation.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "UPI is a real-time payment system developed by NPCI that facilitates instant money transfers.",
    devComments: "Good clarity and accuracy.",
  },
  {
    slNo: 3,
    topic: "Banking",
    subTopic: "Loans",
    question: "What is the difference between secured and unsecured loans?",
    response:
      "Secured loans require collateral, whereas unsecured loans do not.",
    reference: "RBI Loan Regulations 2024",
    dateTime: "2025-03-26 10:30 AM",
    queriedBy: "Vikram Singh",
    ratedBy: "Anjali Nair",
    attemptNumber: 1,
    responseFeedback: "Explanation is correct but could have more details.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "Secured loans are backed by collateral like property, while unsecured loans rely on creditworthiness.",
    devComments: "Consider providing an example.",
  },
  {
    slNo: 4,
    topic: "Banking",
    subTopic: "Investment",
    question: "What is a fixed deposit?",
    response:
      "A fixed deposit is a savings instrument where money is deposited for a fixed tenure at a guaranteed interest rate.",
    reference: "Bank FD Schemes 2024",
    dateTime: "2025-03-26 11:00 AM",
    queriedBy: "Ramesh Iyer",
    ratedBy: "Neha Pandey",
    attemptNumber: 1,
    responseFeedback:
      "Correct but could mention premature withdrawal conditions.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "A fixed deposit (FD) locks funds for a set period with a predetermined interest rate.",
    devComments: "Good response, consider adding lock-in details.",
  },
  {
    slNo: 5,
    topic: "Banking",
    subTopic: "Fraud Prevention",
    question: "What is two-factor authentication (2FA)?",
    response:
      "Two-factor authentication is a security process requiring two different forms of verification.",
    reference: "RBI Cybersecurity Guidelines",
    dateTime: "2025-03-26 11:30 AM",
    queriedBy: "Karan Mehta",
    ratedBy: "Pooja Reddy",
    attemptNumber: 1,
    responseFeedback: "Accurate and relevant answer.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "2FA enhances security by requiring a password and an OTP or biometric verification.",
    devComments: "Well-explained, no changes needed.",
  },
  {
    slNo: 6,
    topic: "Banking",
    subTopic: "Credit Score",
    question: "How is a credit score calculated?",
    response:
      "A credit score is calculated based on payment history, credit utilization, and credit mix.",
    reference: "CIBIL Guidelines 2024",
    dateTime: "2025-03-26 12:00 PM",
    queriedBy: "Deepak Rao",
    ratedBy: "Meera Kapoor",
    attemptNumber: 1,
    responseFeedback: "Comprehensive and well-explained.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "A credit score considers past payments, total debt, credit length, and new credit inquiries.",
    devComments: "Great response, could include specific weightage factors.",
  },
  {
    slNo: 7,
    topic: "Banking",
    subTopic: "NEFT vs RTGS",
    question: "What is the difference between NEFT and RTGS?",
    response:
      "NEFT processes transactions in batches, whereas RTGS settles transactions instantly.",
    reference: "RBI Payment Systems 2024",
    dateTime: "2025-03-26 12:30 PM",
    queriedBy: "Alok Joshi",
    ratedBy: "Ritu Sharma",
    attemptNumber: 1,
    responseFeedback:
      "Clear response, could mention minimum transaction limit for RTGS.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "NEFT transfers are batch-processed, while RTGS ensures real-time settlements for large transactions.",
    devComments: "Consider mentioning transaction time and minimum limits.",
  },
  {
    slNo: 8,
    topic: "Banking",
    subTopic: "Mutual Funds",
    question: "What is a mutual fund?",
    response:
      "A mutual fund is an investment vehicle pooling money from multiple investors to buy securities.",
    reference: "SEBI Mutual Fund Guidelines",
    dateTime: "2025-03-26 01:00 PM",
    queriedBy: "Shweta Tandon",
    ratedBy: "Arun Choudhary",
    attemptNumber: 1,
    responseFeedback: "Concise but could add details on risk factors.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "Mutual funds diversify investments across stocks, bonds, and other assets to reduce risk.",
    devComments: "Good answer, could include types of mutual funds.",
  },
  {
    slNo: 9,
    topic: "Banking",
    subTopic: "Insurance",
    question: "What is life insurance?",
    response:
      "Life insurance is a contract providing financial protection to beneficiaries after the policyholder’s death.",
    reference: "IRDAI Insurance Regulations",
    dateTime: "2025-03-26 01:30 PM",
    queriedBy: "Nitin Bansal",
    ratedBy: "Sunita Malhotra",
    attemptNumber: 1,
    responseFeedback: "Accurate, could mention types of policies.",
    correctness: 10,
    accuracy: 10,
    simplicity: 10,
    additionalInfoCorrectness: 10,
    additionalInfoRelevance: 10,
    idealResponse:
      "Life insurance provides a lump sum payout to beneficiaries in case of the policyholder’s demise.",
    devComments: "Consider adding term vs whole life insurance.",
  },
];

const columns = [
  { field: "slNo", headerName: "Sl No.", editable: false },
  { field: "topic", headerName: "Topic", width: 100, editable: false },
  { field: "subTopic", headerName: "Sub Topic", editable: false },
  { field: "question", headerName: "Question", editable: false },
  { field: "response", headerName: "Response", editable: false },
  { field: "reference", headerName: "Reference", editable: false },
  { field: "dateTime", headerName: "Date & Time of Testing", editable: false },
  { field: "queriedBy", headerName: "Queried by", editable: false },
  { field: "ratedBy", headerName: "Rated By", editable: false },
  { field: "attemptNumber", headerName: "Attempt Number", editable: true },
  {
    field: "responseFeedback",
    headerName: "Response Feedback",
    editable: true,
  },
  { field: "correctness", headerName: "Correctness", editable: true },
  { field: "accuracy", headerName: "Accuracy", editable: true },
  { field: "simplicity", headerName: "Simplicity", editable: true },
  {
    field: "additionalInfoCorrectness",
    headerName: "Additional Info Correctness",
    editable: true,
  },
  {
    field: "additionalInfoRelevance",
    headerName: "Additional Info Relevance",
    editable: true,
  },
  { field: "idealResponse", headerName: "Ideal Response", editable: true },
  { field: "devComments", headerName: "Dev Comments", editable: true },
];

const EvaluationTable = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    field: keyof (typeof initialRows)[0]
  ) => {
    const newData = [...rows];
    newData[rowIndex] = { ...newData[rowIndex], [field]: event.target.value };
    setRows(newData);
  };

  const handleSelectChange = (
    event: any,
    rowIndex: number,
    field: keyof (typeof initialRows)[0]
  ) => {
    const newData = [...rows];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: Number(event.target.value),
    };
    setRows(newData);
  };

  return (
    <>
      <div className="table-disclaimer">
        <InfoOutlined className="notice-icon" />
        <span>
          Please review and update the ratings for better accuracy of results.
        </span>
      </div>
      
      <div className="table-wrapper">
        <TableContainer component={Paper} className="table-container">
          <Table className="table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.field} className="table-header">
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="table-row">
                  {columns.map((col) => {
                    const cellValue = row[col.field as keyof typeof row];
                    return (
                      <TableCell key={col.field} className="table-cell">
                        {!col.editable ? (
                          <span className="tooltip" data-text={cellValue}>
                            {cellValue}
                          </span>
                        ) : col.field === "correctness" ||
                          col.field === "accuracy" ||
                          col.field === "simplicity" ||
                          col.field === "additionalInfoCorrectness" ||
                          col.field === "additionalInfoRelevance" ? (
                          <Select
                            value={cellValue as number}
                            onChange={(event) =>
                              handleSelectChange(
                                event,
                                rowIndex,
                                col.field as keyof typeof row
                              )
                            }
                            fullWidth
                            variant="standard"
                            className="select-field"
                            sx={{ fontSize: "12px" }}
                          >
                            {Array.from({ length: 10 }, (_, i) => (
                              <MenuItem
                                key={i + 1}
                                value={i + 1}
                                sx={{ fontSize: "12px" }}
                              >
                                {i + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <TextField
                            variant="standard"
                            fullWidth
                            multiline
                            minRows={1}
                            maxRows={4}
                            value={cellValue as string}
                            onChange={(event) =>
                              handleChange(
                                event,
                                rowIndex,
                                col.field as keyof typeof row
                              )
                            }
                            InputProps={{
                              style: { fontSize: "12px", padding: "4px 6px" },
                            }}
                          />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      ;
    </>
  );
};

export default withLayout(EvaluationTable);
