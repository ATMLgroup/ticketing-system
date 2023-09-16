import {Button, Col, Modal, Row, Typography} from "antd";
import {PaperClipOutlined} from "@ant-design/icons";
import {useState} from "react";

export const DashboardHeader = () => {
    const {Title, Text} = Typography
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * @description open/close modal
     * @param {Boolean}value true=>open / false=>close
     */
    const modalHandler = (value) => {
        setIsModalOpen(value)
    }

    const updateTableList = () => {
        console.log("Let's update the table list...")
    }

    return (
        <>
            <Modal
                centered
                width={"85%"}
                closable={false}
                afterClose={() => updateTableList()}
                title="Basic Modal"
                open={isModalOpen}
                footer={(_, {OkBtn, CancelBtn}) => (
                    <>
                        <Button
                            onClick={() => modalHandler(false)}
                            type={"dashed"}>cancel</Button>
                        <Button
                            onClick={() => modalHandler(false)}
                            type={"primary"}
                            style={{backgroundColor: "rgb(4, 195, 56)"}}>
                            create
                        </Button>
                    </>
                )}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Row
                align={"middle"}
                justify={"space-evenly"}
                style={{marginBottom: "20px"}}>
                <Col span={12}>
                    <Title>
                        Tickets <Text type={"secondary"}>72 Issues</Text>
                    </Title>
                </Col>
                <Col span={12}>
                    <Button
                        type={"primary"}
                        size={"large"}
                        icon={<PaperClipOutlined/>}
                        style={{backgroundColor: "#04C338", float: "right"}}
                        onClick={() => modalHandler(true)}>
                        Create ticket
                    </Button>
                </Col>
            </Row>
        </>
    )
}