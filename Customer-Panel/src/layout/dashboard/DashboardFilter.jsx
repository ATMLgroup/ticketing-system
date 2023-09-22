import {Col, Input, Row, Typography} from "antd";
import {LeftOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {show} from "../../services/redux/tickets"

export const DashboardFilter = () => {
    const {Text} = Typography

    const {tickets} = useSelector((state) => state.tickets)

    const [currentIndex, setCurrentIndex] = useState(1)
    const [totalIndex, setTotalIndex] = useState(1);
    const [searchText, setSearchText] = useState("")

    const dispatch = useDispatch()

    // handling show tickets list and calculate total index
    useEffect(() => {
        const ticketLength = tickets.length
        setTotalIndex(Math.ceil(ticketLength / 10))
        const startIndex = (currentIndex - 1) * 10;
        const endIndex = startIndex + 10;
        const currentTickets = tickets.slice(startIndex, endIndex)
        dispatch(show(currentTickets))
    }, [tickets, currentIndex, dispatch]);

    /**
     * @description show previous tickets list
     */
    const previousTicketsList = () => {
        setCurrentIndex((value) => {
            return value - 1
        })
        updateTicketList()
    }

    /**
     * @description show next tickets list
     */
    const nextTicketsList = () => {
        setCurrentIndex((value) => {
            return value + 1
        })
        updateTicketList()
    }

    /**
     * @description It is responsible for updating the index of tickets
     */
    const updateTicketList = () => {
        const startIndex = (currentIndex - 1) * 10;
        const endIndex = startIndex + 10;
        const currentTickets = tickets.slice(startIndex, endIndex)
        dispatch(show(currentTickets))
    }

    // filtering tickets
    useEffect(() => {
        setCurrentIndex(1)

        if (searchText.length > 0) {
            const filteredTickets = tickets.filter(item => {
                return item.title.includes(searchText)
            })
            dispatch(show(filteredTickets))
        } else {
            updateTicketList()
        }
    }, [searchText, dispatch,tickets]);

    return (
        <>
            <Row
                align={"middle"}
                justify={"space-between"}
                style={{marginBottom: "50px"}}>
                <Col span={8}>
                    <Input
                        placeholder={"Search"}
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        prefix={<SearchOutlined style={{color: "#00000073"}}/>}
                        style={{width: "80%"}}/>
                </Col>
                {
                    searchText.length === 0 && (
                        <Col span={4}>
                            <Text style={{float: "right"}}>
                                {
                                    currentIndex !== 1 && (
                                        <LeftOutlined
                                            style={{cursor: "pointer", paddingRight: "10px"}}
                                            onClick={() => previousTicketsList()}/>
                                    )
                                }
                                {currentIndex} - {totalIndex} Pages
                                {
                                    currentIndex !== totalIndex && (
                                        <RightOutlined
                                            style={{cursor: "pointer", paddingLeft: "10px"}}
                                            onClick={() => nextTicketsList()}/>
                                    )
                                }
                            </Text>
                        </Col>
                    )
                }
            </Row>
        </>
    )
}