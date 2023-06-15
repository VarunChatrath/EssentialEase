import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useState } from "react";

var AdminHeader = () => {
    const [term, setterm] = useState();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    var onlogout = () => {
        setUser(null);
        sessionStorage.clear();
        navigate("/login");
    }


    return (
        <>
            <div className="agileits_header" style={{ backgroundColor: '#050A30' }}>
                <div className="container">
                    <div className="w3l_offers">
                        {
                            user ?
                                <p>
                                    <span>Welcome {user.name}</span>
                                </p> :
                                <p>
                                    <span>Welcome Guest</span>
                                </p>
                        }
                    </div>
                    <div className="agile-login">
                        <ul>
                            {
                                user ?
                                    <>
                                        <li><Link to="/changepassword"> Change Password </Link></li>
                                        <li><Link to="/orderhistory"> My orders </Link></li>
                                        <li><button className="btn btn-danger" onClick={onlogout}> Logout </button></li>
                                    </> :
                                    <>
                                        <li><Link to="/signup"> Create Account </Link></li>
                                        <li><Link to="/login">Login</Link></li>
                                    </>
                            }
                        </ul>
                    </div>

                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="logo_products">
                <div className="container">
                    <div className="w3ls_logo_products_left1">
                        <ul className="phone_email">
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>

                        </ul>
                    </div>
                    <div className="w3ls_logo_products_left">
                        <h1 ><Link to="/adminhome" style={{ color: '#050A30' }}>Essential Ease</Link></h1>
                    </div>


                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="navigation-agileits" style={{ backgroundColor: '#050A30' }}>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li><Link to="/adminhome">Home</Link></li>

                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Manage<b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="multi-gd-img">
                                                <ul class="multi-column-dropdown">
                                                    <li><Link to="/managecategory">Category</Link></li>
                                                    <li><Link to="/managesubcategory">Sub Category</Link></li>
                                                    <li><Link to="/manageprod">Product</Link></li>
                                                    <li><Link to="/createadmin">Admin</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">View<b class="caret"></b></a>
                                    <ul class="dropdown-menu multi-column columns-3">
                                        <div class="row">
                                            <div class="multi-gd-img">
                                                <ul class="multi-column-dropdown">
                                                    <li><Link to="/vieworders">Orders</Link></li>
                                                    <li><Link to="/viewmembers">Members</Link></li>
                                                    <li><Link to="/searchmembers">Search Member</Link></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default AdminHeader;