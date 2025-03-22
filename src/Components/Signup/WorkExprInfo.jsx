import { ArrowDownward } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
export default function WorkExprInfo({ page, setPage, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
      } = useForm();

    const [workExpr, setWorkExpr] = useState([]);

    const handleAddExpr = async (data) => {
        const isValid = await trigger();
        if (isValid) {
          setWorkExpr((prevWorkExpr) => [...prevWorkExpr, {...data}]); // Add new education to the list
          reset(); // Reset all form fields to empty
        }
      };

    const nextPage =  () => {    
        setPage(page + 1);
        onSubmit({"workExpr":workExpr});
      
    };
  
    const prevPage = () => {
      setPage(page - 1);
    };

    
    return (
        <div className="flex justify-center text-center items-center min-h-screen">
        <div className="w-full max-w-md p-4">
            <div className="flex mb-4">
                <ArrowBackIcon color="primary" onClick={() => prevPage()} sx={{ cursor: "pointer" }} />
                <h2 className="mx-auto text-xl">Signup - Work Experience</h2>
            </div>
            {workExpr.length > 0 &&
                workExpr.map((expr, index) => (
                    <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ArrowDownward />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography component="span">
                        {expr?.company} ({expr.title})
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="body1">
                            <strong>Location:</strong> {expr?.workLocation}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                            <strong>Dates:</strong> {expr?.workStartDate} to {expr?.workEndDate}
                            </Typography>
                        </Grid>
                        </Grid>
                    </AccordionDetails>
                    </Accordion>
                ))}
            <form onSubmit={handleSubmit(handleAddExpr)} className="text-center mt-5">
                <div className="mb-4">
                  <Controller
                    name="company"
                    control={control}
                    rules={{ required: "Company Name is required" }}
                    render={({ field }) => (
                      <TextField {...field} label="Company Name" variant="outlined" fullWidth error={!!errors.company} helperText={errors.company?.message} />
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.title}>
                        <InputLabel>Title</InputLabel>
                        <Select label="title" {...field}>
                          <MenuItem value="sde">Software Engineer</MenuItem>
                          <MenuItem value="pm">Product Manager</MenuItem>
                          <MenuItem value="ds">Data Scientist</MenuItem>
                        </Select>
                        <FormHelperText>{errors.title?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Controller
                    name="workStartDate"
                    control={control}
                    rules={{ required: "Work Start Date is required" }}
                    render={({ field }) => (
                      <TextField {...field} label="Work Start Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" fullWidth error={!!errors.workStartDate} helperText={errors.workStartDate?.message} />
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Controller
                    name="workEndDate"
                    control={control}
                    rules={{ required: "Work End Date is required" }}
                    render={({ field }) => (
                      <TextField {...field} label="Work End Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" fullWidth error={!!errors.workEndDate} helperText={errors.workEndDate?.message} />
                    )}
                  />
                </div>

                <div className="mb-4">
                  <Controller
                    name="workLocation"
                    control={control}
                    rules={{ required: "Work Location is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.workLocation}>
                        <InputLabel>Location</InputLabel>
                        <Select {...field}>
                          <MenuItem value="US">United States</MenuItem>
                          <MenuItem value="India">India</MenuItem>
                        </Select>
                        <FormHelperText>{errors.workLocation?.message}</FormHelperText>
                      </FormControl>
                    )}
                  />
                </div>
                {/* Additional Textarea */}
                <div className="mb-4">
                    <Controller
                        name="jobDescription"
                        control={control}
                        rules={{ required: "This field is required" }}  // Add any validation rules if needed
                        render={({ field }) => (
                        <FormControl fullWidth error={!!errors.jobDescription}>
                            <InputLabel>Job Description Information</InputLabel>
                            <TextareaAutosize
                            {...field}
                            sx={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid',  // Border style
                                borderColor: '#ccc',  // Red border on error, light gray on normal
                                borderRadius: '4px',  // Rounded corners
                                outline: 'none',  // Removes default outline
                              }}
                            minRows={4}  // You can change the number of rows
                            style={{ width: '100%', padding: '8px' }}
                            />
                            <FormHelperText>{errors.jobDescription?.message}</FormHelperText>
                        </FormControl>
                        )}
                    />
                </div>

                <div>
                    <Button type="submit" variant="contained" color="warning">
                        Add Work Experience
                    </Button>
                </div>
                <Button variant="contained" color="success" onClick={nextPage} >Submit</Button>
            </form>
        </div>
        </div>
    );
}
