import {LoginLayout} from "../layout/login/LoginLayout";
import Cookie from "js-cookie"
import jwtDecode from "jwt-decode"

export const Login = () => {
    const token = Cookie.get('token')
    if(token) {
        const decodeToken = jwtDecode(token)
        console.log(decodeToken)
    }
    return (
        <>
            <LoginLayout/>
        </>
    )
}