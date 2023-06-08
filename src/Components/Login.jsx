import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let navigate=useNavigate();
    let email=useRef();
    let password=useRef();

    let login=(e)=>{
        e.preventDefault();

        fetch("http://localhost:4000/users")
        .then((res)=>{return res.json()})
        .then((data)=>{
            let user=data.find((u)=>{return u.email===email.current.value|| u.phno===email.current.value})
            if(user==undefined)
            {
                alert("UserNot Found")
            }
            else if(user.password!=password.current.value)
            {
                alert("wrong password")
            }
            else{
                alert("Login Succesfull")
                localStorage.setItem("userdetails" , JSON.stringify(user));
                navigate("/dashboard")
            }
        })
    }

    return ( 
        <div id="outerdivsignup">
            <div className="signUpLogin">
                <form onSubmit={login} id="signupform">
                    <h1 id="signuplogo">BookMyTrip</h1>
                    <input id="input" type="email" placeholder="Enter email ID" ref={email}/>
                    <input id="input" type="text" placeholder="Enter password" ref={password}/>
                    <a href="/" id="anchors">Forgotten password...?</a>
                    <input type="submit" value="Login" id="submit" />
                    <br />
                    <br />
                    <span id="hasornot">Don't have an account..? <a href="/" id="anchors">Signup</a></span>
                </form>
            </div>
        </div>
     );
}
 
export default Login;