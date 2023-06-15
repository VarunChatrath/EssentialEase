import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../UserContext";
var ShowCart = () => {
    const [cartdata, setcartdata] = useState([]);
    const [carttotal, setcarttotal] = useState();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            fetchcart();
        }
    }, [user])

    useEffect(() => {
        var gtotal = 0;
        for (var i = 0; i < cartdata.length; i++) {
            gtotal = gtotal + cartdata[i].tcost;//81+692=
        }
        setcarttotal(gtotal);
        sessionStorage.setItem("billamt", gtotal)
    }, [cartdata])

    var fetchcart = async () => {
        try {
            setcartdata([]);
            const resp = await fetch(`http://localhost:9000/api/fetchcart/${user.username}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 1) {
                    setcartdata(result.cartdata);
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

    var gotocheckout = () => {
        navigate("/checkout");
    }

    var ondel = async (uid) => {
        var uchoice = window.confirm("Are you sure to delete?");
        if (uchoice) {
            try {
                const resp = await fetch(`http://localhost:9000/api/delcartbyid/${uid}`,
                    {
                        method: "delete"
                    })
                if (resp.ok) {
                    var result = await resp.json(); //result={msg:"Signup Successfull"}
                    if (result.statuscode === 1) {
                        toast.success("Product deleted successfully");
                        fetchcart();
                    }
                    else if (result.statuscode === 0) {
                        alert("Error while deleting, try again");
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
    }


    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Your Cart</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        cartdata.length > 0 ?
                            <>
                                <h2>Your Cart</h2><br />
                                <table className="timetable_sub">
                                    <tbody>
                                        <tr>
                                            <th style={{ backgroundColor: "#050A30" }}>Picture</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Name</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Rate</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Quantity</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Total Cost</th>
                                            <th style={{ backgroundColor: "#050A30" }}>Delete</th>
                                        </tr>
                                        {
                                            cartdata.map((data, i) =>
                                                <tr key={i}>
                                                    <td><img src={`uploads/${data.prodpic}`} height='75' alt="prodpic" /></td>
                                                    <td>{data.name}</td>
                                                    <td>{data.rate}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.tcost}</td>
                                                    <td><button className="btn btn-danger" onClick={() => ondel(data._id)}>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table><br />Your cart total is Rs.{carttotal}/-<br /><br />
                                <button className="btn btn-primary" onClick={gotocheckout}>Checkout</button>
                            </> : <h2>Your cart is empty. Please add something</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ShowCart;