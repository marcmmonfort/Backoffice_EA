import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  filteredComments: any[] = [];
  //idPublicationComment: string = 'id';
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;

  constructor(private commentService: CommentService, private router: Router) {}
  
  ngOnInit(): void {
    this.commentService.getAllComments().subscribe(data=> {
      this.comments = data;
    }, error => {
      console.log(error);
    })
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(comment: any): void {
    this.router.navigate(['/comment-details', comment.uuid]);
  }
  showEdit(comment: any): void {
    this.router.navigate(['/comment-edit', comment.uuid]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredComments = this.comments.filter((comment) => {
        if (comment.createdAt) {
          return comment.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      });
      
    } 
  }

  printeaTodos() {
    this.commentService.getAllPaginatedComments(this.numPage).subscribe((comments) => {
      if(comments.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }

        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'You are in the last page!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
      }
      else{
        this.filteredComments = comments;
        if (!this.printeado){
          // Poner aquí el alert ...
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Comments Loaded',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
            backdrop: `
            rgba(0,0,0,0.8)
            `
          })
        }
        this.printeado = true;
      }
    });
  }
  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }
  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {
        
        // alert("Estas en la primera pagina");

        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'You are in the first page!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })

        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

}
