import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import {DashboardLayout} from "../layout/dashboard/DashboardLayout";

export const Dashboard = () => {
    const [isValidToken, setIsValidToken] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const token = Cookie.get('token')
            const {email} = jwtDecode(token)
            if (email) {
                setIsValidToken(true)
            }
        } catch (err) {
            Cookie.remove('token')
            navigate("/login")
        }
    }, []);
    return (
        <>
            {
                isValidToken && (<DashboardLayout/>)
            }
        </>
    )
}