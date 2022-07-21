import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
    console.log(JSON.stringify(credentials));
    return fetch('http://127.0.0.1:8000/api/v1/login',
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
    // .then((d) => {
    //     console.log(d["authorisation"]['token']);
    // return d;}
    // );
}

export default function Login() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();

    useEffect(() => {
        if (token) return nav("/home");
    },[token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginInfo = await loginUser({ email, password });
        console.log(loginInfo);
        setToken(loginInfo["authorisation"]["token"]);
        localStorage.setItem('token', loginInfo["authorisation"]["token"]);
    }
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">share your email with us :D</small>
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input type="password" className="form-control" id="pass" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
