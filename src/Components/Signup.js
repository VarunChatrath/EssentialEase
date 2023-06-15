import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

var Signup = () => {
	const [name, setname] = useState("");
	const [phone, setphone] = useState("");
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");
	const [cpassword, setcpassword] = useState("");
	const [msg, setmsg] = useState("");
	const navigate = useNavigate();

	var onSignup = async () => {
		if (!name || !phone || !username || !password || !cpassword) {
			setmsg("Please fill in all the fields.");
			return;
		}

		if (password !== cpassword) {
			setmsg("Password and confirm password do not match.");
			return;
		}

		const signupdata = {
			name,
			phone,
			username,
			password,
			utype: "normal",
		};

		try {
			const resp = await fetch("http://localhost:9000/api/register", {
				method: "post",
				body: JSON.stringify(signupdata),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});

			if (resp.ok) {
				var result = await resp.json();
				if (result.statuscode === 1) {
					navigate("/thanks");
				} else if (result.statuscode === 0) {
					setmsg("Error while signing up, please try again.");
				}
			} else {
				setmsg("An error occurred.");
			}
		} catch (err) {
			setmsg(err);
		}
	};

	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
						<li>
							<a href="index.html">
								<span className="glyphicon glyphicon-home" aria-hidden="true"></span>
								Home
							</a>
						</li>
						<li className="active">Register Page</li>
					</ol>
				</div>
			</div>

			<div className="register">
				<div className="container">
					<h2>Register Here</h2>
					<div className="login-form-grids">
						<h5>Profile Information</h5>
						<form name="form1">
							<input type="text" name="pname" placeholder="Name..." required onChange={(e) => setname(e.target.value)} />
							<input type="text" name="phone" placeholder="Phone..." required onChange={(e) => setphone(e.target.value)} />
							<h6>Login Information</h6>
							<input type="email" name="uname" placeholder="Email Address (Username)" required onChange={(e) => setusername(e.target.value)} />
							<input type="password" name="pass" placeholder="Password" required onChange={(e) => setpassword(e.target.value)} />
							<input type="password" name="cpass" placeholder="Password Confirmation" required onChange={(e) => setcpassword(e.target.value)} />
							<div className="register-check-box">
								<div className="check">
									<label className="checkbox">
										<input type="checkbox" name="checkbox" />
										<i> </i>I accept the terms and conditions
									</label>
								</div>
							</div>
							<br />
							<input type="button" name="btn" onClick={onSignup} value="Register" />
							<br />
							{msg}
						</form>
					</div>
					<div className="register-home">
						<Link to="/homepage">Home</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
