import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
var ChangePassword = () => {
    const [currpass, setcurrpass] = useState();
    const [newpass, setnewpass] = useState();
    const [cnewpass, setcnewpass] = useState();
    const [msg, setmsg] = useState();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    var onpasschange = async () => {
        if (newpass === cnewpass) {
            var apidata = { uname: user.username, currpass, newpass }
            try {
                const resp = await fetch("http://localhost:9000/api/changepassword",
                    {
                        method: "put",
                        body: JSON.stringify(apidata),
                        headers:
                        {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    })
                if (resp.ok) {
                    var result = await resp.json(); //result={msg:"Signup Successfull"}
                    if (result.statuscode === -1) {
                        toast.error("Invalid Username");
                    }
                    else if (result.statuscode === 0) {
                        toast.error("Incorrect Current Password");
                    }
                    else if (result.statuscode === 1) {
                        toast.success("Password changed successfully");
                        setUser(null);
                        sessionStorage.clear();
                        navigate("/login");
                    }
                    else if (result.statuscode === 2) {
                        toast.error("Problem while updating password, try again");
                    }
                }
                else {
                    toast.error("Error Occured")
                }
            }
            catch (err) {
                setmsg(err);
            }
        }
        else {
            toast.error("New Password and confirm new password doesn't match")
        }

    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Change Password</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Change Password</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1">
                            <input type="password" placeholder="Current Password" name="currpass" onChange={(e) => setcurrpass(e.target.value)} required=" " />
                            <input type="password" placeholder="New Password" name="newpass" onChange={(e) => setnewpass(e.target.value)} required=" " />
                            <input type="password" placeholder="Confirm New Password" name="cnewpass" onChange={(e) => setcnewpass(e.target.value)} required=" " />

                            <input type="button" onClick={onpasschange} value="Change Password" /><br /><br />
                            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>)
}
export default ChangePassword;