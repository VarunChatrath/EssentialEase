import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageCat = () => {
    const [catname, setCatname] = useState('');
    const [catid, setCatid] = useState('');
    const [pic, setPic] = useState(null);
    const [msg, setMsg] = useState('');
    const [catpic, setCatpic] = useState('');
    const [editmode, setEditMode] = useState(false);
    const [catlist, setCatlist] = useState([]);

    const onPicSelect = (event) => {
        setPic(event.target.files[0]);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const resp = await fetch('http://localhost:9000/api/fetchallcategories');
            if (resp.ok) {
                const result = await resp.json();
                if (result.statuscode === 0) {
                    toast.error('No categories found');
                } else if (result.statuscode === 1) {
                    setCatlist(result.catdata);
                }
            } else {
                toast.error('Error Occurred');
            }
        } catch (err) {
            toast.error(err);
        }
    };

    const onUpdate = (catinfo) => {
        setCatid(catinfo._id);
        setCatname(catinfo.catname);
        setCatpic(catinfo.catpic);
        setEditMode(true);
    };

    const onCancel = () => {
        setCatname('');
        setCatpic('');
        setEditMode(false);
        setMsg('');
        setPic(null);
    };

    const onSubmit = async () => {
        if (catname.trim() === '') {
            toast.error('Category name is required');
            return;
        }

        if (!editmode && pic === null) {
            toast.error('Please select a picture');
            return;
        }

        const myform = new FormData();
        if (!editmode) {
            myform.append('cname', catname);
            myform.append('picture', pic);
            try {
                const resp = await fetch('http://localhost:9000/api/addcategory', {
                    method: 'POST',
                    body: myform,
                });
                if (resp.ok) {
                    const result = await resp.json();
                    if (result.statuscode === 1) {
                        setMsg('Category added successfully');
                        fetchCategories();
                    } else if (result.statuscode === 0) {
                        setMsg('Category not added successfully');
                    }
                } else {
                    setMsg('Error Occurred');
                }
            } catch (err) {
                setMsg(err);
            }
        } else {
            myform.append('cid', catid);
            myform.append('cname', catname);
            if (pic !== null) {
                myform.append('picture', pic);
            }
            myform.append('oldpicname', catpic);
            try {
                const resp = await fetch('http://localhost:9000/api/updatecategory', {
                    method: 'PUT',
                    body: myform,
                });
                if (resp.ok) {
                    const result = await resp.json();
                    if (result.statuscode === 1) {
                        toast.success('Category updated successfully');
                    } else if (result.statuscode === 0) {
                        toast.error('Category not updated successfully');
                    }
                } else {
                    setMsg('Error Occurred');
                }
            } catch (err) {
                setMsg(err);
            }
        }
    };

    const onDelete = async (pId) => {
        try {
            const resp = await fetch(`http://localhost:9000/api/deletecategory/${pId}`, {
                method: 'DELETE',
            });
            if (resp.ok) {
                const result = await resp.json();
                if (result.statuscode === 1) {
                    toast.success('Category deleted successfully');
                    fetchCategories();
                } else if (result.statuscode === 0) {
                    toast.error('Category not deleted successfully');
                }
            } else {
                toast.error('Error Occurred');
            }
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li>
                            <Link to="/adminhome">
                                <span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home
                            </Link>
                        </li>
                        <li className="active">Manage Category</li>
                    </ol>
                </div>
            </div>

            <div className="register">
                <div className="container">
                    <h2>Manage Category</h2>
                    <div className="login-form-grids">
                        <form name="form1">
                            <input
                                type="text"
                                name="catname"
                                value={catname}
                                placeholder="Category Name..."
                                required
                                onChange={(e) => setCatname(e.target.value)}
                            /><br />

                            {editmode ? <img alt="catpic" src={`uploads/${catpic}`} height="75" /> : null}<br />

                            <br /><input type="file" name="catpic" onChange={onPicSelect} required /><br />
                            <input type="button" name="btn" onClick={onSubmit} value={editmode ? 'Update' : 'Add'} />&nbsp;
                            {editmode ? <input type="button" name="btn2" onClick={onCancel} value="Cancel" /> : null}<br />
                            {msg}
                        </form>
                    </div>
                    <br />
                    {catlist.length > 0 ? (
                        <div>
                            <h2>Added Categories</h2><br />
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th style={{ backgroundColor: "#050A30" }}>Picture</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Name</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Update</th>
                                        <th style={{ backgroundColor: "#050A30" }}>Delete</th>
                                    </tr>
                                    {catlist.map((data, i) => (
                                        <tr key={i}>
                                            <td><img alt="categorypic" src={`uploads/${data.catpic}`} height="75" /></td>
                                            <td>{data.catname}</td>
                                            <td><button onClick={() => onUpdate(data)}>Update</button></td>
                                            <td><button onClick={() => onDelete(data._id)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h2>No categories found</h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default ManageCat;
