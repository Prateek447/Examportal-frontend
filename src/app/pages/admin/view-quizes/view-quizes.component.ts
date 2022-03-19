import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {


  quizes = [
    {
      qid :'',
      title : '',
      description : '',
      maxMarks : '',
      numberOfQuestions : '',
      active : '',
      category : {
        title : '',
      },
    },
  ]

  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
     this.quizService.getQuizes().subscribe(
       (data : any) => {
         console.log(data);
         this.quizes =  data;
       },
       (error) => {
        console.log(error);
        Swal.fire('Error !', 'Quizzes not loaded', 'error');
       }
     )
  }

  deleteQuiz(qId :any){

    Swal.fire(
      {
        icon : 'info',
        title : 'Are you sure ?',
        showCancelButton : true,
        cancelButtonText : 'No',
        cancelButtonColor : 'red',
        confirmButtonText : 'Yes',
        confirmButtonColor : 'green',
      }
    ).then( (result)=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(qId).subscribe(
          (data)=>{
            console.log(data);
           this.quizes =  this.quizes.filter((quiz) => quiz.qid != qId);
           Swal.fire('Success','Quiz is deleted','success');
          },
          (error)=>{
           console.log(error);
           Swal.fire('Error','Try again !','error');
          }
        )
      }
    })




  }

}
