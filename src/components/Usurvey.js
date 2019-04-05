import React, { Component } from 'react';
import Footer from './Footer';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyAow2xwDo1FjTXu5luCTes7HwLwxjLP0a0",
    authDomain: "udemysurvey-reactjs.firebaseapp.com",
    databaseURL: "https://udemysurvey-reactjs.firebaseio.com",
    projectId: "udemysurvey-reactjs",
    storageBucket: "udemysurvey-reactjs.appspot.com",
    messagingSenderId: "677752502346"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {

  nameSubmit(event){
    var stuName = this.refs.name.value;
    this.setState( {studentName: stuName}, function(){
      console.log(this.state);
    });
    //console.log(stuName);
  }

  answerSelected(event){
    var studentAns = this.state.answers;

    if (event.target.name === 'answer1') {
      studentAns.answer1 = event.target.value;
    } else if (event.target.name === 'answer2') {
      studentAns.answer2 = event.target.value;
    } else if (event.target.name === 'answer3') {
      studentAns.answer3 = event.target.value;
    }

    this.setState( {answers: studentAns}, function(){
      console.log(this.state);
    });
  }

  questionSubmit(){
    //when the user clicks submit button
    // here we save info to firebase db
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });

    this.setState({isSubmitted: true});
  }

  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };

      this.nameSubmit = this.nameSubmit.bind(this);
      this.answerSelected = this.answerSelected.bind(this);
      this.questionSubmit = this.questionSubmit.bind(this);
  }



  render(){
    var studentName;
    var questions;

    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div className="container">
        <h1>My Survey App</h1>
        <div style={{height: '100px'}}></div>
        <h2>Welcome, what's your name? </h2>
        <form onSubmit={this.nameSubmit}>
          <input className="namt" type="text" placeholder="Please enter your name, hit ENTER when finished" ref="name"/>
        </form>
        <div style={{height: '60px'}}></div>
      </div>;
      questions = ''

    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h2>Welcome to U-Survey, {this.state.studentName}!</h2>;
      questions = <div>
           <h3>Please answer these questions to proceed...</h3>
           <form onSubmit={this.questionSubmit}>
             <div className="card">
               <label className="labelClass">What was your first programming language: </label> <br />

               <label>
                 <input className="with-gap" type="radio" name="answer1" value="Java" onChange={this.answerSelected}/>
                  <span className="radioBtn">Java</span>
               </label>

               <label>
                 <input className="with-gap" type="radio" name="answer1" value="Python" onChange={this.answerSelected}/>
                  <span className="radioBtn">Python</span>
               </label>

                <label>
                  <input className="with-gap" type="radio" name="answer1" value="C++" onChange={this.answerSelected}/>
                     <span className="radioBtn">C++</span>
               </label>
             </div>


             <div className="card">
               <label className="labelClass">What are your goals: </label> <br />

               <label>
                 <input className="with-gap" type="radio" name="answer2" value="Student" onChange={this.answerSelected}/>
                  <span className="radioBtn">Student</span>
               </label>

               <label>
                 <input className="with-gap" type="radio" name="answer2" value="seek-job" onChange={this.answerSelected}/>
                  <span className="radioBtn">Seeking Job</span>
               </label>

               <label>
                 <input className="with-gap" type="radio" name="answer2" value="startup-founder" onChange={this.answerSelected}/>
                  <span className="radioBtn">Startup Founder</span>
               </label>
             </div>

             <div className="card">
               <label className="labelClass">What is/was your path: </label> <br />

               <label>
                 <input type="radio" className="with-gap" name="answer3" value="degree" onChange={this.answerSelected}/>
                  <span className="radioBtn">Degree</span>
               </label>

               <label>
                 <input type="radio" className="with-gap" name="answer3" value="self-taught" onChange={this.answerSelected}/>
                  <span className="radioBtn">Self Taught</span>
               </label>

               <label>
                 <input type="radio" className="with-gap" name="answer3" value="online-resources" onChange={this.answerSelected}/>
                  <span className="radioBtn">Online Resources</span>
               </label>
             </div>

             <input className="feedback-button" type="submit" value="submit"/>
           </form>
        </div>;

    } else if (this.state.isSubmitted === true) {
      studentName = <h2 style={{marginTop: '200px'}}>Thanks for the feedback, {this.state.studentName}  <br /> <br /> Bye! </h2>

    }


    return(
      <div>

        {studentName}
        --------------------------------------------------------------------------------------
        {questions}

        <div style={{height: '240px'}}></div>

        <Footer />

      </div>
      );
    }
  }

  export default Usurvey;
