import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }


  getQuestionsOfQuiz(qid : any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  addQuestion(question : any) {
    return this.http.post(`${baseUrl}/question/`,question);
  }

  getQuestion(qid : any){
    return this.http.get(`${baseUrl}/question/${qid}`);
  }


  getQuestionsForTest(qid: any){
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  getQuestions(){
    return this.http.get(`${baseUrl}/question/`);
  }

  updateQuestion(question : any){
    return this.http.put(`${baseUrl}/question/`,question);
  }

  deleteQuestion(questionId : any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  evalQuiz(questions : any){
    return this.http.put(`${baseUrl}/question/eval-quiz`,questions);
  }

  getTotalQuestionsLen(){
    return this.http.get(`${baseUrl}/question/size`);
  }
}
