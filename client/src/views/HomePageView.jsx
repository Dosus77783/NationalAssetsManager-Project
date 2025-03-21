import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { autoLogin, loginUser } from '../services/userServices.js';
import { userContext } from "../context/userContext.jsx";
import LoginForm  from "../components/LoginForm";
import NavButton from "../components/NavButton";

export default function HomePageView(){
    const {user, setUser} = useContext(userContext);
    const navigate = useNavigate();
    const LOGIN_DEFAULT = { email:"", password:"", valMsgs:{ validationErrors:{} } };
    const [loginFormData, setLoginFormData] = useState( LOGIN_DEFAULT );

    useEffect( () => {

        if(Object.keys(user).length === 1 ){
            navigate("/dashboard") 
        }

        autoLogin()
        .then( (res) => {
            setUser(res)
            navigate("/dashboard")
            return;
        } )
        .catch( (err) => console.log(err))

    }, [])

    
    const onFormChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData( prevObj => ( {...prevObj, [name]:value, valMsgs:{ validationErrors:{} }  } ))
    }

    const formSubmition = (e) => {
        e.preventDefault();
        console.log(loginFormData, "in HomePageView FORM SUBMIT")
        loginUser( loginFormData )
            .then( res => {
                console.log(res)
                setUser(res);
                setLoginFormData( LOGIN_DEFAULT )
                navigate("/dashboard")
            })
            .catch( err => {
                console.log(err, "in HomePageView IN CATCH")
                console.log(err.response.data, "in HomePageView IN DATA")
                setLoginFormData( prevObj => ({...prevObj, valMsgs: err.response.data, }) );
            });
    }


    return(
        <>
            <div className="border border-dark rounded border-3 d-flex justify-content-evenly bg-primary bg-opacity-50 shadow">
                <LoginForm formData={loginFormData} onFormChange={ onFormChange } formSubmition={ formSubmition } />
                <p className="fs-5 fw-bold d-flex flex-column my-auto">
                    Don't have a login?
                    <NavButton btnText={"Register"} navigation={"/registration"} />
                </p>
            </div>
            <img src="./src/assets/globe.png" alt="earth globe" className="border border-5 border-light rounded-circle mt-5 shadow-lg"/>
        </>
    )
}