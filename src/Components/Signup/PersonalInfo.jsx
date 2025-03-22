import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PersonalInfo({ page, setPage, onSubmit }) {
    const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
    const navigate = useNavigate();
    const nextPage = async (data) => {
        const isValid = await trigger();
        if (isValid) {
          setPage(page + 1);
          onSubmit(data)
        }
      };

    return (

        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-md p-4'>
                <form className="text-center" onSubmit={handleSubmit(nextPage)}>
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
                            name="phoneNumber"
                            control={control}
                            rules={{ required: "Phone number is required" }}
                            render={({ field }) => (
                                <TextField {...field} label="Phone Number" variant="outlined" fullWidth error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
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
                                <Select  label="address" {...field}>
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
                                <Select label="visa" {...field}>
                                    <MenuItem value="citizen">Citizen</MenuItem>
                                    <MenuItem value="H1B">H1B</MenuItem>
                                    <MenuItem value="f1">F1</MenuItem>
                                </Select>
                                <FormHelperText>{errors.visaStatus?.message}</FormHelperText>
                                </FormControl>
                            )}
                            />
                        </div>

                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
