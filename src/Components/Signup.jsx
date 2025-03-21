import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Box, Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { ExpandMoreRounded } from "@mui/icons-material";
const Signup = () => {
  const { register, control, handleSubmit, formState: { errors }, setValue, getValues, trigger } = useForm();
  const [page, setPage] = useState(2);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const [educations, setEducations] = useState([{}]); // Initial state for one education form

  const handleAddEducation = () => {
    setEducations([...educations, {}]); // Add an empty object to the list of educations
  };

  const universities = ["Harvard University", "Stanford University", "MIT"];
  const degrees = ["Bachelor's", "Master's", "PhD"];
  const majors = ["Computer Science", "Electrical Engineering", "Mathematics"];
  const gpaScales = ["4.0", "4.3", "5.0"];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        {page === 1 && (
          <div>
            {/* Go to login button */}
            <div className="flex">
              <ArrowBackIcon color="primary" onClick={()=>navigate("/")} sx={{cursor:"pointer"}}/>
              <h2 className=" mx-auto text-xl mb-4">Signup - Personal Info</h2>
            </div>
              <div className="mb-4">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i }}
                  render={({ field }) => (
                    <TextField {...field} label="Email" variant="outlined" fullWidth error={!!errors.email} helperText={errors.email?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="workEmail"
                  control={control}
                  rules={{ required: "University/Work Email is required", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i }}
                  render={({ field }) => (
                    <TextField {...field} label="University/Work Email" variant="outlined" fullWidth error={!!errors.workEmail} helperText={errors.workEmail?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
                  render={({ field }) => (
                    <TextField {...field} label="Password" type="password" variant="outlined" fullWidth error={!!errors.password} helperText={errors.password?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Confirm Password is required",
                    validate: value => value === getValues("password") || "Passwords do not match"
                  }}
                  render={({ field }) => (
                    <TextField {...field} label="Confirm Password" type="password" variant="outlined" fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <TextField {...field} label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} variant="outlined" fullWidth error={!!errors.dob} helperText={errors.dob?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <TextField {...field} label="Phone Number" variant="outlined" fullWidth error={!!errors.phone} helperText={errors.phone?.message} />
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.address}>
                      <InputLabel>Address</InputLabel>
                      <Select {...field}>
                        <MenuItem value="US">United States</MenuItem>
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                      <FormHelperText>{errors.address?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </div>

              <div className="mb-4">
                <Controller
                  name="visaStatus"
                  control={control}
                  rules={{ required: "Visa Status is required" }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.visaStatus}>
                      <InputLabel>Visa Status</InputLabel>
                      <Select {...field}>
                        <MenuItem value="citizen">Citizen</MenuItem>
                        <MenuItem value="student">Student Visa</MenuItem>
                        <MenuItem value="work">Work Visa</MenuItem>
                      </Select>
                      <FormHelperText>{errors.visaStatus?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </div>

              <Button variant="contained" color="primary" onClick={nextPage}>Next</Button>
          </div>
        )}

        {page === 2 && (
         <Box>
            <Typography>Signup - Education</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* University Name */}
          <Grid item xs={12} >
            <FormControl fullWidth error={!!errors.university}>
              <InputLabel>University Name</InputLabel>
              <Select
                label="University Name"
                {...register("university", { required: "University is required" })}
              >
                {universities.map((uni) => (
                  <MenuItem key={uni} value={uni}>
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
          <Grid item xs={12} >
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
          <Grid item xs={12} sm={9} >
            <TextField
              label="GPA"
              type="text"
              fullWidth
              {...register("gpa", { 
                required: "GPA is required",
                min: { value: 0, message: "GPA must be at least 0" },
                max: { value: 4.0, message: "GPA must not exceed 4.0" }
              })}
              error={!!errors.gpa}
              helperText={errors.gpa ? errors.gpa.message : ""}
            />
          </Grid>

          {/* GPA Scale */}
          <Grid item xs={12} sm={3} >
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
         </Box>
        )}

        {page === 3 && (
          <div>
            <h2 className="text-center text-xl mb-4">Signup - Work Experience</h2>
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
                      <Select {...field}>
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

              <Button variant="contained" color="secondary" fullWidth onClick={prevPage}>Previous</Button>
              <Button variant="contained" color="success" type="submit">Submit</Button>
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
