import {Empty, Typography} from "antd";

export const DashboardEmptyTickets = () => {
    const {Text} = Typography

    return (
        <>
            <Empty
                style={{marginTop: "15%"}}
                description={
                    <Text type="secondary">
                        No ticket has been registered yet.
                    </Text>
                }/>
        </>
    )
}