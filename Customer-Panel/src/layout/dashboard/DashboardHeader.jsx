import {Button, Col, Input, Modal, Row, Select, Typography} from "antd";
import {PaperClipOutlined, BoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";

export const DashboardHeader = () => {
    const {tickets} = useSelector((state) => state.tickets)

    const {TextArea} = Input

    const ticketsLength = tickets.length;

    const options = [
        {
            value: 'High',
            label: 'High',
        },
        {
            value: 'Medium',
            label: 'Medium',
        },
        {
            value: 'Low',
            label: 'Low',
        },
    ]

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
                title="Create a new ticket"
                open={isModalOpen}
                footer={(_, {OkBtn, CancelBtn}) => (
                    <>
                        <div style={{marginTop: "50px"}}>
                            <Button
                                onClick={() => modalHandler(false)}
                                type={"dashed"}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => modalHandler(false)}
                                type={"primary"}
                                style={{backgroundColor: "rgb(4, 195, 56)"}}>
                                Create
                            </Button>
                        </div>
                    </>
                )}>
                <Row justify={"space-around"} align={"middle"}>
                    <Col span={18}>
                        <Input
                            placeholder={"Ticket title"}
                            size={"large"}
                            style={{width: "80%", marginTop: "10px"}}
                            prefix={<BoldOutlined style={{color: "rgba(0, 0, 0, 0.45)"}}/>}/>
                    </Col>
                    <Col span={6}>
                        <Select
                            size={"large"}
                            placeholder="Select a priority"
                            options={options}
                            style={{width: "80%", display: "block", float: "right"}}
                        />
                    </Col>
                    <Col span={24}>
                        <TextArea
                            placeholder="Ticket Description"
                            autoSize={{minRows: 5, maxRows: 7}}
                            style={{marginTop: "20px"}}
                        />
                    </Col>
                </Row>
            </Modal>
            <Row
                align={"middle"}
                justify={"space-evenly"}
                style={{marginBottom: "20px"}}>
                <Col span={12}>
                    <Title>
                        Tickets
                        {
                            ticketsLength > 0 ?
                                <Text type={"secondary"}>
                                    {ticketsLength} Issues
                                </Text>
                                : null
                        }
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