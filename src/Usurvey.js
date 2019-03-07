import React, { Component } from 'react';
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
      studentName = <div>
        <h2>Welcome, what's your name? </h2>
        <form onSubmit={this.nameSubmit}>
          <input className="namt" type="text" placeholder="Please enter your name" ref="name"/>
        </form>
      </div>;
      questions = ''

    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h2>Welcome to U-Survey, {this.state.studentName}!</h2>;
      questions = <div>
           <h3>Please answer these questions to proceed...</h3>
           <form onSubmit={this.questionSubmit}>
             <div className="card">
               <label>What was your first programming language: </label> <br />
               <input type="radio" name="answer1" value="Java" onChange={this.answerSelected}/> Java
               <input type="radio" name="answer1" value="Python" onChange={this.answerSelected}/> Python
               <input type="radio" name="answer1" value="C++" onChange={this.answerSelected}/> C++
             </div>

             <div className="card">
               <label>What are your goals: </label> <br />
               <input type="radio" name="answer2" value="Student" onChange={this.answerSelected}/> Student
               <input type="radio" name="answer2" value="seek-job" onChange={this.answerSelected}/> Seeking Job
               <input type="radio" name="answer2" value="startup-founder" onChange={this.answerSelected}/> Startup Founder
             </div>

             <div className="card">
               <label>What is/was your path: </label> <br />
               <input type="radio" name="answer3" value="degree" onChange={this.answerSelected}/> Degree
               <input type="radio" name="answer3" value="self-taught" onChange={this.answerSelected}/> Self Taught
               <input type="radio" name="answer3" value="online-resources" onChange={this.answerSelected}/> Online Resources
             </div>

             <input className="feedback-button" type="submit" value="submit"/>
           </form>
        </div>;

    } else if (this.state.isSubmitted === true) {
      studentName = <h2>Thanks for the feedback, {this.state.studentName}</h2>
    }


    return(
      <div>

        {studentName}
        --------------------------------------------------------------------------------------
        {questions}

      </div>
      );
    }
  }

  export default Usurvey;
