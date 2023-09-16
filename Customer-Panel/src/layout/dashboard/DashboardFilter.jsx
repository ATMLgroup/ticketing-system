import {Col, Input, Row, Typography} from "antd";
import {LeftOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";

export const DashboardFilter = () => {
    const { Text} = Typography

    return (
        <>
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
        </>
    )
}