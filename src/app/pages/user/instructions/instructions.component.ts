import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  constructor(private _quiz : QuizService, private _route : ActivatedRoute, private router : Router) { }

  qid : any;
  quiz : any

  ngOnInit(): void {
    this.qid =  this._route.snapshot.params.qid;
    console.log(this.qid);
    this._quiz.getQuize(this.qid).subscribe(
      (data)=>{
       console.log(data);
       this.quiz =  data;
      },
      (error)=>{
        console.log("error while getting instructions");
        Swal.fire('Error','Quiz is not loaded ! Try again','error');
      }
    )
  }

  startQuiz(){
    Swal.fire(
      {
        icon : 'info',
        title : 'Do you want to start the Quiz ? ?',
        showCancelButton : true,
        cancelButtonText : 'No',
        cancelButtonColor : 'red',
        confirmButtonText : 'Yes',
        confirmButtonColor : 'green',
      }
    ).then( (result)=>{
      if(result.isConfirmed){
        console.log('confirmed');
        this.router.navigate(['/start/'+this.qid]);
      }
    })
  }

}
