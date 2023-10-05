import {App, Button, Col, Input, Modal, Row, Select, Typography} from "antd";
import {PaperClipOutlined, BoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import sendRequestHook from "../../hook/sendRequest"
import getTicketsData from "../../hook/getTicketsData"
import {set} from "../../services/redux/tickets"

export const DashboardHeader = () => {
    const {tickets} = useSelector((state) => state.tickets)

    const {Title, Text} = Typography


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

    return (
        <>
            <Row
                align={"middle"}
                justify={"space-evenly"}
                style={{marginBottom: "20px"}}>
                <Col span={24}>
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
            </Row>
        </>
    )
}