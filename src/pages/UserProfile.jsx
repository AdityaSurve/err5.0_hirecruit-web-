import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/js/bootstrap.js";
// import 'bootstrap/js/dist/modal';
import {
  AiFillFileAdd,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { app, database, storage } from "../firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const [data, setdata] = useState({});
  const { user } = UserAuth();
  const [fireuser, setfireuser] = useState({});
  const [show, setShow] = useState(false);
  const [image, setimage] = useState("");

  useEffect(() => {
    getfireuser();
  }, [fireuser.skills]);

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
    setfireuser(docSnap.data());
  };

  const handleAddskill = () => {
    updateDoc(doc(database, "users", user.uid), {
      skills: arrayUnion(data.skill),
    });
    setShowskill(false);
  };

  const handleDelskill = (skill) => {
    updateDoc(doc(database, "users", user.uid), {
      skills: arrayRemove(skill),
    });
  };

  const handleAddeducation = () => {
    updateDoc(doc(database, "users", user.uid), {
      education: arrayUnion({
        instname: data.instname,
        grade: data.grade,
        degree: data.degree,
        duration: data.duration,
        desc: data.desc,
      }),
    });
    setShoweducation(false);
  };

  const handleAddproject = () => {
    updateDoc(doc(database, "users", user.uid), {
      project: arrayUnion({
        protitle: data.protitle,
        links: data.prolinks,
        time: data.protime,
        desc: data.prodesc,
      }),
    });
    setShowproject(false);
  };

  const handleAddexp = () => {
    updateDoc(doc(database, "users", user.uid), {
      experience: arrayUnion({
        title: data.exppos,
        compname: data.expcompname,
        time: data.exptime,
        desc: data.expdesc,
        loc: data.exploc,
      }),
    });
    setShowexper(false);
  };

  const handleUploaddp = () => {
    console.log("bwebfubwu");
    const storageRef = ref(storage, user.uid);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          await updateDoc(doc(database, "users", user.uid), {
            imageURL: downloadURL,
          });
        });
        setShow(false);
      }
    );
  };

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setdata({ ...data, ...newInput });
  };
  const [datafile, setDataFile] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((datafile) => {
        console.log(typeof datafile);
        setDataFile(datafile);

        updateDoc(doc(database, "users", user.uid), {
          skills: arrayUnion(...datafile.skills),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-[700px] mx-[50px]">
      <div className="flex items-center mt-10 mb-3">
        <div className="flex items-baseline">
          <img
            className="rounded-full h-[90px] w-[90px]"
            src={
              fireuser.imageURL
                ? fireuser.imageURL
                : `data:image/png;base64,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`
            }
            alt="/"
          />
          <Button
            variant="primary"
            className="rounded-full"
            onClick={handleShow}
          >
            <span>
              <AiOutlineEdit className="text-2xl text-blue-500  hover:text-white cursor-pointer " />
            </span>
          </Button>
        </div>

        <div className="ml-6">
          <p className="text-xl font-semibold">{fireuser.name}</p>
          <p>{fireuser.email}</p>
        </div>
        <div className="ms-auto">
          <form>
            <div class="relative rounded-md shadow-sm">
              <input
                type="file"
                name="file"
                id="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                for="file"
                className="relative cursor-pointer bg-blue-200 py-2 px-4 block w-full text-center rounded-md font-medium text-blue-500  hover:bg-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span className="flex items-center gap-2 bg-">
                  <div>Upload Resume</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-upload"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>
                </span>
              </label>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
      {/* {datafile && (
        <div>
          <p>Phone: {datafile.phone}</p>
          <p>Skills: {datafile?.skills?.join(", ")}</p>
        </div>
      )} */}
      <div className=" mt-10 mb-3">
        <div className="ml-6">
          <p className="text-2xl font-semibold">Skills</p>
        </div>
        <div className="flex justify-between items-baseline mt-3">
          <div className="grid grid-cols-5 gap-3 ">
            {fireuser?.skills?.map((skill) => {
              return (
                // <span className='my-2 text-white bg-blue-500 m-1 p-2 rounded-xl'>{skill} <span><AiOutlineCloseCircle /></span></span>

                <div className="flex w-full">
                  <span className="bg-blue-500 text-white p-3 my-2 flex items-center justify-between w-full text-slice rounded-xl relative">
                    {skill}
                    <span>
                      <AiOutlineClose
                        className="cursor-pointer ml-1"
                        onClick={() => {
                          handleDelskill(skill);
                        }}
                      />
                    </span>
                  </span>
                </div>
              );
            }, [])}
          </div>

          <p>
            <Button
              variant="primary"
              className="rounded-full"
              onClick={handleShowskill}
            >
              <span>
                <AiFillPlusCircle className="text-2xl text-blue-500  hover:text-white cursor-pointer " />
              </span>
            </Button>
          </p>
        </div>
      </div>
      <hr></hr>
      <div className=" mt-10 mb-3">
        <div className="ml-6">
          <p className="text-2xl font-semibold">Education</p>
        </div>
        <div className="flex justify-between items-baseline mx-6">
          {fireuser?.education?.map((edu) => {
            return (
              <div>
                <p className="my-2 text-xl">{edu.instname}</p>
                <p className="my-2 text-xl">{edu.desc}</p>
                <p className="my-2 text-xl">{edu.duration}</p>
                <p className="my-2 text-xl">{edu.degree}</p>
                <p className="my-2 text-xl">{edu.grade}</p>
              </div>
            );
          }, [])}
          <p>
            <Button
              variant="primary"
              className="rounded-full"
              onClick={handleShoweducation}
            >
              <span>
                <AiFillPlusCircle className="text-2xl text-blue-500  hover:text-white cursor-pointer " />
              </span>
            </Button>
          </p>
        </div>
      </div>
      <hr></hr>
      <div className=" mt-10 mb-3">
        <div className="ml-6">
          <p className="text-2xl font-semibold">Projects</p>
        </div>
        <div className="flex justify-between items-baseline mx-6">
          {fireuser?.project?.map((pro) => {
            return (
              <div>
                <p className="my-2 text-xl">{pro.protitle}</p>
                <p className="my-2 text-xl">{pro.links}</p>
                <p className="my-2 text-xl">{pro.time}</p>
                <p className="my-2 text-xl">{pro.desc}</p>
              </div>
            );
          }, [])}
          <p>
            <Button
              variant="primary"
              className="rounded-full"
              onClick={handleShowproject}
            >
              <span>
                <AiFillPlusCircle className="text-2xl text-blue-500  hover:text-white cursor-pointer " />
              </span>
            </Button>
          </p>
        </div>
      </div>
      <hr></hr>
      <div className=" mt-10 mb-3">
        <div className="ml-6">
          <p className="text-2xl font-semibold">Experience</p>
        </div>
        <div className="flex justify-between items-baseline mx-6">
          {fireuser?.experience?.map((exp) => {
            return (
              <div>
                <p className="my-2 text-xl">{exp.title}</p>
                <p className="my-2 text-xl">{exp.compname}</p>
                <p className="my-2 text-xl">{exp.loc}</p>
                <p className="my-2 text-xl">{exp.desc}</p>
                <p className="my-2 text-xl">{exp.time}</p>
              </div>
            );
          }, [])}
          <p>
            <Button
              variant="primary"
              className="rounded-full"
              onClick={handleShowexper}
            >
              <span>
                <AiFillPlusCircle className="text-2xl text-blue-500  hover:text-white cursor-pointer " />
              </span>
            </Button>
          </p>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter New Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setimage(e.target.files[0])}
                ></input>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <span className="text-black">Close</span>
            </Button>
            <Button variant="primary" onClick={handleUploaddp}>
              <span>Save </span>
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showskill} onHide={handleCloseskill}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your Skills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  name="skill"
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
              <span className="text-black">Close</span>
            </Button>
            <Button variant="primary" onClick={handleAddskill}>
              <span>Save </span>
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showeducation} onHide={handleCloseeducation}>
          <Modal.Header closeButton>
            <Modal.Title>Education Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                  name="instname"
                  type="text"
                  placeholder="Name of School"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  name="grade"
                  type="text"
                  placeholder="Eg. CGPA or percentage"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  name="degree"
                  type="text"
                  placeholder="Eg. Bachelors"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  name="duration"
                  type="text"
                  placeholder="Eg. from to"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  onChange={(event) => handleInput(event)}
                  placeholder="Describe Your experience"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseeducation}>
              <span className="text-black">Close</span>
            </Button>
            <Button variant="primary" onClick={handleAddeducation}>
              <span>Save </span>
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showproject} onHide={handleCloseproject}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Details for your projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Project Title</Form.Label>
                <Form.Control
                  type="text"
                  name="protitle"
                  placeholder="Enter the name of your project"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Links</Form.Label>
                <Form.Control
                  type="text"
                  name="prolinks"
                  placeholder="Eg. Github,Devfolio etc"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Time Period</Form.Label>
                <Form.Control
                  type="text"
                  name="protime"
                  placeholder="When did you work on this project?"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="prodesc"
                  onChange={(event) => handleInput(event)}
                  placeholder="Describe Your Project"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseproject}>
              <span className="text-black">Close</span>
            </Button>
            <Button variant="primary" onClick={handleAddproject}>
              <span>Save </span>
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showexper} onHide={handleCloseexper}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your past Experience</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="exppos"
                  placeholder="Role in the company"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  type="text"
                  name="expcompname"
                  placeholder="Enter Company name"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Time Period</Form.Label>
                <Form.Control
                  type="text"
                  name="exptime"
                  placeholder="When did you work in this role?"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="exploc"
                  placeholder="Eg. City state country"
                  autoFocus
                  onChange={(event) => handleInput(event)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="expdesc"
                  onChange={(event) => handleInput(event)}
                  placeholder="Describe Your Experience"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseexper}>
              <span className="text-black">Close</span>
            </Button>
            <Button variant="primary" onClick={handleAddexp}>
              <span className="text-black">Save </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UserProfile;