import {Button, Checkbox, Input, Typography, App} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {useState} from "react";
import Cookie from "js-cookie"
import {useNavigate} from "react-router-dom"
import sendRequest from "../../hook/sendRequest";

const {Text} = Typography;

export const LoginInputs = ({signedInButton}) => {
    const {message} = App.useApp()
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("error");
    const [passwordError, setPasswordError] = useState("error")
    const [buttonLoading, setLoadingButton] = useState(false)
    const [expiresCookie, setExpiresCookie] = useState(1)

    /**
     * @description To save the email and check its correctness
     * @param {Object}e
     * @constructor
     */
    const EmailInputHandler = (e) => {
        setEmail(e.target.value)
        // eslint-disable-next-line
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const testRegex = regex.test(email)
        if (!testRegex) {
            setEmailError("error")
        } else {
            setEmailError("")
        }
    }

    /**
     * @description To save the password and check its correctness
     * @param {Object}e
     * @constructor
     */
    const PasswordInputHandler = (e) => {
        let value = e.target.value
        setPassword(value)
        if (value.length > 0) {
            setPasswordError("")
        } else {
            setPasswordError("error")
        }
    }

    /**
     * @description send post request and handle errors
     * @returns {Promise<void>}
     * @constructor
     */
    const LoginHandler = async () => {
        setLoadingButton(true)
        const {data, error} = await sendRequest("customers/signin", "POST", {
            email: email,
            password: password
        })
        setLoadingButton(false)
        if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
            await Cookie.set("token", data.data.token, {expires: expiresCookie})
            navigate("/dashboard")
        } else {
            message.error(error.response.data.detail)
        }
    };

    /**
     * @description check checkBox status for create expires cookie
     * @param {boolean}value
     */
    const keepLogin = (value) => {
        if (value === true) {
            setExpiresCookie(7)
        }
    }

    return (
        <>
            <div>
                <Input
                    size={"large"}
                    placeholder={"Enter your email"}
                    status={emailError}
                    prefix={<MailOutlined/>}
                    style={{marginBottom: "10px"}}
                    value={email}
                    onChange={(e) => EmailInputHandler(e)}
                />
                <Input.Password
                    size={"large"}
                    placeholder={"Enter your password"}
                    status={passwordError}
                    prefix={<LockOutlined/>}
                    style={{marginBottom: "10px"}}
                    value={password}
                    onChange={(e) => PasswordInputHandler(e)}
                />
                {signedInButton && (
                    <Checkbox
                        style={{marginBottom: "10px"}}
                        onClick={(value) => keepLogin(value.target.checked)}>
                        <Text type={"secondary"}>
                            Keep me signed in
                        </Text>
                    </Checkbox>
                )}
                <Button
                    disabled={!(emailError === "" && passwordError === "")}
                    block
                    loading={buttonLoading}
                    type="primary"
                    size={"large"}
                    onClick={() => {
                        LoginHandler();
                    }}
                >
                    login
                </Button>
            </div>
        </>
    );
};
