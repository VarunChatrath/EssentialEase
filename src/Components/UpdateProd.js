import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

var UpdateProduct = () => {

    const [cat, setCat] = useState();
    const [allcat, setAllCat] = useState([]);
    const [subcat, setSubCat] = useState();
    const [allsubcat, setAllSubCat] = useState([]);
    const [prodname, setProdName] = useState();
    const [rate, setRate] = useState();
    const [discount, setDiscount] = useState();
    const [stock, setStock] = useState();
    const [description, setDescription] = useState();
    const [featured, setFeatured] = useState();
    const [pic, setPic] = useState();
    const [msg, setMsg] = useState();
    const [picname, setPicName] = useState();
    const [params] = useSearchParams();
    const pid = params.get("prodid");

    function onPicSelect(event) {
        setPic(event.target.files[0]);
    }

    useEffect(() => {
        fetchProdById();
    }, []);

    useEffect(() => {
        fetchAllCat();
    }, []);

    useEffect(() => {
        fetchSubCat();
    }, [cat]);

    var fetchAllCat = async () => {
        try {
            const resp = await fetch("http://localhost:9000/api/fetchallcategories");
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    alert("No Categories found");
                } else if (result.statuscode === 1) {
                    setAllCat(result.catdata);
                }
            } else {
                setMsg("Error Occurred");
            }
        } catch (err) {
            setMsg(err);
        }
    };

    var fetchSubCat = async () => {
        if (cat !== undefined) {
            try {
                setAllSubCat([]);
                const resp = await fetch(`http://localhost:9000/api/fetchsubcatbycatid?cid=${cat}`);
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode === 0) {
                        alert("No Sub Categories found");
                    } else if (result.statuscode === 1) {
                        setAllSubCat(result.subcatdata);
                    }
                } else {
                    toast.error("Error Occurred");
                }
            } catch (err) {
                setMsg(err);
            }
        }
    };

    var fetchProdById = async () => {
        try {
            const resp = await fetch(`http://localhost:9000/api/fetchprodbyid/${pid}`);
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error("No product details found");
                } else if (result.statuscode === 1) {
                    setCat(result.proddata.catid);
                    setSubCat(result.proddata.subcatid);
                    setProdName(result.proddata.prodname);
                    setRate(result.proddata.rate);
                    setDiscount(result.proddata.discount);
                    setStock(result.proddata.stock);
                    setDescription(result.proddata.descritpion);
                    setFeatured(result.proddata.featured);
                    setPicName(result.proddata.prodpic);
                }
            } else {
                setMsg("Error Occurred");
            }
        } catch (err) {
            setMsg(err);
        }
    };

    var onProdUpdate = async () => {
        var myform = new FormData();
        myform.append("catid", cat);
        myform.append("subcatid", subcat);
        myform.append("pname", prodname);
        myform.append("rate", rate);
        myform.append("discount", discount);
        myform.append("stock", stock);
        myform.append("description", description);
        myform.append("featured", featured);
        myform.append("picture", pic);
        try {
            const resp = await fetch(`http://localhost:9000/api/updateprod/${pid}`, {
                method: "put",
                body: myform,
            });
            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 1) {
                    toast.success("Product updated successfully");
                } else {
                    toast.error("Product update failed");
                }
            } else {
                toast.error("Error Occurred");
            }
        } catch (err) {
            setMsg(err);
        }
    };

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Update Product</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Update Product</h2>
                    <div className="login-form-grids">
                        <form name="form1">
                            <select name="cat" className="form-control" value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option value="">Choose Category</option>
                                {allcat.map((data, i) => (
                                    <option value={data._id} key={i}>{data.catname}</option>
                                ))}
                            </select><br />
                            <select name="subcat" className="form-control" value={subcat} onChange={(e) => setSubCat(e.target.value)}>
                                <option value="">Choose Sub Category</option>
                                {allsubcat.map((data, i) => (
                                    <option value={data._id} key={i}>{data.subcatname}</option>
                                ))}
                            </select><br />
                            <input type="text" name="prodname" value={prodname} placeholder="Product Name..." required=" " onChange={(e) => setProdName(e.target.value)} /><br />

                            <input type="text" name="rate" value={rate} placeholder="Rate..." required=" " onChange={(e) => setRate(e.target.value)} /><br />

                            <input type="text" name="discount" value={discount} placeholder="Discount..." required=" " onChange={(e) => setDiscount(e.target.value)} /><br />

                            <input type="text" name="stock" value={stock} placeholder="Stock..." required=" " onChange={(e) => setStock(e.target.value)} /><br />

                            <textarea name="description" value={description} className="form-control" placeholder="Description..." required=" " onChange={(e) => setDescription(e.target.value)}></textarea><br />

                            Featured Product &nbsp;
                            <label><input type="radio" checked={featured === 'yes'} onChange={(e) => setFeatured(e.target.value)} name="featured" value="yes" />Yes</label>&nbsp;
                            <label><input type="radio" checked={featured === 'no'} onChange={(e) => setFeatured(e.target.value)} name="featured" value="no" />No</label><br /><br />

                            <img src={`/uploads/${picname}`} alt='prodpic"' height="100" /><br /><br /><b>Choose new image, if required</b><br />
                            <br /><input type="file" name="prodpic" onChange={onPicSelect} required=" " /><br />
                            <input type="button" name="btn" onClick={onProdUpdate} value="Update Product" /><br />
                            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProduct;
