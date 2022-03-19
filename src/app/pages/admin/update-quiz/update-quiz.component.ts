import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  quiz = 
    {
      qid : '',
      title : '',
      description : '',
      maxMarks : '',
      numberOfQuestions : '',
      active : '',
      category : {
        cid : '',
      }
    };

    categories = [
      {
        cid : "",
        title : '',
      },
    ]

  constructor(private activeRoute : ActivatedRoute, private quizeService : QuizService,
     private categoryService: CategoryService,
     private route : Router, private snackbar : MatSnackBar) {

   }

  ngOnInit(): void {
    //getting the qid from the url
    this.qid =  this.activeRoute.snapshot.params.qid;
    //loading categories
    this.categoryService.getCategories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
       console.log(error);
       Swal.fire('Error','Server error','error');
      }
    );
    //getting the single quiz using qid
    this.quizeService.getQuize(this.qid).subscribe(
      (data : any) =>{
        console.log(data);
        this.quiz=data;
      },
      (error)=>{
        console.log('Failed to get quiz');
        console.log(error);
      }
    )
  }

  updateQuiz(){
    this.quizeService.updateQuiz(this.quiz).subscribe(
      (data : any) =>{
        console.log(data);
        this.route.navigateByUrl("/admin-dashboard/view-quizes");
        this.snackbar.open('Successfully Updated !', 'OK',{
          duration : 3000,
        })
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Not Updated ! Try Again', 'error');
      }
    )
  }
}
