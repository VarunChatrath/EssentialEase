import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var UpdateStatus = () => {
    const [params] = useSearchParams();
    const orderid = params.get("orderid");
    const navigate = useNavigate();
    const [newstatus, setnewstatus] = useState();
    var onupdate = async () => {
        try {
            var updatedata = { oid: orderid, newst: newstatus }
            const resp = await fetch("http://localhost:9000/api/updatestatus",
                {
                    method: "put",
                    body: JSON.stringify(updatedata),
                    headers:
                    {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("Problem while updating status, try again");
                }
                else if (result.statuscode === 1) {
                    toast.success("Status updated successfully");
                    navigate("/vieworders");
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
                        <li className="active">Update Status</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Update Status</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1">
                            <select className="form-control" name="newstatus" onChange={(e) => setnewstatus(e.target.value)}>
                                <option value="">Choose New Status</option>
                                <option>Confirmed</option>
                                <option>Shipped</option>
                                <option>In-Transit</option>
                                <option>Out for Delivery</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </select>
                            <br />
                            <input type="button" onClick={onupdate} name="btn" value="Update" /><br />
                        </form>
                    </div>
                </div>
            </div>
        </>)
}
export default UpdateStatus;