import {BoldOutlined, LockOutlined, PoweroffOutlined, SettingOutlined} from "@ant-design/icons";
import {Button, Col, FloatButton, Input, Modal, Row, Select, Tooltip} from "antd";
import {useState} from "react";

export const DashboardSetting = () => {
    const {TextArea} = Input

    const [changePasswordStatus, setChangePasswordStatus] = useState(false);
    const [signOutModalStatus, setSignOutModalStatus] = useState(false);

    const changePasswordModalHandler = (value) => {
        setChangePasswordStatus(value)
    }

    const signOutModalHandler = (value) => {
        setSignOutModalStatus(value)
    }

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
                                onClick={() => changePasswordModalHandler(false)}
                                type={"dashed"}>Cancel</Button>
                            <Button
                                onClick={() => changePasswordModalHandler(false)}
                                type={"primary"}>
                                Update Password
                            </Button>
                        </div>
                    </>
                )}>
                <Row justify={"space-around"} align={"middle"}>
                    <Col span={12}>
                        <Input.Password
                            placeholder={"Current password"}
                            size={"large"}
                            style={{width: "90%", marginTop: "10px"}}
                            prefix={<LockOutlined style={{color: "rgba(0, 0, 0, 0.45)"}}/>}/>
                    </Col>
                    <Col span={12}>
                        <Input.Password
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
                    <FloatButton icon={<PoweroffOutlined/>}/>
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