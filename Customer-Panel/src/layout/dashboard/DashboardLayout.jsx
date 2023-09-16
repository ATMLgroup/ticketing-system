import style from "../../styles/dashboard/dashboard.module.css"
import {DashboardTable} from "./DashboardTable";
import {DashboardHeader} from "./DashboardHeader";
import {DashboardFilter} from "./DashboardFilter";

export const DashboardLayout = () => {

    return (
        <>
            <div className={style.dashboardContainer}>
                <DashboardHeader/>
                <DashboardFilter/>
                <DashboardTable/>
            </div>
        </>
    )
}