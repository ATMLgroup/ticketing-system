import {useSelector} from "react-redux";
import style from "../../styles/dashboard/dashboard.module.css"
import {DashboardTable} from "./DashboardTable";
import {DashboardHeader} from "./DashboardHeader";
import {DashboardFilter} from "./DashboardFilter";
import {DashboardSetting} from "./DashboardSetting";
import {DashboardEmptyTickets} from "./DashboardEmptyTickets";

export const DashboardLayout = () => {
    const {tickets} = useSelector((state) => state.tickets)
    const ticketsLength = tickets.length;

    return (
        <>
            <div className={style.dashboardContainer}>
                <DashboardHeader/>
                {ticketsLength > 0 ? <DashboardFilter/> : null}
                {ticketsLength > 0 ? <DashboardTable/> : <DashboardEmptyTickets/>}
                <DashboardSetting/>
            </div>
        </>
    )
}