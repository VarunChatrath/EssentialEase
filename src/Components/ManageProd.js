import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

var ManageProduct = () => {
    const [cat, setCat] = useState("");
    const [allCat, setAllCat] = useState([]);
    const [subCat, setSubCat] = useState("");
    const [allSubCat, setAllSubCat] = useState([]);
    const [prodsData, setProdsData] = useState([]);
    const [prodName, setProdName] = useState("");
    const [rate, setRate] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState("");
    const [pic, setPic] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    function onPicSelect(event) {
        setPic(event.target.files[0]);
    }

    useEffect(() => {
        fetchAllCat();
    }, []);

    useEffect(() => {
        fetchSubCat();
    }, [cat]);

    useEffect(() => {
        fetchProds();
    }, [subCat]);

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
        if (cat !== "") {
            try {
                setAllSubCat([]);
                setProdsData([]);
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

    var fetchProds = async () => {
        if (subCat !== "") {
            try {
                const resp = await fetch(`http://localhost:9000/api/fetchprodsbysubcatid/${subCat}`);
                if (resp.ok) {
                    var result = await resp.json();
                    if (result.statuscode === 0) {
                        // toast.error("No products found");
                        setProdsData([]);
                    } else if (result.statuscode === 1) {
                        setProdsData(result.prodsdata);
                    }
                } else {
                    toast.error("Error Occurred");
                }
            } catch (err) {
                setMsg(err);
            }
        }
    };

    var onUpdate = (pid) => {
        navigate({
            pathname: '/updateproduct',
            search: `?prodid=${pid}`,
        });
    };

    var onProdAdd = async () => {
        if (cat === "" || subCat === "" || prodName === "" || rate === "" || discount === "" || stock === "" || description === "" || featured === "" || !pic) {
            setMsg("Please fill all the fields");
            return;
        }

        var myForm = new FormData();
        myForm.append("catid", cat);
        myForm.append("subcatid", subCat);
        myForm.append("pname", prodName);
        myForm.append("rate", rate);
        myForm.append("discount", discount);
        myForm.append("stock", stock);
        myForm.append("description", description);
        myForm.append("featured", featured);
        myForm.append("picture", pic);

        try {
            const resp = await fetch("http://localhost:9000/api/addproduct", {
                method: "post",
                body: myForm
            });

            if (resp.ok) {
                var result = await resp.json();
                if (result.statuscode === 1) {
                    toast.success("Product added successfully");
                } else if (result.statuscode === 0) {
                    setMsg("Product not added successfully");
                }
            } else {
                setMsg("Error Occurred");
            }
        } catch (err) {
            setMsg(err);
        }
    };
    // Delete product
    const onDelete = async (pid) => {
        try {
            const resp = await fetch(`http://localhost:9000/api/deleteproduct/${pid}`, {
                method: 'DELETE',
            });

            if (resp.ok) {
                const result = await resp.json();
                if (result.statuscode === 1) {
                    toast.success('Product deleted successfully');
                    fetchProds(); // Refresh the product list after deletion
                } else {
                    toast.error('Failed to delete product');
                }
            } else {
                toast.error('Error Occurred');
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
                        <li className="active">Manage Product</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Manage Product</h2>
                    <div className="login-form-grids">
                        <form name="form1">
                            <select name="cat" className="form-control" onChange={(e) => setCat(e.target.value)}>
                                <option value="">Choose Category</option>
                                {allCat.map((data, i) => (
                                    <option value={data._id} key={i}>{data.catname}</option>
                                ))}
                            </select><br />
                            <select name="subcat" className="form-control" onChange={(e) => setSubCat(e.target.value)}>
                                <option value="">Choose Sub Category</option>
                                {allSubCat.map((data, i) => (
                                    <option value={data._id} key={i}>{data.subcatname}</option>
                                ))}
                            </select><br />
                            <input type="text" name="prodname" placeholder="Product Name..." required=" " onChange={(e) => setProdName(e.target.value)} /><br />

                            <input type="text" name="rate" placeholder="Rate..." required=" " onChange={(e) => setRate(e.target.value)} /><br />

                            <input type="text" name="discount" placeholder="Discount..." required=" " onChange={(e) => setDiscount(e.target.value)} /><br />

                            <input type="text" name="stock" placeholder="Stock..." required=" " onChange={(e) => setStock(e.target.value)} /><br />

                            <textarea name="description" className="form-control" placeholder="Description..." required=" " onChange={(e) => setDescription(e.target.value)}></textarea><br />

                            Featured Product &nbsp;
                            <label><input type="radio" onChange={(e) => setFeatured(e.target.value)} name="featured" value="yes" />Yes</label>&nbsp;
                            <label><input type="radio" onChange={(e) => setFeatured(e.target.value)} name="featured" value="no" />No</label><br />

                            <br /><input type="file" name="prodpic" onChange={onPicSelect} required=" " /><br />
                            <input type="button" name="btn" onClick={onProdAdd} value="Add Product" /><br />
                            {msg}
                        </form>
                    </div>

                    {prodsData.length > 0 ? (
                        <div>
                            <h2>Added Products</h2><br />
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th style={{ backgroundColor: "#050A30" }}>Picture</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Name</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Rate</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Stock</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Update</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Delete</th>
                                    </tr>
                                    {prodsData.map((data, i) => (
                                        <tr key={i}>
                                            <td><img alt="product_pic" src={`uploads/${data.prodpic}`} height='75' /></td>
                                            <td>{data.prodname}</td>
                                            <td>{data.rate}</td>
                                            <td>{data.stock}</td>
                                            <td><button onClick={() => onUpdate(data._id)}>Update</button></td>
                                            <td><button onClick={() => onDelete(data._id)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ManageProduct;
