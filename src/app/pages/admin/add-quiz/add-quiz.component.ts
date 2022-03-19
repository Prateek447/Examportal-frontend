import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {


  quiz = {
    title : '',
    description : '',
    maxMarks : '',
    numberOfQuestions : '',
    active : true,
    category : {
      cid : '',
    },
  }

  categories = [
    {
      cid : "",
      title : '',
    },
  ]

  constructor(private categoryService : CategoryService, private quizService : QuizService, private snackbar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
       console.log(error);
       Swal.fire('Error','Server error','error');
      }
    )

  }

  formSubmit() {

    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this.snackbar.open('Title is required', 'OK', {
        duration : 3000,
      })
    return;
    }
    this.quizService.addQuize(this.quiz).subscribe(
      (data : any)=>{
        console.log(data);
        this.router.navigateByUrl("/admin-dashboard/view-quizes");
        this.snackbar.open('New Quiz Added !', 'OK', {
          duration : 3000,
        })
      },
      (error)=>{
       console.log(error);
       Swal.fire('Error !','Not Added','error');
      }
    )
  }

}
