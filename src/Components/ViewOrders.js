import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var ViewOrders = () => {
    const [orderslist, setorderslist] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchorders();
    }, [])

    var fetchorders = async () => {
        try {
            const resp = await fetch("http://localhost:9000/api/fetchorders")
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
    var onupdate = (oid) => {
        navigate({
            pathname: '/updatestatus',
            search: `?orderid=${oid}`,
        });
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
                                            <th style={{ backgroundColor: "#050A30" }}>Order ID</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Address</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Username</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Date/Time</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Payment Mode</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Status</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Update Status</th>
                                        </tr>
                                        {
                                            orderslist.map((data, i) =>
                                                <tr key={i}>
                                                    <td><Link to={`/orderproducts?oid=${data._id}`}>{data._id}</Link></td>
                                                    <td>{data.address}</td>
                                                    <td>{data.username}</td>
                                                    <td>{data.OrderDate}</td>
                                                    <td>{data.pmode}</td>
                                                    <td>{data.status}</td>
                                                    <td><button onClick={() => onupdate(data._id)}>Update</button></td>
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
export default ViewOrders;