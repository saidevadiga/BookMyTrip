import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from 'react-modal';

const customStyles = {
    content: {
        border:'2px #A50021 solid',
        borderRadius: '25px',
        boxShadow:' #A50021 0px 0px 10px',
        paddingLeft: '2%',
        fontFamily: "'Noto Serif', serif",
        fontSize: '80%',
        textAlign: 'center',
        
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
  };



const Profile = () => {

    let [userdetails,setUserdetails] = useState(null);

    let [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        setTimeout(()=>{
            let userdetails=JSON.parse(localStorage.getItem("userdetails"))
            setUserdetails(userdetails);
            setLoading(false);
        },3000)
    },[])

    let navigate=useNavigate();

    let logout=()=>{
        let res= prompt("Enter Yes to logout...?")
        if(res.toLowerCase("yes"))
        {
            localStorage.removeItem("userdetails")
            navigate("/login")
        }
        else{
            navigate("/profile")
        }
    }

    let deleteAccount=()=>{

        let pwd=prompt("If you want to delete the account permanently...! Please provide the password")
        
        if(pwd!=userdetails.password){
            alert("invalid password");
            return;
        }

        let config={method : "DELETE"};
        fetch("http://localhost:4000/users/"+userdetails.id , config)
        .then(()=>{
            localStorage.removeItem("userdetails")
            alert("Account has been Deleted permanently...!")
            navigate("/")
        })
    }

    // Active Bookings

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#A50021';
    }

    function closeModal() {
        setIsOpen(false);
    }

    //Previous Booking

    let subtitle1;
    const [modalIsOpen1, setIsOpen1] = useState(false);
    
    function openModal1() {
        setIsOpen1(true);
    }
    
    function afterOpenModal1() {
        // references are now sync'd and can be accessed.
        subtitle1.style.color = '#A50021';
    }
    
    function closeModal1() {
        setIsOpen1(false);
    }


    return ( 
        <>
        <NavBar/>
        <div id="profilepage">
            {loading && <div className="loader"><PropagateLoader  color="#A50021" /></div> }

            { userdetails &&
            <div className="user-details">
                <div className="cover-page">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
                </div>
                <div className="profile">
                    <img src={userdetails.pic} alt="" />
                    <h1>{userdetails.username}</h1>
                    <p>
                        <button>Edit profile</button>
                        <button onClick={deleteAccount}>Delete Account</button>
                    </p>
                </div>
                <div>
                    <p>Phone : {userdetails.phno}</p>
                    <p>Email : {userdetails.email}</p>
                    <p>Total booking : {userdetails.active_bookings.length + userdetails.previous_bookings.length}</p>
                    <p>Active booking : <button onClick={openModal} >View</button> </p>
                    <p>Previous booking : <button  onClick={openModal1}>View</button> </p>
                </div>
                <button onClick={logout}>Logout</button>
            </div>}

            {userdetails && 
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
                contentLabel="Example Modal"  >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Active tickets</h2>
                <div className="active-ticket-card">
                    {
                        userdetails.active_bookings.map((ticket ,i)=>{
                            return(
                                <div className="ticket">
                                    <p>{i+1}</p>
                                    <p>{ticket.busname.toUpperCase()}</p>
                                    {/* <p>{ticket.busnumber} </p> */}
                                    <p>{ticket.date}</p>
                                    <p>{ticket.from}:{ticket.start}</p>
                                    <p>{ticket.to}:{ticket.end}</p>
                                    <p>Seats :{ticket.seats}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button id="active-close" onClick={closeModal}>close</button>
            </Modal>}

            {userdetails && 
            <Modal
            isOpen={modalIsOpen1}
            onAfterOpen={afterOpenModal1}
            onRequestClose={closeModal1}
            style={customStyles}
            contentLabel="Example Modal">
                <h2 ref={(_subtitle) => (subtitle1 = _subtitle)}>Previous tickets</h2>
                <div className="active-ticket-card">
                    {
                        userdetails.previous_bookings.map((ticket ,i)=>{
                            return(
                                <div className="ticket">
                                    <p>{i+1}</p>
                                    <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                                    <p>{ticket.date}</p>
                                    <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                                    <p>{ticket.seats}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button id="active-close" onClick={closeModal1}>close</button>
            </Modal>}


        </div>
        <Footer/>
        </>
     );
}
 
export default Profile;


{/* <div id="imganddetails">
                <div id="imgdiv" >
                    <img id="cover-photo" src="https://img.freepik.com/premium-photo/travel-world-monument-concept_117023-846.jpg" alt="" />
                    <img id="profileimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC" alt="NA" />
                </div>
                    <div id="username">
                        <h1>{user.username}</h1>
                    </div>
                <div id="profiledetaildiv">
                    <div id="userDetail">
                        <h1>Email : {user.email}</h1>
                        <h1>Phone : {user.phno}</h1>
                    </div>
                </div>
                <div id="delete-logout">
                    <div id="logout-delete-buttondiv">
                        <button id="logout-delete" onClick={logout}>Logout</button>
                        <button id="logout-delete" onClick={deleteAccount}>Delete</button>
                    </div>
                </div>
            </div>
            }
            <div id="extraLinks">
                <a>Active Ticket</a>
                <a>Previous Bookinngs</a>
                <a>Help Desk</a>
            </div> */}