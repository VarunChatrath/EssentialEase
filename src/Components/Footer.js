import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
	return (
		<>
			<div className="footer" style={{ paddingTop: "42px", backgroundColor: 'rgb(1 5 36)' }} >
				<div className="container">
					<div className="row" style={{ color: "white" }}>
						<div className="col-md-12">
							<h1 className="text-center">All rights reserved &copy; Varun Chatrath</h1>
							<h4 className="text-center" style={{ padding: "10px" }}>Contact</h4>
							<ul className="address list-inline text-center d-flex justify-content-between " >
								<li><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i>1234k Avenue, 4th block, <span>New York City.</span></li>
								<li><i className="glyphicon glyphicon-envelope" style={{ textDecoration: "none" }} aria-hidden="true"></i>2001varunchatrath@gmail.com</li>
								<li><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>+91 99152 293504</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>



	)
}
