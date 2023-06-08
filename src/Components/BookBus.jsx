import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const BookBus = () => {

    let tripfrom=useRef();
    let tripto=useRef();
    let tripdate=useRef();

    let[from , setFrom] = useState("");
    let[to , setTo] = useState("");

    let [searchedBus, setSearchedBus]= useState(null);

    let[boardings , setboardings] = useState(null);
    let[destinations , setdestinations] = useState(null);



    useEffect(()=>{
        fetch("http://localhost:4001/bus")
        .then((res)=>{return res.json()})
        .then((data)=>{
          let bp = [];
          let boardingPoints = data.map((bus)=>{ return bus.from });
          boardingPoints.forEach((val)=>{
                if(!bp.includes(val))
                {
                    bp.push(val)
                }
          })

          let dp = [];
          let destinationPoints = data.map((bus)=>{ return bus.to });
          destinationPoints.forEach((val)=>{
                if(!dp.includes(val))
                {
                    dp.push(val)
                }
          })
          setboardings(bp);
          setdestinations(dp);
        })
    } , [])


    let handleSearchBuses = (e)=>{
        e.preventDefault();

        fetch("http://localhost:4001/bus")
        .then((res)=>{return res.json()})
        .then((allBus)=>{
           let filteredBus =  allBus.filter((bus)=>{ 
                            return (bus.from.includes( from)) &&
                                   (bus.to.includes(to)) 
                        });

            console.log(filteredBus);
            setSearchedBus(filteredBus);
        })

        localStorage.setItem("bookingdate" , JSON.stringify(tripdate.current.value) )

    }

    return ( 
        <>
        <NavBar/>
            <div className="book-bus">
                <div className="inputs">
                    <h1>Search Bus to your Destnation</h1>
                    <form onSubmit={handleSearchBuses}>
                        <input type="text" placeholder="Boarding" required ref={tripfrom} id="bookbus-input" value={from} onChange={(e)=>{ setFrom(e.target.value) }} />
                        {boardings &&
                                    <div className="boarding-points">
                                        {
                                            boardings.map((start)=>{ return (
                                                <>{ start.toLowerCase().startsWith(from.toLowerCase()) && <span key={start} onClick={()=>{setFrom(start)}} >{start}</span>}</>
                                            )})
                                        }
                                    </div>}
                        <input type="text" placeholder="Destination" required ref={tripto} id="bookbus-input" value={to} onChange={(e)=>{ setTo(e.target.value) }} />
                        {destinations &&
                                    <div className="destinations-points">
                                        {
                                            destinations.map((end)=>{ return (
                                                <>{ end.toLowerCase().startsWith(to.toLowerCase()) && <span key={end} onClick={()=>{setTo(end)}}>{end}</span>}</>
                                            )})
                                        }
                                    </div>}
                        <input type="date" required ref={tripdate} id="bookbus-input" />
                        <input type="submit" value="Search Bus"  id="bookbus-input-submit"/>
                    </form>
                </div> 


                {searchedBus && searchedBus.length>0 &&
                <div className="bus-list">
                    <h3 style={{color:"#A50021" }}>Available Buses from {from} to {to} </h3>

                    <table className="available-buses">
                        <thead>
                            <tr>
                                <th>Bus Name</th>
                                <th>Departure</th>
                                <th>Araival</th>
                                <th>Duration</th>
                                <th>Available</th>
                                <th>Fare</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody >
                        {
                            searchedBus.map((bus)=>{
                                return(<tr key={bus.id} className="first">
                                            <td>{bus.busname}</td>
                                            <td>
                                                <span> {tripdate.current.value} </span>
                                                <span> {bus.start} </span>
                                            </td>
                                            <td>
                                                <span> {tripdate.current.value} </span>
                                                <span> {bus.end} </span>
                                            </td>
                                            <td>
                                                <span>{bus.journey_time} Hours</span>
                                            </td>
                                            <td> 
                                                <span>{bus.seats - bus.booked_seats} / </span>
                                                <span>{bus.seats}</span> 
                                            </td>
                                            <td>
                                                <span>{bus.price}</span> 
                                            </td>
                                            <td>
                                                <Link to={`/busdetail/${bus.id}`}><button id="BookTicket" >Book ticket</button></Link>
                                            </td>
                                        </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div> }
                
                {searchedBus && searchedBus.length<=0 &&<h3 style={{color:"#A50021" }}>Sorry...! No Busses Available for the searched location</h3> }

             </div>
             
        <Footer/>
        </>
     );
}
 
export default BookBus;