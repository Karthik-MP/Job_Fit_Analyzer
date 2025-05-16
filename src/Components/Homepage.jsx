import StarIcon from "@mui/icons-material/Star";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import JobAnalyzer from "./JobAnalyze/JobAnalyzer";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Desc");
  const [questions, setQuestions] = useState([
    { id: 1, text: "Question 1", answer: "" },
    { id: 2, text: "Question 2", answer: "" },
    { id: 3, text: "Question 3", answer: "" },
    { id: 4, text: "Cover Letter", answer: "" },
  ]);

  const handleAnswerChange = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, answer: value } : q))
    );
  };

  const resetAnswer = (id) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, answer: "" } : q))
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could use a snackbar here for better UX
    console.log("Copied to clipboard!");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab
            value="Desc"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {activeTab === "Desc" && (
                  <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                )}
                Desc
              </Box>
            }
          />
          <Tab
            value="Linkedin"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {activeTab === "Linkedin" && (
                  <StarIcon fontSize="small" sx={{ mr: 0.5 }} />
                )}
                Linkedin
              </Box>
            }
          />
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {activeTab === "Desc" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            <JobAnalyzer />
            {/* {questions.map((question) => (
              <Box key={question.id}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {question.text}
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  minRows={4}
                  variant="outlined"
                  value={question.answer}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  placeholder="Type your answer here..."
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Tooltip title="Copy to clipboard">
                    <IconButton
                      onClick={() => copyToClipboard(question.answer)}
                      disabled={!question.answer}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reset answer">
                    <IconButton
                      onClick={() => resetAnswer(question.id)}
                      disabled={!question.answer}
                    >
                      <RestartAltIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ alignSelf: "flex-start", mt: 2 }}
            >
              Download
            </Button> */}
          </Box>
        )}

        {activeTab === "Linkedin" && (
          <Box sx={{ p: 2 }}>
            <Typography>LinkedIn content goes here</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default HomePage;
