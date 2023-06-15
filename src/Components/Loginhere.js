import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
var Login = () => {
	const [uname, setuname] = useState();
	const [pass, setpass] = useState();
	const [msg, setmsg] = useState();
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	var onlogin = async () => {
		var logindata = { uname, pass }
		try {
			const resp = await fetch("http://localhost:9000/api/login",
				{
					method: "post",
					body: JSON.stringify(logindata),
					headers:
					{
						'Content-type': 'application/json; charset=UTF-8',
					}
				})
			if (resp.ok) {
				var result = await resp.json(); //result={msg:"Signup Successfull"}
				if (result.statuscode === 1) {
					setmsg("");
					setUser(result.membdata);
					sessionStorage.setItem("userinfo", JSON.stringify(result.membdata));
					if (result.membdata.usertype === "admin") {
						navigate("/adminhome");
					}
					else {
						navigate("/homepage");
					}
				}
				else if (result.statuscode === 0) {
					setmsg("Incorrect Username/Password");
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
	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
						<li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
						<li className="active">Login</li>
					</ol>
				</div>
			</div>

			<div className="login">
				<div className="container">
					<h2>Login Form</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1">
							<input type="email" placeholder="Email Address" name="un" onChange={(e) => setuname(e.target.value)} required=" " />
							<input type="password" placeholder="Password" name="pass" onChange={(e) => setpass(e.target.value)} required=" " />
							<div className="forgot">
								<a href="#">Forgot Password?</a>
							</div><br />
							<input type="button" className="btn btn-primary" onClick={onlogin} value="Login" /><br /><br />
							{msg}
						</form>
					</div>
					<h4>For New People</h4>
					<p><Link to="/signup">Register Here</Link> (Or) go back to <Link to="/homepage">Home<span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></Link></p>
				</div>
			</div>
		</>)
}
export default Login;