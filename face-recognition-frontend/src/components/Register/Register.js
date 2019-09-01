import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nameField:'',
            emailField:'',
            passwordField:''
        }
    }
    register=()=>{
        const nameBox=document.getElementById("name");
        const emailBox=document.getElementById("email-address-register");
        const passwordBox=document.getElementById("password-register");
        if(nameBox.value.length===0 || emailBox.value.length===0 || passwordBox.value.length===0){
            window.alert("name, username and password can not be empty");
            return;
        }
        this.setState({name:nameBox.value,emailField:emailBox.value,passwordField:passwordBox.value});
        const user={
            name:nameBox.value,
            email:emailBox.value,
            password:passwordBox.value,
        }
        fetch('http://localhost:3000/register',{
            method:'post',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(response=>response.json())
            .then(user=>{
            if(user!=='unable to register')
            {
                this.props.onLoadUser(user);
                this.props.onRouteChange('home');
            }else window.alert("please enter a valid username and password")
        }).catch(err=>window.alert("please enter a valid username and password"));
        
    }
    render(){
        return(
            <div className="ba br3 bw1 w-40 center shadow-5 verticallyCentered">
              <main className="pa4 black-80">
              <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="email-address"  id="name"></input>
                    </div>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address-register">Email</label>
                      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address-register"  id="email-address-register"></input>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password-register">Password</label>
                      <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password-register" ></input>
                  </div>
                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign up" onClick={this.register}></input>
                </div>

              </form>
            </main>  
        </div>
        );
    }
};
export default Register;