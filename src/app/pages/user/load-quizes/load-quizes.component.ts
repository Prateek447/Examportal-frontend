import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quizes',
  templateUrl: './load-quizes.component.html',
  styleUrls: ['./load-quizes.component.css']
})
export class LoadQuizesComponent implements OnInit {

  catId :  any;

  constructor(private _route : ActivatedRoute, private _quiz : QuizService) { }

  quizes : any;

  ngOnInit(): void {
    
    // we are checking here that data in the url is changed or not
    //then show content only data to that specific url
    this._route.params.subscribe(
      (params)=>{

        this.catId =  params.catId;
        console.log(this.catId);
        if(this.catId==0){
        console.log("loading all quizes");
        
        //getting all the quizes
        this._quiz.getActiveQuizes().subscribe(
          (data)=>{
             console.log(data);
             this.quizes =  data;
          },
          (error)=>{
            console.log(error);
          }
    
        )
        }
        else{
        console.log('load category quiz');
         this.quizes = [];
         this._quiz.getActiveQuizesOfCategory(this.catId).subscribe(
           (data)=>{
             console.log("loding specific quizes");
             this.quizes =  data;
             console.log(data);
           },
           (error)=>{
            console.log(error);
            console.log('Quizes is not loading');
           }
         )
        }
      }
    )
    
  }

}
