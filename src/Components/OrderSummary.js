import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-toastify";

var OrderSummary = () => {
    const {user} = useContext(UserContext);
    const [orderdata,setorderdata] = useState({})
    useEffect(()=>
    {
        if(user)
        {
            fetchorderdetails();
        }
    },[user])

    var fetchorderdetails=async()=>
    {
        try 
        {
            const resp = await fetch(`http://localhost:9000/api/fetchorderdetails?un=${user.username}`)
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    setorderdata({});
                }
                else if(result.statuscode===1)
                {
                    setorderdata(result.orderdata);
                }
            }
            else
            {
                toast.error("Error Occured")
            }
        }
        catch (err) 
        {
            toast.error(err);
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Order Summary</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h3>Thanks for shopping on our website. Your order number is {orderdata._id}</h3>
                </div>
            </div>
        </>
    )
}
export default OrderSummary;