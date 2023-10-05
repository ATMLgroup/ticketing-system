import {useEffect} from "react";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

export const Index = () => {
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
            navigate("/login")
        }
    }, []);
    return (
        <></>
    )
}