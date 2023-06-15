import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Searchuser() {
  const [uname, setuname] = useState("")
  const [msg, setMsg] = useState("")
  const [udata, setudata] = useState({})
  const [flag, setflag] = useState(false)
  var onsearch = async () => {
    try {
      const resp = await fetch(`http://localhost:9000/api/searchmember?un=${uname}`)
      if (resp.ok) {
        var result = await resp.json()
        if (result.statuscode === 0) {
          setflag(false)
          setMsg('Invalid Username')
          setudata({});
        } else if (result.statuscode === 1) {
          setflag(true)
          setMsg("")
          setudata(result.membdata)
        }
      } else {
        setMsg('Error Occured')
      }
    } catch (err) {
      setMsg(err)
    }
  }


  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
            <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
            <li className="active">Search User</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>Search User</h2>
          <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
            <form name='form1'>
              <input type="email" name="uname" placeholder="Email Address(Username)" onChange={(e) => setuname(e.target.value)} required="" /><br />
              <input type='button' onClick={onsearch} name='btn' value="Search" /><br />
              {flag ?
                <div>
                  <b>Name:-</b> {udata.name}<br />
                  <b>Phone:-</b> {udata.phone}<br />
                </div>
                : ""
              }
              {msg}
            </form>
          </div>
        </div>
      </div>
    </>
  )

}