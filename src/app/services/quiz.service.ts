import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  //get all quizes
  getQuizes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //add new Quiz
  addQuize(quiz : any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz on server
  deleteQuiz(id: number){
   return this.http.delete(`${baseUrl}/quiz/${id}`);
  }

  //get single quiz from server
  getQuize(qid : any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update the quiz
  updateQuiz(quiz : any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }

  //getting  Quizes of category
  getQuizOfCategory(cid : any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //get active quizes
  getActiveQuizes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizes of category
  getActiveQuizesOfCategory(cid : any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  getAllQuizes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
 
}
