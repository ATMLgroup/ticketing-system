import style from "../../styles/dashboard/dashboard.module.css"
import {DashboardTable} from "./DashboardTable";
import {DashboardHeader} from "./DashboardHeader";
import {DashboardFilter} from "./DashboardFilter";
import {FloatButton, Tooltip} from "antd"
import {PoweroffOutlined, LockOutlined, SettingOutlined} from "@ant-design/icons";
import {DashboardSetting} from "./DashboardSetting";

export const DashboardLayout = () => {

    return (
        <>
            <div className={style.dashboardContainer}>
                <DashboardHeader/>
                <DashboardFilter/>
                <DashboardTable/>
                <DashboardSetting/>
            </div>
        </>
    )
}