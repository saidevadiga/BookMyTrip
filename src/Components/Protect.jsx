import { Navigate } from "react-router-dom";

let verify=()=>{
    if(localStorage.getItem("userdetails")==null)
    {
        return false;
    }
    else{
        return true;
    }
}

const Protect = ({Child}) => {
    return ( 
        <div>
        {
            verify() ?<Child/> : <Navigate to="/login"/>
        }
        </div>
     );
}
 
export default Protect;