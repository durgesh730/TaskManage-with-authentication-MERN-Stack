import React, { useEffect, useState } from 'react'
import '../Main/main.css'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import img from '../../image/Notes-amico.png'
import Footer from '../Footer/Footer'


const Shownotes = () => {

    const port = "http://localhost:5000"

    const [note, setNote] = useState()
    const [input, setInput] = useState({ search: '' });
    const [id, setId] = useState();

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);
        const handleChange = (event) => {
            setValue(event.target.value);
        };
        const changeValue = (v) => {
            setValue(v)
        }
        return {
            value,
            onChange: handleChange,
            onSet: changeValue
        };
    };

    const title = useInput("");
    const description = useInput("");


    const handleOpen = (not) => {
        title.onSet(not.title);
        description.onSet(not.description);
        setId(not._id)
        document.getElementById("myModal").style.display = "block";
    }

    function handleClose() {
        document.getElementById("myModal").style.display = "none";
    }

    const setGet = (e) => {
        const { name, value } = e.target

        setInput(() => {
            return {
                ...input,
                [name]: value
            }
        })
    }

    //  handle Store edited Notes in data base    

    const handleSumNote = async () => {
        const Note = await fetch(`${port}/editnotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description })
        })
        const data = await Note.json();
        if (data.status === 201) {
            window.location.reload()
        } else {
            alert('some error occured ')
        }
    }

    // Show All Notes according Users 

    const handleshow = async (e) => {
        const data = await fetch(`${port}/notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
        const json = await data.json()
        if (json !== null) {
            setNote(json)
        }
    }

    // Search Notes 

    const handleSearch = async (e) => {
        e.preventDefault();
        const { search } = input;
        console.log(search)
        const data = await fetch(`${port}/title?title=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
        })
        const json = await data.json()
        setNote(json);
    }

    //  Delete Notes   

    const handleDelete = async (not) => {
        const data = await fetch(`${port}/allnotes/${not._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const json = await data.json()
        window.location.reload()
    }

    useEffect(() => {
        handleshow()
    }, [setNote])

    return (
        <>
            <div className="yournotes">
                <div className='container' >
                    <div className='ImgNotes' >
                        <img src={img} alt="img" />
                        <div>
                            <h1>Your Notes </h1>
                            <small style={{ opacity: ".7" }} >Either write something worth reading or do
                                <br></br> something worth writing</small>
                        </div>
                    </div>

                    <form class="example" >
                        <input type="text" name='search' value={input.search} placeholder="Search by Title "
                            onChange={setGet} />
                        <button onClick={handleSearch} ><i class="fa fa-search"></i></button>
                    </form>

                    <div style={{ paddingTop: "3rem" }}>
                        <div className='Yanotes'>{
                            note?.map((not, i) => {
                                return (<div className='card-body  text-center' key={i} >
                                    <span> {not.title}</span> <br />
                                    <span  > {not.description}</span>
                                    <div className='my-2 delete d-flex justify-content-between '>
                                        <span onClick={() => { handleDelete(not) }} ><AiFillDelete /></span>
                                        <span onClick={() => { handleOpen(not) }} ><FaEdit /></span>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* edit notes*/}

            <div id="myModal" class="modal">
                <div class="modal-content mx-auto ">
                    <div className='inputs col-9 mx-auto '>
                        <input type="title" className="form-control" id="title" value={title.value} onChange={title.onChange}
                            name="title" aria-describedby="emailHelp" placeholder="Title" />
                    </div>
                    <div className=" textarea col-9 my-4 mx-auto ">
                        <textarea type="description" rows="6" className="form-control" id="description"
                            name="description" placeholder="Description" value={description.value} onChange={description.onChange} />
                    </div>
                    <div className="text-center" >
                        <button type="submit" className="btn submit mx-4 " onClick={handleClose} >Close</button>
                        <button type="submit" className="btn submit" onClick={handleSumNote} >Submit</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Shownotes
