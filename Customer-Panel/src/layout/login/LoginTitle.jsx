import {Typography} from "antd";

const {Title} = Typography

export const LoginTitle = ({title}) => {
    return (
        <>
            <Title
                level={3}
                style={{textAlign: "center"}}>
                {title}
            </Title>
        </>
    )
}