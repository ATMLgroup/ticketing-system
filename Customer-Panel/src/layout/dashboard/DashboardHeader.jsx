import {App, Button, Col, Input, Modal, Row, Select, Typography} from "antd";
import {PaperClipOutlined, BoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import sendRequestHook from "../../hook/sendRequest"
import getTicketsData from "../../hook/getTicketsData"
import {set} from "../../services/redux/tickets"

export const DashboardHeader = () => {
    const {tickets} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    const {TextArea} = Input
    const {Title, Text} = Typography
    const {message} = App.useApp()

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [loadingButton, setLoadingButton] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    /**
     * @description It is responsible for sending the request to the server 
     * @returns {Promise<void>}
     */
    const sendRequest = async () => {
        if (title && description && priority) {
            setLoadingButton(true)

            const body = {
                "title": title,
                "priority": priority,
                "description": description
            }

            const {data, error} = await sendRequestHook("customers/add", "POST", body)

            if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
                message.success("create ticket successfully")
                setLoadingButton(false)
                setIsModalOpen(false)
                setTitle("")
                setDescription("")
            } else {
                setLoadingButton(false)
                message.error(error.response.data.detail)
            }
        } else {
            message.error("All values are required")
        }
    }

    /**
     * @description It is responsible for sending the request to the server and receiving the list of tickets
     * @returns {Promise<void>}
     */
    const updateTableList = async () => {
        try {
            const {data} = await getTicketsData()
            dispatch(set(data))
        } catch {
            message.error("error in getting tickets. please refresh the page")
        }
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
                                onClick={() => setIsModalOpen(false)}
                                type={"dashed"}>
                                Cancel
                            </Button>
                            <Button
                                loading={loadingButton}
                                onClick={() => sendRequest()}
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{width: "80%", marginTop: "10px"}}
                            prefix={<BoldOutlined style={{color: "rgba(0, 0, 0, 0.45)"}}/>}/>
                    </Col>
                    <Col span={6}>
                        <Select
                            size={"large"}
                            onChange={(e) => setPriority(e)}
                            placeholder="Select a priority"
                            options={options}
                            style={{width: "80%", display: "block", float: "right"}}
                        />
                    </Col>
                    <Col span={24}>
                        <TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        onClick={() => setIsModalOpen(true)}>
                        Create ticket
                    </Button>
                </Col>
            </Row>
        </>
    )
}