import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from'./components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import ImageBox from './components/ImageBox/ImageBox';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';

const particleOptions={
    particles:{
        number:{
            value:100
        }
    }  
    /*interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
}*/
};
class App extends Component {
    constructor(){
        super();
        this.state={
            inputField:'',
            route:'signin',
            isSignedIn:false,
            user:{
                id:'',
                name:'',
                email:'',
                joined:'',
                entries:''
            },
            box:{}
        }
    }
    
    showImage=()=>{
        const inputBox=document.getElementById("inputBox");
        this.setState({inputField:inputBox.value,box:{}});
    }
    handleRouteChange=(route)=>{
        if(route==='home'){
            this.isSignedIn=true;
        }
        else {
            this.isSignedIn=false;
            this.setState({inputField:''});
            
        }
        this.setState({route:route});
    }
    loadUser=(currUser)=>{
        this.setState(
            {
                user:
                {
                id:currUser.id,
                name:currUser.name,
                email:currUser.email,
                joined:currUser.joined,
                entries:currUser.entries,
                }
        });
    }
    
    
    displayFaceBox=(boundingBox)=>{
        this.setState({box:boundingBox});
    }
    calculateFaceLocation=(response)=>{
        const clarifaiFace=response.outputs[0].data.regions[0].region_info.bounding_box;
        const imageBox=document.getElementById('imageBox');
        const width=Number(imageBox.width);
        const height=Number(imageBox.height);
        
        const leftCol=clarifaiFace.left_col * width;
        const rightCol= width -(clarifaiFace.right_col * width);
        const topRow=clarifaiFace.top_row * height;
        const bottomRow= height -(clarifaiFace.bottom_row * height);
        
        const box={
            leftCol:leftCol,
            rightCol:rightCol,
            topRow:topRow,
            bottomRow:bottomRow
        }

        return box;
    }
    detect=(id)=>{
        if(this.state.inputField.length===0){
            return;
        }
        const app = new Clarifai.App({
            apiKey: ''
        });
        app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.inputField).then(
            (response)=>{
                this.displayFaceBox(this.calculateFaceLocation(response));
                {/*console.log(response.outputs[0].data.regions[0].region_info.bounding_box);*/}
            }
            
        ).catch(err=>{
                console.log(err);
            });
        
        fetch('http://localhost:3000/scoreUpdate',{
            method:'put',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({id:this.state.user.id})
        }).then(response=>response.json())
        .then((count)=>{
            this.setState(Object.assign(this.state.user,{entries:count}));
        })
        
    }
  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions}></Particles>
        <Navigation onRouteChange={this.handleRouteChange} isSignedIn={this.isSignedIn}></Navigation>
        {(this.state.route==='home')?
            <div>
                <Logo></Logo>
                <Rank name={this.state.user.name} entries={this.state.user.entries}></Rank>
                <ImageLinkForm showImage={this.showImage} onDetect={this.detect}></ImageLinkForm>
                <ImageBox inputField={this.state.inputField} box={this.state.box}></ImageBox>
            </div>:
        (
                (this.state.route==='signin')?<Signin onRouteChange={this.handleRouteChange} onLoadUser={this.loadUser}/>:
                <Register onRouteChange={this.handleRouteChange} onLoadUser={this.loadUser}/>
        )
         }
      </div>
    );
  }
}

export default App;
