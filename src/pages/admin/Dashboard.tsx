import { BsSearch } from "react-icons/bs"
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
// import data from "../../assets/data.json"
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import { BiMaleFemale } from "react-icons/bi";
// import DashboardTable from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import DashboardTable from "../../components/admin/DashboardTable";
import { Skeleton } from "../../components/Loader";
import { Navigate } from "react-router-dom";
import { getLastMonths } from "../../utils/features";

const {last6Months} = getLastMonths();
const Dashboard = () => {
   const {user} = useSelector(
    (state: RootState) => state.userReducer
  );


  const {isError, isLoading, data} = useStatsQuery(user?._id!);

 const stats = data?.stats!;
 if (isError) return <Navigate to={"/"} />;


  return (
    <div className="adminContainer">


      {/* sidebar */}
      <AdminSidebar />

    
      {/* main */}
    
      <main className="dashboard" >
            {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
                  <div className="bar">
          <BsSearch /> <input type="text" placeholder="Search for data, users, docs" /> <FaRegBell />
          <img src="data:image/jpeg;base64,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" alt="User" />
        </div>

        <section className="widgetcontainer">
          <WidgetItem
          percent={stats?.changePercent.revenue!}
          amount={true}
          value={stats?.count.revenue!}
          heading="Revenue"
          color="rgb(0,115,255)"
          />

               <WidgetItem
          percent={stats?.changePercent.user!}
          value={stats?.count.user!}
          heading="Users"
          color="rgb(0,198,202)"
          />
                <WidgetItem
          percent={stats?.changePercent.order!}
          value={stats?.count.order!}
          heading="Transactions"
          color="rgba(0, 117, 29, 1)"
          />

               <WidgetItem
          percent={stats?.changePercent.product!}
          value={stats?.count.product!}
          heading="Products"
          color="rgb(255, 196, 0)"
          />


        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transactions</h2>
              <BarChart
                labels={last6Months}
                data_1={stats?.chart.orderMonthlyRevenue}
                data_2={stats?.chart.orderMonthCount}
                title_1="Revenue"
                title_2="Transaction"
                bgColor_1="green"
                bgColor_2="red"
                // horizontal= {true} 
              />

          </div>
          <div className="dashboard-categories">
            <h2>Category</h2>
           <div>
                  {stats.categoryCount.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        value={value}
                        heading={heading}
                        color={`hsl(${value * 4}, ${value}%, 50%)`}
                      />
                    );
                  })}
                </div>
          </div>
        </section>

        
        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            {/* {Chart} */}
              <DoughnutChart
               labels={["Female", "Male"]}
                data={[stats.userRatio.female, stats.userRatio.male]}
                 backgroundColor={["green", "orange"]}
                  cutout={90}/>
         
            <p>
              <BiMaleFemale />
            </p>
          </div>

          {/* {Table} */}

                  
                  <DashboardTable data={stats.latestTransactions}  />

        </section>


          </>
        )
        }
      </main>
    
    </div>
  );
};

  interface WidgetItemprops {
    heading : string;
    value: number;
    percent: number;
    color: string;
    amount ? : boolean;
  }
  
  const WidgetItem = ({heading,value,percent,color,amount=false}: WidgetItemprops) => (
    <article className="widget">
      <div className="widgetInfo">
        <p>{heading}</p>
        <h4>{amount ? `$${value}`:value}</h4>
        {percent > 0 ?(
          <span className="green">
            <HiTrendingUp /> +{percent}%{""}
          </span>
        ):(
          <span className="red">
            <HiTrendingDown /> {percent}%{""}
          </span>
        )}
      </div>
      <div className="Widgetcircle" 
      style={{background:`conic-gradient(${percent > 0 ? color: "red"} ${(Math.abs(percent)/100)*360}deg,
      rgb(255,255,255) 0
      )`
      }}>

        <span style={{color: `${percent > 0 ? color: 'red'}`}}>
          {percent}%
        </span>

      </div>
    </article>
  );


  interface CatergoryItemProps{
    color: string;
    value: number;
    heading: string;
  };

  const CategoryItem = ({color, value, heading}:CatergoryItemProps) => (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div
        style={{
          backgroundColor: color, width: `${value}%`,
        }}></div>
      </div>
      <span>{value}%</span>
    </div>
  );




export default Dashboard