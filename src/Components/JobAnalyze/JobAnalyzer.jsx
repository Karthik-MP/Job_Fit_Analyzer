import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";

const App = () => {
  const [jobDetails, setJobDetails] = useState(null);

  const analyzeJobDetails = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      console.log("asdas", url);
      if (url && url.includes("linkedin.com/jobs/")) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: extractJobDetails,
          },
          (results) => {
            if (results && results[0]) {
              setJobDetails(results[0].result);
            } else {
              alert("No job details found on this page.");
            }
          }
        );
      } else {
        alert("This is not a LinkedIn job page.");
      }
    });
  };

  const extractJobDetails = () => {
    const jobTitle = document
      .querySelector(".job-details-jobs-unified-top-card__company-name a")
      ?.innerText?.trim();
    const companyName = document
      .querySelector(".job-details-jobs-unified-top-card__company-name")
      ?.innerText?.trim();
    const location = document
      .querySelector(
        ".t-black--light.mt2.job-details-jobs-unified-top-card__tertiary-description-container .tvm__text--low-emphasis"
      )
      ?.innerText?.trim();
    const jobDescription = document
      .querySelector(".job-details-about-the-job-module__description")
      ?.innerText?.trim();

    return {
      jobTitle,
      companyName,
      location,
      jobDescription,
    };
  };

  const fetchAnswers = useCallback(async () => {
    try {
      response = await axios.post(
        "http://localhost:3000/api/users/signup",
        userData
      );
      if (result) {
        navigate("/");
      }
    } catch (error) {
      alert(response.message);
      console.error("Error during signup:", error);
    }
  }, [jobDetails]); // Empty dependency array to avoid unnecessary re-renders

  return (
    <div className="p-4">
      <Button
        variant="contained"
        color="primary"
        className="w-full mb-4"
        onClick={analyzeJobDetails}
      >
        Analyze Job
      </Button>

      {jobDetails && (
        <div className="space-y-2">
          <div>
            <strong>Job Title:</strong> {jobDetails.jobTitle}
          </div>
          <div>
            <strong>Company Name:</strong> {jobDetails.companyName}
          </div>
          <div>
            <strong>Location:</strong> {jobDetails.location}
          </div>
          <div>
            <strong>Job Description:</strong> {jobDetails.jobDescription}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
