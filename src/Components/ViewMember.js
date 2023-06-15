import React from 'react'
import { useState, useEffect } from 'react'

export default function ViewMember() {
  const [msg, setMsg] = useState()
  const [membslist, setMembsList] = useState()

  useEffect(() => {
    fetchMembers()
  }, [])

  var fetchMembers = async () => {
    try {
      const resp = await fetch('http://localhost:9000/api/fetchallmembers')
      if (resp.ok) {
        var result = await resp.json()
        if (result.statuscode === 0) {
          setMsg('No members found')
        } else if (result.statuscode === 1) {
          setMembsList(result.membsdata)
        }
      } else {
        setMsg('Error Occured')
      }
    } catch (err) {
      setMsg(err)
    }
  }
  var ondell = async (uid) => {
    var uchoice = window.confirm("Are you sure to delete?")
    if (uchoice) {
      try {
        const resp = await fetch(`http://localhost:9000/api/delmember/${uid}`, {
          method: "delete"
        })
        if (resp.ok) {
          var result = await resp.json()
          if (result.statuscode === 1) {
            alert("Member deleted successfully")
            setMembsList([])
            fetchMembers()
          } else if (result.statuscode === 0) {
            alert("Error while deleting, try again")
          }
        } else {
          setMsg('Error Occured')
        }
      } catch (err) {
        setMsg(err)
      }
    }
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
            <li><a href="index.html"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</a></li>
            <li className="active">Login Page</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>List of Members</h2>
          {
            membslist && membslist.length > 0 ? (
              <table className='timetable_sub'>
                <tbody>
                  <tr>
                    <th style={{ backgroundColor: "#050A30" }}>Name</th>
                    <th style={{ backgroundColor: "#050A30" }}>Phone</th>
                    <th style={{ backgroundColor: "#050A30" }}>Username</th>
                    <th style={{ backgroundColor: "#050A30" }}>Delete</th>
                  </tr>
                  {membslist.map((data, i) => (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.phone}</td>
                      <td>{data.username}</td>
                      <td><button onClick={() => ondell(data._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          {msg}
        </div>
      </div>
    </>
  )

}
