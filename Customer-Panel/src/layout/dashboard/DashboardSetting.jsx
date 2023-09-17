import {
    BoldOutlined,
    ExclamationCircleFilled,
    LockOutlined,
    PoweroffOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {App, Button, Col, FloatButton, Input, Modal, Row, Tooltip} from "antd";
import {useState} from "react";
import Cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
import sendRequest from "../../hook/sendRequest";

export const DashboardSetting = () => {
    const {confirm} = Modal;
    const {message} = App.useApp()

    const navigate = useNavigate()

    const [changePasswordStatus, setChangePasswordStatus] = useState(false);
    const [currentPassword, serCurrentPassword] = useState("")
    const [newPassword, serNewPassword] = useState("")

    /**
     * @description Change the password handler
     */
    const changePasswordModalHandler = async () => {
        const {data, error} = await sendRequest("customers/change_password", "POST", {
            currentPassword: currentPassword,
            newPassword: newPassword
        })
        if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
            message.success("change password successfully")
        } else {
            message.error(error.response.data.detail)
        }
    }

    /**
     * @description Sign out modal handlers
     */
    const showDeleteConfirm = () => {
        confirm({
            title: 'Sign out',
            icon: <ExclamationCircleFilled/>,
            content: 'Are you sure you want to sign out?',
            okText: 'Yes',
            okType: 'danger',
            centered: true,
            cancelText: 'Cancel',
            onOk() {
                Cookie.remove("token")
                navigate("/login")
            }
        });
    };

    return (
        <>
            <Modal
                centered
                width={"85%"}
                closable={false}
                title={"Change Password"}
                open={changePasswordStatus}
                footer={(_, {OkBtn, CancelBtn}) => (
                    <>
                        <div style={{marginTop: "50px"}}>
                            <Button
                                onClick={() => setChangePasswordStatus(false)}
                                type={"dashed"}>Cancel</Button>
                            <Button
                                disabled={!(currentPassword.length > 0 && newPassword.length > 0)}
                                onClick={() => changePasswordModalHandler()}
                                type={"primary"}>
                                Update Password
                            </Button>
                        </div>
                    </>
                )}>
                <Row
                    justify={"space-around"}
                    align={"middle"}>
                    <Col span={12}>
                        <Input.Password
                            onChange={(e) => serCurrentPassword(e.target.value)}
                            value={currentPassword}
                            placeholder={"Current password"}
                            size={"large"}
                            style={{width: "90%", marginTop: "10px"}}
                            prefix={<LockOutlined style={{color: "rgba(0, 0, 0, 0.45)"}}/>}/>
                    </Col>
                    <Col span={12}>
                        <Input.Password
                            onChange={(e) => serNewPassword(e.target.value)}
                            value={newPassword}
                            placeholder={"New password"}
                            size={"large"}
                            style={{width: "90%", marginTop: "10px", float: "right"}}
                            prefix={<LockOutlined style={{color: "rgba(0, 0, 0, 0.45)"}}/>}/>
                    </Col>
                </Row>
            </Modal>
            <FloatButton.Group
                trigger="hover"
                type="default"
                style={{
                    right: 94,
                }}
                icon={<SettingOutlined/>}>
                <Tooltip
                    placement="leftTop"
                    title={"Sign Out"}>
                    <FloatButton
                        onClick={() => showDeleteConfirm()}
                        icon={<PoweroffOutlined/>}/>
                </Tooltip>
                <Tooltip
                    placement="leftTop"
                    title={"Change password"}>
                    <FloatButton
                        onClick={() => setChangePasswordStatus(true)}
                        icon={<LockOutlined/>}/>
                </Tooltip>
            </FloatButton.Group>
        </>
    )
}