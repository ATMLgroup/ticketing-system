import {Button, Table, Tag, Tooltip, Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const DashboardTable = () => {

    const {Text} = Typography
    const {tickets} = useSelector((state) => state.tickets)

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
            <Table
                align={"center"}
                dataSource={tickets}
                columns={columns}
                pagination={false}/>
        </>
    )
}