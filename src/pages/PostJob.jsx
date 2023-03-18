import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/js/bootstrap.js';
// import 'bootstrap/js/dist/modal';
import { AiFillFileAdd, AiFillMinusCircle, AiFillPlusCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { app, database, storage } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../contexts/AuthContext'
import { async } from '@firebase/util';
import Card from "../components/Card"
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [data, setdata] = useState({})
    const [reqdskills, setreqdskills] = useState([])
    const [reqdquals, setreqdquals] = useState([])
    const [reqdbens, setreqdbens] = useState([])
    const [reqdresps, setreqdresps] = useState([])
    const { user } = UserAuth()
    const [fireuser, setfireuser] = useState({})
    const [show, setShow] = useState(false);
    const [image, setimage] = useState("")

    useEffect(() => {
        getfireuser()
    }, [fireuser.skills])

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const [jobs, setjobs] = useState([])
    const collectionRef = collection(database, 'job');
    useEffect(() => {
        getJobs();
    }, [])

    const getJobs = async () => {
        const collectionRef = collection(database, "job");
        onSnapshot(collectionRef, (hacklist) => {
            setjobs(hacklist.docs);
        })
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showeducation, setShoweducation] = useState(false);

    const handleCloseeducation = () => setShoweducation(false);
    const handleShoweducation = () => setShoweducation(true);

    const [showproject, setShowproject] = useState(false);

    const handleCloseproject = () => setShowproject(false);
    const handleShowproject = () => setShowproject(true);

    const [showexper, setShowexper] = useState(false);

    const handleCloseexper = () => setShowexper(false);
    const handleShowexper = () => setShowexper(true);

    const [showskill, setShowskill] = useState(false);

    const handleCloseskill = () => setShowskill(false);
    const handleShowskill = () => setShowskill(true);

    const getfireuser = async () => {
        const docRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setfireuser(docSnap.data())
    }

    const handleAddskill = async () => {
        const element = data.reqdskill
        reqdskills.push(element)
        setreqdskills(Object.values(reqdskills))
        console.log(reqdskills);
        console.log(typeof (reqdskills));
        setShowskill(false)
    }
    const handleAddqual = async () => {
        const element = data.qual
        reqdquals.push(element)
        setreqdquals(Object.values(reqdquals))
        setShowexper(false)
    }

    const handleAddresp = async () => {
        const element = data.resp
        reqdresps.push(element)
        setreqdresps(Object.values(reqdresps))
        setShoweducation(false)
    }

    const handleAddben = async () => {
        const element = data.ben
        reqdbens.push(element)
        setreqdbens(Object.values(reqdbens))
        setShowproject(false)
    }

    const handleDelskill = (skill) => {
        // updateDoc(doc(database, 'users', user.uid), {
        //     skills: arrayRemove(skill)
        // })
    }


    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setdata({ ...data, ...newInput });
        console.log(data);
    };

    const handlePost = async () => {
        const docRef = await addDoc(collection(database, "job"), {
            title: data?.title,
            type: data?.type,
            location: data?.loc,
            desc: data?.desc,
            ename: fireuser?.name,
            logo: fireuser?.imageURL,
            qual: arrayUnion(...reqdquals),
            resp: arrayUnion(...reqdresps),
            skills: arrayUnion(...reqdskills)
        });
        updateDoc(doc(database, 'job', docRef.id), {
            jobid: docRef.id
        })
    }

    return (
        <div>
            <p className='text-2xl mt-2 ml-6 mb-3 font-bold'>Jobs Created by You</p>
            <hr></hr>
            <div className=' grid grid-cols-3 overflow-y-scroll min-h-[680px] max-h-[680px]'>

                {jobs.map((item) => {
                    return (
                        <Card job={item.data()} />
                    );
                }, [])}
                <div className='m-2'>
                    <div className="max-w-[900px] h-full max-h-[400px] min-h-[400px]   rounded-xl overflow-hidden shadow-2xl justify-between items-center my-1 mx-1 p-3">
                        <div className=" flex h-full text-blue-500 justify-center items-center">
                            <div className='bg-green-200 rounded-full p-3'>

                                <div className='text-5xl cursor-pointer'>
                                    <a href='#mydiv'><AiFillPlusCircle /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='mydiv' className='pt-[20px] min-h-[700px] mx-[100px]'>
                <div className='flex items-center ml-6 mt-10 mb-3'>
                    <div className='flex items-baseline'>
                        <img className='rounded-full h-[90px] w-[90px]'
                            src={fireuser.imageURL ? fireuser.imageURL : `data:image/png;base64,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`} alt='/' />
                        <Button variant="primary" className='rounded-full' onClick={handleShow}>
                            <span><AiOutlineEdit className='text-2xl text-blue-500  hover:text-white cursor-pointer ' /></span>
                        </Button>
                    </div>

                    <div className='ml-6'>
                        <p className='text-xl font-semibold'>
                            <input type='text' name='title' className='w-full border border-input text-xl rounded-2xl p-2 outline-blue-400' placeholder='Job Title' onChange={(event) => handleInput(event)} />
                        </p>
                        <p><input type='text' name='ename' className='w-full border border-input rounded-2xl p-2 outline-blue-400 mt-2' placeholder='Employer Name' onChange={(event) => handleInput(event)} /></p>
                    </div>
                </div>
                <hr></hr>
                <div className='flex justify-between'>

                    <div className='ml-5 my-3'>
                        <p className='text-xl font-semibold m-2'>Job Type</p>
                        <p className='text-sm font-semibold'>
                            <select onChange={(event) => handleInput(event)}
                                className="py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                name='type'
                            >
                                <option value="FULLTIME">FULLTIME</option>
                                <option value="HALFTIME">HALFTIME</option>
                            </select>
                        </p>
                    </div>
                    <div className='ml-5 my-3'>
                        <p className='text-xl font-semibold m-2'>Job Location</p>
                        <p className='text-xl font-semibold'>
                            <input name='loc' type='text' className=' border border-input rounded-2xl px-2 outline-blue-400' placeholder='Location' onChange={(event) => handleInput(event)} />
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className='ml-5 my-3'>
                    <p className='text-xl font-semibold m-2'>Job Description</p>
                    <textarea name='desc' type='text' cols='100' rows='10'
                        className='border-2 p-3 text-md' onChange={(event) => handleInput(event)} />
                </div>
                <hr></hr>
                <div className=' mt-10 mb-3'>
                    <div className='ml-6'>
                        <p className='text-2xl font-semibold'>Required Skills</p>
                    </div>
                    <div className='flex justify-between items-baseline mx-6'>
                        <div className='flex gap-3'>
                            {reqdskills?.map((skill) => {
                                return (
                                    // <span className='my-2 text-white bg-blue-500 m-1 p-2 rounded-xl'>{skill} <span><AiOutlineCloseCircle /></span></span>

                                    <div className='flex w-full'>
                                        <span className='bg-blue-500 text-white p-3 my-2 flex items-center justify-between w-full text-slice rounded-xl relative'>{skill}
                                            <span ><AiOutlineClose className='cursor-pointer ml-1' onClick={() => { handleDelskill(skill) }} /></span>
                                        </span>
                                    </div>)
                            }, [])}
                        </div>
                        <p>
                            <Button variant="primary" className='rounded-full' onClick={handleShowskill}>
                                <span><AiFillPlusCircle className='text-2xl text-blue-500  hover:text-white cursor-pointer ' /></span>
                            </Button>

                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className=' mt-10 mb-3'>
                    <div className='ml-6'>
                        <p className='text-2xl font-semibold'>Responsibilities</p>
                    </div>
                    <div className='flex justify-between items-baseline mx-6'>
                        <div className='flex-col'>
                            {reqdresps?.map((skill) => {
                                return (
                                    <p>{skill}</p>)
                            }, [])}
                        </div>
                        <p>
                            <Button variant="primary" className='rounded-full' onClick={handleShoweducation}>
                                <span><AiFillPlusCircle className='text-2xl text-blue-500  hover:text-white cursor-pointer ' /></span>
                            </Button>
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className=' mt-10 mb-3'>
                    <div className='ml-6'>
                        <p className='text-2xl font-semibold'>Benefits</p>
                    </div>
                    <div className='flex justify-between items-baseline mx-6'>
                        <div className='flex-col'>
                            {reqdbens?.map((skill) => {
                                return (
                                    <p>{skill}</p>)
                            }, [])}
                        </div>
                        <p>
                            <Button variant="primary" className='rounded-full' onClick={handleShowproject}>
                                <span><AiFillPlusCircle className='text-2xl text-blue-500  hover:text-white cursor-pointer ' /></span>
                            </Button>
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className=' mt-10 mb-3'>
                    <div className='ml-6'>
                        <p className='text-2xl font-semibold'>Qualifications</p>
                    </div>
                    <div className='flex justify-between items-baseline mx-6'>
                        <div className='flex-col'>
                            {reqdquals?.map((skill) => {
                                return (
                                    <p>{skill}</p>)
                            }, [])}
                        </div>
                        <p>
                            <Button variant="primary" className='rounded-full' onClick={handleShowexper}>
                                <span><AiFillPlusCircle className='text-2xl text-blue-500  hover:text-white cursor-pointer ' /></span>
                            </Button>
                        </p>
                    </div>
                </div>
                <hr></hr>
                <div className='min-h-[100px]'>
                    <button className='text-2xl text-white font-semibold bg-blue-500 rounded-xl p-2 mt-6 px-5 py-6 hover:border-2 hover:border-blue-400' onClick={handlePost}
                    >Post</button>
                </div>
                <>

                    <Modal show={showskill} onHide={handleCloseskill}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter your Skills</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">


                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control
                                        name="reqdskill"
                                        type="text"
                                        placeholder="ex. JavaScript..."
                                        autoFocus
                                        onChange={(event) => handleInput(event)}
                                    />
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseskill}>
                                <span className='text-black'>Close</span>
                            </Button>
                            <Button variant="primary" onClick={handleAddskill}>
                                <span className='text-black'>Save </span>
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showeducation} onHide={handleCloseeducation}>
                        <Modal.Header closeButton>
                            <Modal.Title>Responsibilities</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">


                                    <Form.Label>Responsibilities</Form.Label>
                                    <Form.Control
                                        name='resp'
                                        type="text"
                                        placeholder="Enter the expected responsibilities"
                                        autoFocus
                                        onChange={(event) => handleInput(event)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseeducation}>
                                <span className='text-black'>Close</span>
                            </Button>
                            <Button variant="primary" onClick={handleAddresp}>
                                <span className='text-black'>Save </span>
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showproject} onHide={handleCloseproject}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter Benefits provided in the job</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">


                                    <Form.Label>Benefits</Form.Label>
                                    <Form.Control
                                        name="ben"
                                        type="text"
                                        placeholder="enter benefit provided"
                                        autoFocus
                                        onChange={(event) => handleInput(event)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseproject}>
                                <span className='text-black'>Close</span>
                            </Button>
                            <Button variant="primary" onClick={handleAddben}>
                                <span className='text-black'>Save </span>
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showexper} onHide={handleCloseexper}>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter the Qualifications required</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">


                                    <Form.Label>Qualifications</Form.Label>
                                    <Form.Control
                                        name='qual'
                                        type="text"
                                        placeholder="Enter reqd qualifications"
                                        autoFocus
                                        onChange={(event) => handleInput(event)}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseexper}>
                                <span className='text-black'>Close</span>
                            </Button>
                            <Button variant="primary" onClick={handleAddqual}>
                                <span className='text-black'>Save </span>
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
            </div>
            )
}

export default PostJob