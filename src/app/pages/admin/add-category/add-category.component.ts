import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  category = {
   title : '',
   description : '',
  };

  constructor(private categoryService : CategoryService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {

  }

  formSubmit(){

    if(this.category.title.trim()==''||this.category.title==null){
     this.snackbar.open('Title Required !','OK',{
       duration : 3000,
     })
     return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data : any) => {
          Swal.fire('Success !', 'New Category Added ','success');
          this.category.title='';
          this.category.description='';
      },
      (error) =>{
          Swal.fire('Error !' ,'Something went wrong','error');
      }
    )

  }

}
