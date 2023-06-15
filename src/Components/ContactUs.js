import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
var ContactUs = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [message, setmessage] = useState();

    var onsubmit = async () => {
        var logindata = { name, email, phone, message }
        try {
            const resp = await fetch("http://localhost:9000/api/contactus",
                {
                    method: "post",
                    body: JSON.stringify(logindata),
                    headers:
                    {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })
            if (resp.ok) {
                var result = await resp.json();
                toast.info(result.msg)
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
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">ContactUs</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Contact Us</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1">
                            <input type="text" placeholder="Your Name..." name="pname" onChange={(e) => setname(e.target.value)} required=" " /><br />
                            <input type="email" placeholder="Your Email Address" name="email" onChange={(e) => setemail(e.target.value)} required=" " /><br />
                            <input type="text" placeholder="Your Phone" name="phone" onChange={(e) => setphone(e.target.value)} required=" " /><br />
                            <textarea onChange={(e) => setmessage(e.target.value)} className="form-control" name="msg" placeholder="Your Message..."></textarea><br />

                            <input type="button" className="btn btn-primary" onClick={onsubmit} value="Submit" /><br /><br />
                        </form>
                    </div>

                </div>
            </div>
        </>)
}
export default ContactUs;