import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qid: any;
  title : any;
 
  public classicEditor : any;



  question = {
    quiz : {
      qid : '',
    },
    content : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    answer : '',
  }

  constructor(private activatedRout : ActivatedRoute, 
    private questionService : QuestionService,
    private snackbar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
     this.classicEditor = ClassicEditor;
    this.qid =  this.activatedRout.snapshot.params.qid;
    this.title =  this.activatedRout.snapshot.params.title;
    this.question.quiz['qid'] = this.qid;
    console.log(this.qid);
  }

  addQuestion(){

    if(this.question.content.trim()==''|| this.question.content==null){
      this.snackbar.open('Question is required !','OK',{
        duration : 3000,
      })
      return;
    }
    this.questionService.addQuestion(this.question).subscribe(
      (data : any) =>{
         console.log(data);
         this.router.navigateByUrl("/admin-dashboard/questions/"+this.qid+"/"+this.title);
         this.snackbar.open('Question Added Successfully','OK',{
           duration : 3000,
         })
      },
      (error) =>{
       console.log(error);
       this.snackbar.open('Question Not added ! Try again', 'OK', {
         duration : 3000,
       })
      }
    )
  }

}
