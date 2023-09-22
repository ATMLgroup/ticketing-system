import {App, Button, Col, Input, Modal, Row, Table, Tag, Tooltip, Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import sendRequest from "../../hook/sendRequest"
import style from "../../styles/dashboard/dashboard.module.css"

export const DashboardTable = () => {

    const {Text} = Typography
    const {TextArea} = Input
    const {message} = App.useApp()

    const {tickets} = useSelector((state) => state.tickets)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalId, setModalId] = useState(0)
    const [modalTitle, setModalTitle] = useState("")
    const [modalStatus, setModalStatus] = useState("")
    const [modalChats, setModalChats] = useState([])
    const [reply, setReply] = useState("")
    const [replyButtonLoading, setReplyButtonLoading] = useState(false)

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <>
                    <Text strong>
                        {text}
                    </Text>
                </>
            )
        },
        {
            title: 'Requested',
            dataIndex: 'createdAt',
            key: 'requested',
            render: (text) => (
                <>
                    <Text type="secondary">
                        {changeDate(text)}
                    </Text>
                </>
            )
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (tag) => (
                <>
                    {
                        tag === "High" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"red"}>
                            {tag}</Tag> ||
                        tag === "Medium" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"orange"}>
                            {tag}</Tag> ||
                        tag === "Low" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"geekblue"}>
                            {tag}</Tag>
                    }
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (tag) => (
                <>
                    {
                        tag === "Open" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"green-inverse"}>{tag}</Tag> ||
                        tag === "Pending" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"orange-inverse"}>{tag}</Tag> ||
                        tag === "Close" && <Tag
                            style={{display: "table", margin: "0 auto"}}
                            color={"red-inverse"}>{tag}</Tag>
                    }
                </>
            ),
        },
        {
            title: 'View',
            dataIndex: 'id',
            key: 'view',
            render: (id) => (
                <>
                    <Tooltip title="View Ticket">
                        <Button
                            onClick={() => openTicketDetails(id)}
                            style={{display: "table", margin: "0 auto"}}
                            shape="circle"
                            icon={<EyeOutlined/>}/>
                    </Tooltip>
                </>
            )
        },
    ];

    // Centering the last 3 titles of the table
    useEffect(() => {
        const tableThead = document.querySelector('.ant-table-thead')
        const cells = tableThead.children[0].cells
        const cellsToCenterAlign = [2, 3, 4];
        cellsToCenterAlign.forEach(index => {
            cells[index].style.textAlign = "center"
        })
    }, []);

    /**
     * @description It is responsible for sending requests to the server and receiving information and separating it
     * @param {Number}id
     * @returns {Promise<void>}
     */
    const openTicketDetails = async (id) => {
        const {data} = await sendRequest(`customers/tickets?ticket_id=${id}`, "GET", {})
        if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
            setModalId(id)
            setModalTitle(data.data[0].title)
            setModalStatus(data.data[0].status)
            setModalChats(updateContentForShow(data.data[0].Chats))
            setIsModalOpen(true)
        } else {
            message.error("error in getting ticket details. please try again later")
        }
    }

    /**
     * @description It is responsible for updating content array from server and convert to readable content
     * @param {Array}chats
     * @returns {*[]}
     */
    const updateContentForShow = (chats) => {
        const convertedChats = []
        for (const chat of chats) {
            const chatObject = JSON.parse(chat.content)
            const splitDateArray = chat.createdAt.split("T")
            const date = splitDateArray[0]
            const time = splitDateArray[1].split(".")[0]
            convertedChats.push({
                content: chatObject,
                createdAt: date + " " + time
            })
        }

        return convertedChats
    }

    /**
     * @description It is responsible for changing the numeric date into a readable date
     * @param {String}dateString
     * @returns {string}
     */
    const changeDate = (dateString) => {
        const splitDate = dateString.split("T")[0]
        return new Date(splitDate).toLocaleString('en-US',
            {dateStyle: 'long'})
    }

    /**
     * @description It is responsible for sending reply message to server
     * @returns {Promise<void>}
     */
    const sendReply = async () => {
        if (reply) {
            setReplyButtonLoading(true)

            const body = {
                ticketId: modalId,
                content: reply
            }

            const {data, error} = await sendRequest("customers/reply", "POST", body)

            if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length !== 0) {
                setReply("")
                setReplyButtonLoading(false)
                await updateChats()
            } else {
                message.error(error.response.data.detail)
            }
        } else {
            message.error("reply cannot be empty")
        }
    }

    /**
     * @description It is responsible for getting chat list and showing updated chat
     * @returns {Promise<void>}
     */
    const updateChats = async () => {
        const {data: ticketData} = await sendRequest(`customers/tickets?ticket_id=${modalId}`, "GET", {})

        if (typeof ticketData === 'object' && !Array.isArray(ticketData) && Object.keys(ticketData).length !== 0) {
            setModalChats(updateContentForShow(ticketData.data[0].Chats))
        } else {
            message.error("error in getting ticket details. please try again later")
        }
    }

    return (
        <>
            <Table
                align={"center"}
                dataSource={tickets}
                columns={columns}
                pagination={false}/>

            <Modal
                centered
                width={"85%"}
                closable={false}
                title={modalTitle}
                open={isModalOpen}
                footer={(_, {OkBtn, CancelBtn}) => (
                    <>
                        <div style={{marginTop: "50px"}}>
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                type={"dashed"}>
                                Close
                            </Button>
                            {
                                modalStatus !== "Close" && (<Button
                                    loading={replyButtonLoading}
                                    onClick={() => sendReply()}
                                    type={"primary"}
                                    style={{backgroundColor: "rgb(4, 195, 56)"}}>
                                    Send reply
                                </Button>)
                            }
                        </div>
                    </>
                )}>
                <Row align={"middle"}>
                    {
                        modalChats.map(item => {
                            return (
                                <Col span={24}>
                                    <div
                                        className={`${item.content.author === 'user' ? style.authorChat : style.adminChat}`}>
                                        <p>
                                            {item.content.content}
                                        </p>
                                        <span>
                                            {item.createdAt}
                                        </span>
                                    </div>
                                </Col>
                            )

                        })
                    }
                    <Col span={24}>
                        <TextArea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Ticket reply"
                            autoSize={{minRows: 5, maxRows: 7}}
                            style={{marginTop: "20px"}}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}