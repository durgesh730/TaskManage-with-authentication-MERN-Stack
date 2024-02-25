import React, { useState } from 'react'
import './main.css'
import Shownotes from '../Notes/Shownotes';
import Navbar from '../Navbar/Navbar';

const Main = () => {

  const port = "http://localhost:5000"
  const [note, setNote] = useState({ title: "", description: "", date: "" })

  const setval = (e) => {
    const { name, value } = e.target

    setNote(() => {
      return {
        ...note,
        [name]: value
      }
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { title, description, date } = note
    if (title === '') {
      alert('Your Title is Required')
    } else if (description === "") {
      alert('Your Description is Required')
    } else {
      const data = await fetch(`${port}/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, date })
      })
      const res = await data.json()
      window.location.reload()
    }
  }

  return (
    <>
      <Navbar />
      <div className='container' >
        <form className='form' onSubmit={handlesubmit}>
          <div className="notes" >

            <div className='topheading my-4 ' >
              <h2>Write Your Notes Here...</h2>
            </div>

            <div className="bothinput ">
              <div className='inputs  col-10 my-4 '>

                <input type="title" className="form-control" id="title" value={note.title}
                  name="title" aria-describedby="emailHelp" placeholder="Title " onChange={setval} /></div>
              <div className='col-10 inputs ' >

                <input type="date" className="form-control" id="date" value={note.date}
                  name="date" aria-describedby="emailHelp" onChange={setval} />
              </div>
            </div>

            <div className=" textarea col-9 my-4  ">
              <textarea type="description" rows="6" className="form-control" id="description"
                value={note.description} name="description" placeholder="Description" onChange={setval} />
            </div>
            <div className="text-center" >
              <button type="submit" className="btn submit ">Submit</button></div>
          </div>
        </form>
      </div>
      <Shownotes />
    </>
  )
}

export default Main
