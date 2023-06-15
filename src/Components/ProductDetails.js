import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../UserContext";
var ProductDetails = () => {
    const [params] = useSearchParams();
    const pid = params.get("pid");
    const [prodname, setprodname] = useState();
    const [rate, setrate] = useState();
    const [discount, setdiscount] = useState();
    const [stock, setstock] = useState();
    const [description, setdescription] = useState();
    const [picname, setpicname] = useState();
    const [remamt, setremamt] = useState();
    const [qty, setqty] = useState();
    const [availstock] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetchprodbyid();
    }, [])
    useEffect(() => {
        var disamt = (discount * rate) / 100;
        setremamt(parseInt(rate) - parseInt(disamt));
    }, [rate, discount])
    useEffect(() => {
        if (stock > 10) {

            for (var i = 1; i <= 10; i++) {
                availstock.push(i)
            }
        }
        else {
            for (i = 1; i <= stock; i++) {
                availstock.push(i)
            }
        }
    }, [stock])

    var fetchprodbyid = async () => {
        try {
            const resp = await fetch(`http://localhost:9000/api/fetchprodbyid/${pid}`)
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No product details found");
                }
                else if (result.statuscode === 1) {
                    // setcat(result.proddata.catid);
                    // setsubcat(result.proddata.subcatid);
                    // setfeatured(result.proddata.featured);
                    setprodname(result.proddata.prodname);
                    setrate(result.proddata.rate);
                    setdiscount(result.proddata.discount);
                    setstock(result.proddata.stock);
                    setdescription(result.proddata.descritpion);
                    setpicname(result.proddata.prodpic);
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
    var onaddtocart = async () => {
        if (user) {
            if (!qty) {
                toast.error("Please choose a quantity");
                return;
            }
            var tcost = remamt * qty;
            const cartdata = { pid, prodname, rate: remamt, qty, tcost, picname, uname: user.username };
            try {
                const resp = await fetch("http://localhost:9000/api/addtocart",
                    {
                        method: "post",
                        body: JSON.stringify(cartdata),
                        headers:
                        {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    })
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode === 1) {
                        navigate("/cart");
                    }
                    else if (result.statuscode === 0) {
                        toast.error("Error while adding to cart, try again");
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
        else {
            toast.error("Please login to add product to cart");
            navigate("/login");
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Product Details</li>
                    </ol>
                </div>
            </div>
            <div className="products">
                <div className="container">
                    <div className="agileinfo_single">

                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`/uploads/${picname}`} alt="prodpic" className="img-responsive" />
                        </div>
                        <div className="col-md-8 agileinfo_single_right">
                            <h2>{prodname}</h2>
                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p>{description}</p>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">Rs.{remamt}/-<span>Rs.{rate}/-</span></h4>
                                </div>
                                <div className="snipcart-details agileinfo_single_right_details">
                                    {
                                        stock > 0 ?
                                            <>
                                                <fieldset>
                                                    <select name="qty" onChange={(e) => setqty(e.target.value)} className="form-control">
                                                        <option value="">Choose Quantity</option>
                                                        {
                                                            availstock.map((item, i) =>
                                                                <option key={i}>{item}</option>
                                                            )
                                                        }
                                                    </select><br />
                                                    <input type="submit" onClick={onaddtocart} name="submit" value="Add to cart" className="button" />
                                                </fieldset>
                                            </> : "Out of Stock"
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetails;