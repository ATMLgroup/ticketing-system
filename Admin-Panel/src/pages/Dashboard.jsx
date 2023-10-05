import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookie from "js-cookie";
import {useDispatch} from "react-redux"
import {useLoaderData} from "react-router-dom"
import jwtDecode from "jwt-decode";
import {DashboardLayout} from "../layout/dashboard/DashboardLayout";
import {set} from "../services/redux/tickets"

export const Dashboard = () => {
    const [isValidToken, setIsValidToken] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data} = useLoaderData()

    useEffect(() => {
        try {
            const token = Cookie.get('token')
            const {email} = jwtDecode(token)
            if (email) {
                setIsValidToken(true)
                dispatch(set(data))
            }
        } catch (err) {
            Cookie.remove('token')
            navigate("/login")
        }
    }, [data, dispatch, navigate]);
    return (
        <>
            {
                isValidToken && (<DashboardLayout/>)
            }
        </>
    )
}