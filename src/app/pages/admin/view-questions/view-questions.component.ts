import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private activatedRout : ActivatedRoute, private questionService : QuestionService) { }

  qid : any;
  title : any;

  questions = [
    {
      qid : '23',
      content : 'iamquestion',
      image : 'image',
      option1 : 'A',
      option2 : 'B',
      option3 : 'C',
      option4 : 'D',
      answer : 'Answer',
    }
  ];

  ngOnInit(): void {
    this.qid =  this.activatedRout.snapshot.params.qid;
    this.title =  this.activatedRout.snapshot.params.title;
    this.getQuestionsOfQuiz();
  }

  getQuestionsOfQuiz(){
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data : any) =>{
        this.questions =data;
        console.log('Questions loaded');
        console.log(data);
      },
      (error)=>{
       console.log('error while getting questions');
       console.log(error);
      }
    )
  }

  deleteQuestion(questionId : any){
    Swal.fire(
      {
        icon : 'info',
        title : 'You want to delete this Question ?',
        showCancelButton : true,
        cancelButtonText : 'No',
        cancelButtonColor : 'red',
        confirmButtonText : 'Yes',
        confirmButtonColor : 'green',
      }
    ).then((result)=>{
      if(result.isConfirmed){
        this.questionService.deleteQuestion(questionId).subscribe(
          (data)=>{
            this.questions =  this.questions.filter((question) => question.qid != questionId);
            Swal.fire('Success','Question is deleted Successfully','success');
          },
          (error)=>{
            console.log(error);
            Swal.fire('Error', 'Something went wrong !', 'error');
          }
        )
      }
    })

  }

}
