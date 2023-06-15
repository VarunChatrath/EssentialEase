import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var UpdateSubCat=()=>
{
	const [subcatname,setsubcatname] = useState();
	const [cat,setcat] = useState();
	const [allcat,setallcat] = useState([]);
	const [picname,setpicname] = useState({});
	const [pic,setpic] = useState();
	const [msg,setmsg] = useState();
    const [params] = useSearchParams();
    const scid = params.get("subcatid");

    function onpicselect(event) 
    {
        setpic(event.target.files[0])
    }
    useEffect(()=>
    {
        fetchallcat();
        fetchsubcatdetails();
    },[])
    var fetchallcat=async()=>
    {
        try 
        {
            const resp = await fetch("http://localhost:9000/api/fetchallcategories")
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    alert("No Categories found");
                }
                else if(result.statuscode===1)
                {
                    setallcat(result.catdata)

                }
            }
            else
            {
                setmsg("Error Occured")
            }
        }
        catch (err) 
        {
            setmsg(err);
        }
    }

    var fetchsubcatdetails=async()=>
    {
        try 
        {
            const resp = await fetch(`http://localhost:9000/api/fetchsubcatbyid?subcatid=${scid}`)
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    toast.error("No subcategory details found");
                }
                else if(result.statuscode===1)
                {
                    setsubcatname(result.subcatdata.subcatname);
                    setcat(result.subcatdata.catid);
                    setpicname(result.subcatdata.subcatpic);
                }
            }
            else
            {
                setmsg("Error Occured")
            }
        }
        catch (err) 
        {
            setmsg(err);
        }
    }

    var onupdate=async()=>
    {
        var myform = new FormData();
        myform.append("scid",scid);
        myform.append("cid",cat);//either oldcat or new cat
        myform.append("scname",subcatname);//either oldname or newname
        if(pic!==null)
        {
            myform.append("picture",pic)
        }
        myform.append("oldpicname",picname);
        try 
        {
            const resp = await fetch("http://localhost:9000/api/updatesubcategory",
            {
                method:"put",
                body: myform
            })
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===1)
                {
                    toast.success("Sub Category updated successfully")
                }
                else if(result.statuscode===0)
                {
                    toast.error("Sub Category not updated successfully");
                }
            }
            else
            {
                setmsg("Error Occured")
            }
        }
        catch (err) 
        {
            setmsg(err);
        }
    }
	var onsubcatadd=async ()=>
	{
        var myform = new FormData();
        myform.append("catid",cat);
        myform.append("scname",subcatname);
        myform.append("picture",pic)
        try 
        {
            const resp = await fetch("http://localhost:9000/api/addsubcategory",
            {
                method:"post",
                body: myform
            })
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===1)
                {
                    setmsg("Sub Category added successfully")
                }
                else if(result.statuscode===0)
                {
                    setmsg("Sub Category not added successfully");
                }
            }
            else
            {
                setmsg("Error Occured")
            }
        }
        catch (err) 
        {
            setmsg(err);
        }		
	}

	return(
    <>
	    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Update Sub Category</li>
			</ol>
		</div>
	    </div>

	<div className="register">
		<div className="container">
			<h2>Update Sub Category</h2>
			<div className="login-form-grids">
				<form name="form1">
                    <select name="cat" className="form-control" value={cat} onChange={(e)=>setcat(e.target.value)}>
                        <option value="">Choose Category</option>
                        {
                            allcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.catname}</option>
                            )
                        }
                    </select>
					<input type="text" name="subcatname" value={subcatname} placeholder="Sub Category Name..." required=" " onChange={(e)=>setsubcatname(e.target.value)}/>
					<br/>
                    
                    <img src={`/uploads/${picname}`} alt='subcatpic"' height="100"/><br/><br/><b>Choose new image, if required</b><br/>
                    <input type="file" name="subcatpic" onChange={onpicselect} required=" "/><br/>

                    
					<input type="button" name="btn" onClick={onupdate} value="Update Sub Category"/><br/>
					{msg}
				</form>
			</div>
		</div>
	</div>
    </>)
}
export default UpdateSubCat;