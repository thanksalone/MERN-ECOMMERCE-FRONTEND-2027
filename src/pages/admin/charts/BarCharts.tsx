import { BarChart } from "../../../components/admin/Charts";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import type { customErrorType } from "../../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";

const {last12Months, last6Months} = getLastMonths();

const BarCharts = () =>{
      const {user} = useSelector(
      (state: RootState) => state.userReducer
      );
    
      const {isError,error, isLoading, data} = useBarQuery(user?._id!);
        const products = data?.charts.product || [];
        const orders = data?.charts.orders || [];
        const users = data?.charts.user || [];

    
      if (isError) {
        const err = error as customErrorType;
        toast.error(err.data.message);
          }
    
    
    return (
        <div className="adminContainer">
            <AdminSidebar />

            <main className="chart-container">
                {
                    isLoading ? (<Skeleton length={20}/>) : (
              <>
                <h1>Bar Charts</h1>
                <section>
                    <BarChart
                        data_1={products}
                        data_2={users}
                        title_1="Products"
                        title_2="Users"
                        labels={last6Months}
                        bgColor_1={`hsl(260,50%,30%)`}
                        bgColor_2="{`hsl(360,90%,90%)"
                    />
                </section>

                <section>
                    <BarChart
                            // horizontal={true}
                    data_1={orders}
                    data_2={[]}
                    title_1="Products"
                    title_2=""
                    bgColor_1={`hsl(180, 40%, 50%)`}
                    bgColor_2=""
                    labels={last12Months}
                    />

            <h2>Orders throughout the year</h2>
                </section>
                        </>
                    )
                }
            </main>
        </div>
    )
}











export default BarCharts