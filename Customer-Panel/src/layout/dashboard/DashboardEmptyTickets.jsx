import {Empty, Typography} from "antd";

export const DashboardEmptyTickets = () => {
    const {Text} = Typography

    return (
        <>
            <Empty description={
                <Text type="secondary">
                    No ticket has been registered yet.
                </Text>
            }/>
        </>
    )
}