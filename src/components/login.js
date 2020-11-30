import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login.css"
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      loggedIn: (localStorage.getItem("token"))?true:false,
      details: [],
    };
  }

  logindetail = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handlelogin = (event) => {
    event.preventDefault();
    axios
      .get("https://5fb6896e36e2fa00166a5837.mockapi.io/api/data/users")
      .then((res) => {
        //   console.log(res.data)
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => console.log(err));
    //   console.log(this.state.details)

    var counter=0;
   for(let i=0;i<this.state.details.length;i++){
     counter++
       if(this.state.details[i].name==this.state.name && this.state.details[i].password==this.state.password){
         localStorage.setItem('token',"xndwejdvejevfwjdvdvwdjwvd")
         console.log("Log in Token",localStorage.getItem('token'));
         this.state.loggedIn= true;
           break;
       }
       else if(counter==this.state.details.length){
          alert(`User Account is not Authorized, Check UserId/Password`);
       }
   }

  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/blogs" />
    }
    
    return (
      <div > 
                  <h2 align="center">Login</h2>

        <form onSubmit={this.handlelogin} className="form">
          <input
            type="text"
            name="name"
            placeholder="Enter your usename"
            onChange={this.logindetail}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={this.logindetail}
          />
          <br />
          <input type="submit" value="LogIn" />
          <button >
            <Link to="/register">SignUp</Link>
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
