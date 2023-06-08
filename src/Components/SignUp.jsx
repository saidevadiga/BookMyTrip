import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    let navigate=useNavigate()  

    let username=useRef();
    let email=useRef();
    let phno=useRef();
    let pic=useRef();
    let password=useRef();
    let repassword=useRef();

    useEffect(()=>{
        if(localStorage.getItem("userdatails")!=null){
            navigate("/");
        }
    })


    let signup=(e)=>{

        e.preventDefault();

        if(password.current.value!=repassword.current.value)
        {
            alert("Password entered was not matching please check ")
            return
        }
       

        let newuser={
            username:username.current.value,
            email:email.current.value,
            phno:phno.current.value,
            pic:pic.current.value,
            password:password.current.value,
            dob:"",
            gender:"",
            active_bookings:[],
            previous_bookings:[]
        }

        fetch("http://localhost:4000/users",
                                       {
                                        method:"POST",
                                        headers:{"Content-Type":"application/json"},
                                        body:JSON.stringify(newuser)
                                       }  )
        
        .then(()=>{ alert("Account Created Succesfully")
        navigate("/login");
     })
    }


    return ( 
        <div id="outerdivsignup">
            <div className="signUpLogin">
                <form onSubmit={signup} id="signupform">
                    <h1 id="signuplogo">BookMyTrip</h1>
                    <input id="input" type="text" placeholder="Enter your name" ref={username} required/>
                    <input id="input" type="email" placeholder="Enter email ID" ref={email} required/>
                    <input id="input" type="number" placeholder="Enter contact number" minLength="10" maxLength="10" ref={phno} required/>
                    <input id="input" type="url" placeholder="Add profile image" ref={pic} required/>
                    <input id="input" type="text" placeholder="Enter password" ref={password} required/>
                    <input id="input" type="text" placeholder="Re-enter password" ref={repassword}  required/>
                    <input type="submit" value="Create Account" id="submit" />
                    <br />
                    <br />
                    <span id="hasornot">Already have an account..? <a href="/login" id="anchors">Login</a></span>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp;