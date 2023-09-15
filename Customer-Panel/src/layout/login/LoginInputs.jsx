import {Button, Checkbox, Input, Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {useState} from "react"; // به جای useFetch
import sendRequest from "../../hook/sendRequest";

const {Text} = Typography;

export const LoginInputs = ({signedInButton}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [buttonLoading, setLoadingButton] = useState(false)

    /**
     * @description To save the email and check its correctness
     * @param {Object}e
     * @constructor
     */
    const EmailInputHandler = (e) => {
        setEmail(e.target.value)
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
    const LoginHandler = async () => {
        setLoadingButton(true)
        const {data, error} = await sendRequest("customers/signin", "POST", {
            email: email,
            password: password
        })
        setLoadingButton(false)
        console.log("data", data)
        console.log("error", error)
    };

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
                    <Checkbox style={{marginBottom: "10px"}}>
                        <Text type={"secondary"}>Keep me signed in</Text>
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
