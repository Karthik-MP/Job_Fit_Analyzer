import { ArrowDownward } from "@mui/icons-material";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EducationInfo({ page, setPage, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [educations, setEducations] = useState([]); // State for dynamic education form data
  const nextPage =  () => {    
      setPage(page + 1);
      onSubmit({"educationDetails":educations});
    
  };

  const prevPage = () => {
    setPage(page - 1);
  };


  const handleAddEducation = async (data) => {
    const isValid = await trigger();
    if (isValid) {
      setEducations((prevEducations) => [...prevEducations, {...data}]); // Add new education to the list
      reset(); // Reset all form fields to empty
    }
  };
  
  console.log(educations)
  const universities = ["Harvard University", "Stanford University", "MIT"];
  const degrees = ["Bachelors", "Masters", "PhD"];
  const majors = ["Computer Science", "Electrical Engineering", "Mathematics"];
  const gpaScales = ["4.0", "4.3", "5.0"];
  const locations = ["United States", "India"];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <div className="flex mb-4">
          <ArrowBackIcon color="primary" onClick={() => prevPage()} sx={{ cursor: "pointer" }} />
          <h2 className="mx-auto text-xl">Signup - Education</h2>
        </div>

        {educations.length > 0 &&
            educations.map((education, index) => (
            <Accordion key={index}>
            <AccordionSummary
                expandIcon={<ArrowDownward />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
            >
                <Typography component="span">
                {education?.university} ({education.degree})
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography variant="body1">
                    <strong>Major:</strong> {education?.major}
                    </Typography>
                    <Typography variant="body1">
                    <strong>Location:</strong> {education?.location}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                    <strong>Grade:</strong> {education?.gpa}/{education?.gpaScale}
                    </Typography>
                    <Typography variant="body1">
                    <strong>Dates:</strong> {education?.startDate} to {education?.endDate}
                    </Typography>
                </Grid>
                </Grid>
            </AccordionDetails>
            </Accordion>
        ))}
        <form onSubmit={handleSubmit(handleAddEducation)} className="text-center">

          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            {/* University Name */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.university}>
                <InputLabel>University Name</InputLabel>
                <Select
                  label="University Name"
                  {...register("university", { required: "University is required" })}
                >
                  {universities.map((uni) => (
                    <MenuItem key={uni} value={uni} defaultValue={""}>
                      {uni}
                    </MenuItem>
                  ))}
                </Select>
                {errors.university && <Typography color="error">{errors.university.message}</Typography>}
              </FormControl>
            </Grid>

            {/* Degree */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.degree}>
                <InputLabel>Degree</InputLabel>
                <Select
                  label="Degree"
                  {...register("degree", { required: "Degree is required" })}
                >
                  {degrees.map((deg) => (
                    <MenuItem key={deg} value={deg}>
                      {deg}
                    </MenuItem>
                  ))}
                </Select>
                {errors.degree && <Typography color="error">{errors.degree.message}</Typography>}
              </FormControl>
            </Grid>

            {/* Major */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.major}>
                <InputLabel>Major</InputLabel>
                <Select
                  label="Major"
                  {...register("major", { required: "Major is required" })}
                >
                  {majors.map((major) => (
                    <MenuItem key={major} value={major}>
                      {major}
                    </MenuItem>
                  ))}
                </Select>
                {errors.major && <Typography color="error">{errors.major.message}</Typography>}
              </FormControl>
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.location}>
                <InputLabel>Location</InputLabel>
                <Select
                  label="Location"
                  {...register("location", { required: "Location is required" })}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
                {errors.location && <Typography color="error">{errors.location.message}</Typography>}
              </FormControl>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("startDate", { required: "Start date is required" })}
                error={!!errors.startDate}
                helperText={errors.startDate ? errors.startDate.message : ""}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("endDate", { required: "End date is required" })}
                error={!!errors.endDate}
                helperText={errors.endDate ? errors.endDate.message : ""}
              />
            </Grid>

            {/* GPA */}
            <Grid item xs={12} sm={9}>
              <TextField
                label="GPA"
                type="text"
                fullWidth
                {...register("gpa", {
                  required: "GPA is required",
                  min: { value: 0, message: "GPA must be at least 0" },
                  max: { value: 4.0, message: "GPA must not exceed 4.0" },
                })}
                error={!!errors.gpa}
                helperText={errors.gpa ? errors.gpa.message : ""}
              />
            </Grid>

            {/* GPA Scale */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth error={!!errors.gpaScale}>
                <InputLabel>GPA Scale</InputLabel>
                <Select
                  label="GPA Scale"
                  {...register("gpaScale", { required: "GPA Scale is required" })}
                >
                  {gpaScales.map((scale) => (
                    <MenuItem key={scale} value={scale}>
                      {scale}
                    </MenuItem>
                  ))}
                </Select>
                {errors.gpaScale && <Typography color="error">{errors.gpaScale.message}</Typography>}
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} container justifyContent="center">
              <Button type="submit" variant="contained" color="warning">
                Add Education
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Next Button */}
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button
            sx={{ display: "flex" }}
            variant="contained"
            color="primary"
            onClick={nextPage} // Handle next page functionality
          >
            Next
          </Button>
        </Grid>
      </div>
    </div>
  );
}
