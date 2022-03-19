import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private activatedRout : ActivatedRoute, 
    private questionService : QuestionService,
    private snackbar : MatSnackBar, private router : Router) { }

  qid : any;

  question = {
    qid : '',
    quiz : {
      qid : '',
      title : '',
    },
    content : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : '',
  }


  ngOnInit(): void {
   this.qid =  this.activatedRout.snapshot.params.qid;
   this.question.qid = this.qid;
   this.questionService.getQuestion(this.qid).subscribe(
     (data : any)=>{
      console.log(data);
      this.question =  data;
     },
     (error)=>{
       console.log(error);
       Swal.fire('Error !','Server Error! Try again', 'error');
     }
   )
  }

  updateQuestion(){
    if(this.question.content.trim()==''|| this.question.content==null){
      this.snackbar.open('Question is required !','OK',{
        duration : 3000,
      })
      return;
    }
    this.questionService.updateQuestion(this.question).subscribe(
      (data : any) =>{
         console.log(data);
         this.router.navigateByUrl("/admin-dashboard/questions/"+this.question.quiz.qid+"/"+this.question.quiz.title);
         this.snackbar.open('Question Updated Successfully','OK',{
           duration : 3000,
         })
      },
      (error) =>{
       console.log(error);
       this.snackbar.open('Question Not Updated ! Try again', 'OK', {
         duration : 3000,
       })
      }
    )
  }

}
