import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import EducationInfo from "./EducationInfo";
import WorkExprInfo from "./WorkExprInfo";
import axios from "axios";

export default function Signup() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const nextPage = async () => {
        const isValid = await trigger();
        if (isValid) {
        setPage(page + 1);
        }
    };

    const [userData, setUserData] = useState({
        email:"",
        workEmail:"",
        password:"",
        dob:"",
        phoneNumber:"",
        address:"",
        visaStatus:""
    })

    const onSubmit = (data) => {
        setUserData({...userData, ...data})
    };
    console.log("Form Data:", userData);
    useEffect(() => {
        const fetchData = async () => {
            if (page === 4) {
                try {
                    const result = await axios.post("http://localhost:3000/api/users/signup", userData);
                    if(result){
                        navigate("/dashboard")
                    }
                } catch (error) {
                    console.error("Error during signup:", error);
                }
            }
        };
        fetchData();
    }, [page]); // Trigger when `page` changes
    
    const prevPage = () => {
        setPage(page - 1);
    };
    return (
            <div>
                    {page === 1 && (<PersonalInfo page={page} setPage={setPage} onSubmit={onSubmit}/>
                    )}
                    {page === 2 && <EducationInfo page={page} setPage={setPage} onSubmit={onSubmit}/>}
                    {page === 3 && <WorkExprInfo page={page} setPage={setPage} onSubmit={onSubmit} />}

            </div>)
        ;
};
