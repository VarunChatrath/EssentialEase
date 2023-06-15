import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../UserContext";
var UserOrders = () => {
    const [orderslist, setorderslist] = useState([]);
    const { user } = useContext(UserContext);
    useEffect(() => {
        fetchorders();
    }, [])

    var fetchorders = async () => {
        try {
            const resp = await fetch(`http://localhost:9000/api/fetchuserorders/${user.username}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No orders found");
                }
                else if (result.statuscode === 1) {
                    setorderslist(result.ordersdata);
                }

            }
            else {
                toast.error("Error Occured")
            }
        }
        catch (err) {
            toast.error(err);
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">View Orders</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        orderslist.length > 0 ?
                            <>
                                <h2>View Orders</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Address</th>
                                            <th>Date/Time</th>
                                            <th>Payment Mode</th>
                                            <th>Status</th>
                                        </tr>
                                        {
                                            orderslist.map((data, i) =>
                                                <tr key={i}>
                                                    <td><Link to={`/orderproducts?oid=${data._id}`}>{data._id}</Link></td>
                                                    <td>{data.address}</td>
                                                    <td>{data.OrderDate}</td>
                                                    <td>{data.pmode}</td>
                                                    <td>{data.status}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </> : <h2>No orders found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default UserOrders;