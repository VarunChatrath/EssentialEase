import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

var ContactUs = () => {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [subject, setSubject] = useState();
    const [message, setmessage] = useState();


    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Replace these with your EmailJS Service ID, Template ID, and User ID
        const serviceID = 'service_ihf7wsh';
        const templateID = 'template_2cfaqoq';
        const userID = 'jF6YLY0jk2CnWwv-l';

        emailjs.sendForm(serviceID, templateID, form.current, userID)
            .then((result) => {
                console.log(result.text);
                // Clear the form after successful submission
                form.current.reset();
                toast.success('Message sent successfully!', {
                    position: 'top-center',
                    autoClose: 3000, // Duration in milliseconds the toast should be displayed
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }, (error) => {
                console.log(error.text);
                toast.error('Failed to send message. Please try again later.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    };
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
                        <form ref={form} onSubmit={sendEmail}>
                            <input type="text" placeholder="Your Name..." name="from_name" onChange={(e) => setname(e.target.value)} required=" " /><br />
                            <input type="email" placeholder="Your Email Address" name="from_email" onChange={(e) => setemail(e.target.value)} required=" " /><br />
                            <input type="text" placeholder="Subject" name="subject" onChange={(e) => setSubject(e.target.value)} required=" " /><br />
                            <textarea onChange={(e) => setmessage(e.target.value)} className="form-control" name="message" placeholder="Your Message..."></textarea><br />

                            <button type="submit" className="btn btn-primary" value="Submit" >Submit</button><br /><br />
                        </form>
                    </div>

                </div>
            </div>
        </>)
}
export default ContactUs;