import {LoginLayout} from "../layout/login/LoginLayout";
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"
import {useNavigate} from "react-router-dom"
import {useEffect} from "react";

export const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const token = Cookie.get('token')
            const {email} = jwtDecode(token)
            if (email) {
                navigate("/dashboard")
            }
        } catch (err) {
            Cookie.remove('token')
        }
    }, []);
    return (<LoginLayout/>)
}