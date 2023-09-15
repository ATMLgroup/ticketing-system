import {Button, Col, Input, Row, Space, Table, Typography} from "antd";
import {LeftOutlined, PaperClipOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons"
import style from "../../styles/dashboard/dashboard.module.css"

export const DashboardLayout = () => {

    const {Title, Text} = Typography

    const dataSource = [
        {
            key: '1',
            title: 'Title Issue 1',
            requested: '15 September 2023',
            priority: 'High',
            status: 'Open',
            view: '->'
        },
        {
            key: '2',
            title: 'Title Issue 2',
            requested: '15 September 2023',
            priority: 'Medium',
            status: 'Pending',
            view: '->'
        },
        {
            key: '3',
            title: 'Title Issue 3',
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
            key: 'title'
        },
        {
            title: 'Requested',
            dataIndex: 'requested',
            key: 'requested'
        },
        {
            title: 'priority',
            dataIndex: 'priority',
            key: 'priority'
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'view',
            dataIndex: 'view',
            key: 'view'
        },
    ];

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
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
            </div>
        </>
    )
}