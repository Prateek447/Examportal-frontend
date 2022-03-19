import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private cateService : CategoryService) { }

  categories = [
    {
      cid : '',
      title : '',
    }
  ]


  ngOnInit(): void {
    this.cateService.getCategories().subscribe(
      (data : any)=>{
        this.categories=data;
      }
      ,
      (error)=>{
        console.log(error);
      }
    )
  }


  clickOn(){
    console.log('button is clicked');
  }

}
