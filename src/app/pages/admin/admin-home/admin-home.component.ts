import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private _quiz : QuizService, private user : UserService, private question : QuestionService) { }


   totalQuizes : any ;
   totalQuestions : any;
   totalUsers : any;

  ngOnInit(): void {
    this._quiz.getAllQuizes().subscribe(
      (data)=>{
        this.totalQuizes =  data;
      },
      (error)=>{
        console.log(error);
      }
    )

    this.user.getAllUsers().subscribe(
      (data)=>{
        this.totalUsers =  data;
      },
      (error)=>{
        console.log(error);
      }
    )

    this.question.getTotalQuestionsLen().subscribe(
      (data)=>{
        this.totalQuestions=data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }



}
