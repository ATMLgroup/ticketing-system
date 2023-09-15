import {Button, Checkbox, Input,Typography} from "antd";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
const {Text} = Typography

export const LoginInputs = () => {
    return (
        <>
            <div>
                <Input
                    size={"large"}
                    placeholder={"Enter your email"}
                    status={"error"}
                    prefix={<MailOutlined/>}
                    style={{marginBottom: "10px"}}/>
                <Input.Password
                    size={"large"}
                    placeholder={"Enter your password"}
                    status={"error"}
                    prefix={<LockOutlined/>}
                    style={{marginBottom: "10px"}}/>
                <Checkbox style={{marginBottom: "10px"}} >
                    <Text type={"secondary"}>
                        Keep me signed in
                    </Text>
                </Checkbox>
                <Button
                    block
                    type="primary"
                    size={"large"}>
                    login
                </Button>
            </div>
        </>
    )
}