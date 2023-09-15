import {LoginTitle} from "./LoginTitle";
import {LoginInputs} from "./LoginInputs";
import style from "../../styles/login/login.module.css"
import {title, signedInButton} from "../../data/login"

export const LoginLayout = () => {
    return (
        <>
            <div className={style.loginContainer}>
                <LoginTitle title={title}/>
                <LoginInputs signedInButton={signedInButton}/>
            </div>
        </>
    )
}