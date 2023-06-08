import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Modal from 'react-modal';
import ToasterUi from 'toaster-ui';
import PropagateLoader from "react-spinners/PropagateLoader";

const customStyles = {
    content: {
      width:'26%',
      border:'2px #A50021 solid',
      borderRadius: '25px',
      boxShadow:' #A50021 0px 0px 10px',
      paddingLeft: '4%',
      fontFamily: "'Noto Serif', serif",
      fontSize: '80%',

      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const BusDetails = () => {

    let[userdetails,setUserdetails]=useState({})
    let[bookingdate,setBookingdate]=useState("")

    let [busdetail , setBusdetail] = useState(null);
    let [seats,setSeats]=useState(1)
    let {busid} =  useParams();
    let navigate = useNavigate();

    let [loading, setLoading] = useState(true);

    const toaster = new ToasterUi();

    useEffect(()=>{

            let data= JSON.parse(localStorage.getItem("userdetails"));
            setUserdetails(data);

            let date=JSON.parse(localStorage.getItem("bookingdate"))
            setBookingdate(date);

            setTimeout(()=>{
                fetch("http://localhost:4001/bus/"+busid)
                .then((res)=>{ return res.json() })
                .then((data)=>{
                        setBusdetail(data);
                })
                setLoading(false);
            },3000)
    } , [])

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    
    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    let handleBookticket = ()=>{

        let ticket = {
                        busname: busdetail.busname ,
                        busnumber:busdetail.busnumber,
                        seats: seats ,
                        from: busdetail.from ,
                        to:busdetail.to,
                        start:busdetail.start,
                        end:busdetail.end,
                        journey_time: busdetail.journey_time,
                        price:busdetail.price * seats,
                        date: bookingdate
                    } 

        let UpdatedData = {
                                ...userdetails ,
                                active_bookings : [ ...userdetails.active_bookings ,ticket]
                    }

        let config = {
            method : "PUT",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify( UpdatedData )
        }

        fetch("http://localhost:4000/users/"+userdetails.id , config)
        .then(()=>{
            localStorage.setItem("userdetails",JSON.stringify(UpdatedData))
        })
        


        let updatedBusdata = {...busdetail , booked_seats : Number(busdetail.booked_seats) + Number(seats) }

        let busConfig = {
            method : "PUT",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify( updatedBusdata )
        }

        fetch("http://localhost:4001/bus/"+busid , busConfig)
        .then(()=>{
            toaster.addToast("Ticket Confirmed");
            closeModal();
            navigate("/profile")
        })
    }

    return ( 
        <div className="bus-detail">
            <NavBar/>
                {loading && <div className="loader"><PropagateLoader  color="#A50021" /></div> }
                { busdetail && 
                  <div className="details">
                        <div className="bus-complete-detail"> 
                            <div id="bus-journey-ticket">
                                <h3 id="trip-head">Trip from <span>{busdetail.from}</span> to <span>{busdetail.to}</span></h3>
                                <hr />
                                <div className="bus-description">
                                    <h3>{busdetail.busname}</h3>
                                    <span>{busdetail.type}</span>
                                    <span>{busdetail.busnumber}</span>
                                </div>
                                <div className="journey-description">
                                    <div>
                                        <h3>Available Seats: {busdetail.seats - busdetail.booked_seats} </h3>
                                    </div>
                                    <div id="from-to-time">
                                        <h3>Boarding : <span id="from-to">{busdetail.from} - {busdetail.start}</span></h3>
                                        <h3>Destination : <span id="from-to">{busdetail.to} - {busdetail.end}</span></h3>
                                    </div>
                                    
                                </div>
                                <div className="ticket-description">
                                    <div>
                                    <h3><span className="price">{busdetail.price} Rupees  / ticket  </span></h3>
                                    </div>
                                    <label>Passengers : </label><input type="number" placeholder="Number of seats" min="1" max={busdetail.seats-busdetail.booked_seats}
                                      value={seats} onChange={(e)=>{setSeats(e.target.value)}} />
                                    <label>Total Fare : </label><input type="text" value={busdetail.price * seats} readOnly />
                                </div>
                                <br />
                                <div id="ticket-details">
                                    <button id="bookbus-input-book" onClick={openModal}>Book Ticket</button>

                                    <Modal
                                        isOpen={modalIsOpen}
                                        onAfterOpen={afterOpenModal}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                                        <div id="passenger-info">
                                            <h3 style={{color:"#A50021"}}>Passenger Information</h3>
                                            <p id="p1"><span style={{fontWeight: '700'}}>Passenger Name :</span> <span>{userdetails.username}</span> </p>
                                            <p id="p1"><span style={{fontWeight: '700'}}>Contact Number :</span> <span>{userdetails.phno}</span> </p>
                                        </div>
                                        <div>
                                            <h3 style={{color:"#A50021"}} >Trip Information</h3>
                                            <h3 id="p1">{busdetail.busname}</h3>
                                            <p id="p1">{busdetail.type}</p>
                                            <br />
                                            <div id="bus-from-to">
                                                <div>
                                                    <h3 id="p1">{busdetail.from} </h3>
                                                    <p id="p1">{busdetail.start}</p>
                                                </div>
                                                <div>
                                                    <i id="direction-icon" className='bx bxs-right-arrow-alt' ></i>
                                                </div>
                                                <div>
                                                    <h3 id="p1">{busdetail.to}</h3>
                                                    <p id="p1">{busdetail.end}</p>
                                                </div>
                                            </div>
                                            <br />
                                            <p id="p1">{bookingdate}</p>
                                            <br />
                                            <p id="p1">Seats selected : {seats} </p>
                                            <p id="p1"> Total Amount :  {seats*busdetail.price} &#8377; </p>
                                            <br />
                                            <input id="ticket-amount" type="number" placeholder="Enter amount in Rupees"/>
                                        </div>
                                        <br />
                                        <button id="bookbus-input-book" onClick={handleBookticket}>Pay</button>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="seat-selection">

                        </div>
                  </div>
                }
            <Footer/>
        </div>
     );
}
 
export default BusDetails;