import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var CreateAdmin = () => {
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    const [cpassword, setcpassword] = useState();
    const [msg, setmsg] = useState();
    const navigate = useNavigate();
    var onsignup = async () => {
        if (password === cpassword) {
            const signupdata = { name, phone, username, password, utype: "admin" };
            try {
                const resp = await fetch("http://localhost:9000/api/register",
                    {
                        method: "post",
                        body: JSON.stringify(signupdata),
                        headers:
                        {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    })
                if (resp.ok) {
                    var result = await resp.json(); //result={msg:"Signup Successfull"}
                    if (result.statuscode === 1) {
                        toast.success("Admin created successfully");
                    }
                    else if (result.statuscode === 0) {
                        setmsg("Error while signing up, try again");
                    }
                }
                else {
                    setmsg("Error Occured")
                }
            }
            catch (err) {
                setmsg(err);
            }
        }
        else {
            setmsg("Password and confirm password does not match");
        }

    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Create Admin</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Create Admin</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1">
                            <input type="text" name="pname" placeholder="Name..." required=" " onChange={(e) => setname(e.target.value)} />
                            <input type="text" name="phone" placeholder="Phone..." required=" " onChange={(e) => setphone(e.target.value)} />
                            <h6>Login information</h6>

                            <input type="email" name="uname" placeholder="Email Address(Username)" required=" " onChange={(e) => setusername(e.target.value)} />
                            <input type="password" name="pass" placeholder="Password" required=" " onChange={(e) => setpassword(e.target.value)} />
                            <input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e) => setcpassword(e.target.value)} />
                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox"><input type="checkbox" name="checkbox" /><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div><br />
                            <input type="button" name="btn" onClick={onsignup} value="Submit" /><br />
                            {msg}
                        </form>
                    </div>
                    <div className="register-home">
                        <Link to="/homepage">Home</Link>
                    </div>
                </div>
            </div>
        </>)
}
export default CreateAdmin;