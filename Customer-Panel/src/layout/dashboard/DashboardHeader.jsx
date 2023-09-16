import {Button, Col, Row} from "antd";
import {PaperClipOutlined} from "@ant-design/icons";

export const DashboardHeader = () => {
    return (
        <>
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
        </>
    )
}