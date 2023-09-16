import {Button, Col, Input, Row, Table, Tag, Tooltip, Typography} from "antd";
import {LeftOutlined, PaperClipOutlined, RightOutlined, EyeOutlined, SearchOutlined} from "@ant-design/icons"
import style from "../../styles/dashboard/dashboard.module.css"
import {useEffect, useRef} from "react";

export const DashboardLayout = () => {

    const {Title, Text} = Typography

    const dataSource = [
        {
            key: '1',
            title: 'Can not access the system. please help me!',
            requested: '15 September 2023',
            priority: 'High',
            status: 'Open',
            view: '->'
        },
        {
            key: '2',
            title: 'Can not access the system. please help me!',
            requested: '15 September 2023',
            priority: 'Medium',
            status: 'Pending',
            view: '->'
        },
        {
            key: '3',
            title: 'Can not access the system. please help me!',
            requested: '15 September 2023',
            priority: 'Low',
            status: 'Close',
            view: '->'
        }
    ];

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
            dataIndex: 'requested',
            key: 'requested',
            render: (text) => (
                <>
                    <Text type="secondary">
                        {text}
                    </Text>
                </>
            )
        },
        {
            title: 'priority',
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
            title: 'status',
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
            title: 'view',
            dataIndex: 'view',
            key: 'view',
            render: () => (
                <>
                    <Tooltip title="View Ticket">
                        <Button
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

    return (
        <>
            <div className={style.dashboardContainer}>
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
                            style={{backgroundColor: "#04C338", float: "right"}}>
                            Create ticket
                        </Button>
                    </Col>
                </Row>
                <Row
                    align={"middle"}
                    justify={"space-between"}
                    style={{marginBottom: "50px"}}>
                    <Col span={8}>
                        <Input
                            placeholder={"Search"}
                            prefix={<SearchOutlined style={{color: "#00000073"}}/>}
                            style={{width: "80%"}}/>
                    </Col>
                    <Col span={4}>
                        <Text style={{float: "right"}}>
                            <LeftOutlined style={{cursor: "pointer", paddingRight: "10px"}}/>
                            1 - 50 Pages
                            <RightOutlined style={{cursor: "pointer", paddingLeft: "10px"}}/>
                        </Text>
                    </Col>
                </Row>
                <Table
                    align={"center"}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}/>
            </div>
        </>
    )
}