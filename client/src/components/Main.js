import React, { useEffect, useState } from 'react'
import '../components/main.css'
import Shownotes from './Shownotes';
import pic from '../image/Notebook-amico.svg'
import Navbar from './Navbar';

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

  // const getId = localStorage.getItem('login')
  // console.log(getId)

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
      // console.log(res)
      window.location.reload()
      // console.log(data)
    }
  }

  return (
    <>
     <Navbar/>
      <div className='container' >
        <form className='form' onSubmit={handlesubmit}>
          <div className="notes" >

            <div className='head' >
              <div className='topheading' >

                <img src={pic} alt="img" />
              </div>
              <div className='topheading' >

                <h2>Write Your Notes Here...</h2>
              </div>
            </div>

            <div className="d-flex bothinput ">
              <div className='inputs col-5'>
            
                <input type="title" className="form-control" id="title" value={note.title} 
                name="title" aria-describedby="emailHelp" placeholder="Title " onChange={setval} /></div>
              <div className='col-5 inputs ' >

                <input type="date" className="form-control" id="date" value={note.date} 
                name="date" aria-describedby="emailHelp" onChange={setval} />
              </div></div>

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
