import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  constructor( private categoryService : CategoryService) { }


  categories = [
    {
      "id" : 0,
       "title" : "",
       "description" : ""
    },
    // {
    //   "id" : 32,
    //   "title" : "python",
    //   "description" : "i am   desc"
    // },
    // {
    //   "id" : 244,
    //   "title" : "C++",
    //   "description" : "i am   desc"
    // }
  ]

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(
      (data : any) => {
        this.categories = data;
        console.log('categories is loading');
        console.log(data)
      },
      (error)=>{
          Swal.fire('Failed', 'Category not loaded', 'error');
          console.log(error);
      }
    )

  }

}
