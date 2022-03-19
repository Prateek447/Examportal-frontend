import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminProfileComponent } from './pages/admin/admin-profile/admin-profile.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UploadImageComponent } from './pages/admin/upload-image/upload-image.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizesComponent } from './pages/admin/view-quizes/view-quizes.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizesComponent } from './pages/user/load-quizes/load-quizes.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
{
path :'',
component : HomeComponent,
pathMatch : 'full',
},
{
  path : 'signup',
  component : SignupComponent,
  pathMatch : 'full',
},
{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full',
},
{
  path : 'start/:qid',
  component : StartQuizComponent,
  canActivate : [NormalGuard],
},
{
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate : [AdminGuard],
  children : [
    {
      path : '',
      component : AdminHomeComponent
    },
    {
    path : 'profile',
    component : AdminProfileComponent
  },
  {
    path : 'categories',
    component : ViewCategoryComponent
  },
  {
    path : 'add-category',
    component : AddCategoryComponent
  },
  {
    path : 'view-quizes',
    component : ViewQuizesComponent,
  },
  {
    path : 'add-quiz',
    component : AddQuizComponent,
  },
  {
    path: 'update-quiz/:qid',
    component : UpdateQuizComponent,
  },
  {
    path : 'questions/:qid/:title',
    component : ViewQuestionsComponent,
  },
  {
    path : 'add-question/:qid/:title',
    component : AddQuestionComponent,
  },
  {
    path : 'update-question/:qid',
    component : UpdateQuestionComponent,
  },
  {
    path : 'change-image/:qid',
    component : UploadImageComponent
  }
]
},
{
  path: 'user-dashboard',
  component : UserDashboardComponent,
  canActivate : [NormalGuard],
  children :[
    {
      path : 'quizes/:catId',
      component : LoadQuizesComponent
    },
    {
      path : 'instructions/:qid',
      component : InstructionsComponent
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
