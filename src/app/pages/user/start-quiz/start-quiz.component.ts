import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private locationStg : LocationStrategy, 
    private activatedRoute : ActivatedRoute, 
    private questionService : QuestionService) { }

    questions : any;
    qid : any;
   timer : any;
    marksGot  = 0;
    correctAnswer = 0;
    attempted = 0;

    isSubmitted  = false;


  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.activatedRoute.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions(){
    this.questionService.getQuestionsForTest(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions =  data;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
        this.questions.forEach((q : any)  => {
          q['givenAnswer']='';
        });
      },
      (error)=>{
         console.log(error);
         Swal.fire('Error','Something went wrong !', 'error');
      }
    )
  }


  getFormatedTime(){
    let MM= Math.floor(this.timer/60);
    let SS = this.timer - MM * 60;
    return `${MM} min : ${SS} sec`;
  }


  //calll itself again and again unitl timer become 0
  startTimer(){
    let t = window.setInterval(()=>{
    if(this.timer<=0){
      this.submitQuiz();
      clearInterval(t);
    }
    else{
      this.timer--;
    }
    },
    1000)
  }

  submitQuiz(){

    if(this.timer==0){
      this.isSubmitted =  true;
        console.log('Time over');
      this.evalQuiz();
    }
else{
    Swal.fire(
      {
        icon : 'info',
        title : 'Do you want to submit the Quiz ?',
        showCancelButton : true,
        cancelButtonText : 'No',
        cancelButtonColor : 'red',
        confirmButtonText : 'Yes',
        confirmButtonColor : 'green',
      }
    ).then( (result)=>{
      if(result.isConfirmed){
        this.isSubmitted =  true;
        console.log('please submit it');
        this.evalQuiz();
      }
    })
  }
  }

  evalQuiz(){
    this.questionService.evalQuiz(this.questions).subscribe(
      (data : any)=>{
         console.log(data);
         this.marksGot = data.marksGot;
         this.attempted =  data.attempted;
         this.correctAnswer =  data.correctAnswer;
      },
      (error)=>{
         console.log(error);
      }
    )
  }

  preventBackButton(){
     history.pushState(null, 'null' ,location.href);
     this.locationStg.onPopState(
       ()=>{
         history.pushState(null,'null',location.href);
       }
     )
  }

}
