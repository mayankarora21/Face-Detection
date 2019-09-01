import React from 'react';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailField:'',
            passwordField:''
        }
    }
    onSignIn=(event)=>{
        const {onRouteChange} = this.props;
        const emailBox=document.getElementById("email-address");
        const passwordBox=document.getElementById("password");
        this.setState({emailField:emailBox.value,passwordField:passwordBox.value});
        const user={
          email:emailBox.value,
          password:passwordBox.value,
        };
        fetch('http://localhost:3000/signin',{
            method:'post',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(user)
        })
            .then(response=>response.json())
        .then(data=>{
            if(data!=="wrong credentials"){
                onRouteChange('home');
                this.props.onLoadUser(data);
            }else window.alert("please enter correct username and password");
        }).catch(err=>{
            window.alert("please enter correct username and password");
        });
        
        this.props.onLoadUser(user);
    }
    render(){
        return(
            <div className="ba br3 bw1 w-40 center shadow-5 verticallyCentered">
              <main className="pa4 black-80">
              <form className="measure center">
                <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" ></input>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" ></input>
                  </div>
                  </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Sign in" onClick={this.onSignIn}></input>
                </div>
              </form>
            </main>  
            </div>
        );
    }
    
}
export default Signin;