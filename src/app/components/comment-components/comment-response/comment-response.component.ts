import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.css']
})
export class CommentResponseComponent implements OnInit {

  comments: Comment[] = [];
  filteredComments: any[] = [];
  //idPublicationComment: string = 'id';
  Id!: string;
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;
  aux!: string;

  constructor(private commentService: CommentService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getDatosId();
    this.printeado = false;
    this.numPage="1";
  }

  getDatosId(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.Id = parts[parts.length - 2];
    this.aux = parts[parts.length - 1];
    console.log(this.Id);
    console.log(this.aux);
  }

  showDetails(comment: any): void {
    this.router.navigate(['/comment-details', comment._id]);
  }
  showEdit(comment: any): void {
    this.router.navigate(['/comment-edit', comment._id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredComments = this.comments.filter((comment) =>
        comment.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    if(this.aux=='Responses'){
      this.commentService.getResponsesOfParticularComment(this.Id, this.numPage).subscribe((comments) => {
        if(comments.length==0){
          this.numPage = (parseInt(this.numPage, 10) - 1).toString();
          if(parseInt(this.numPage, 10) < 1){
            this.numPage = '1';
          }
          alert("Ya no hay más comentarios")
        }
        else{
          this.filteredComments = comments;
          if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Responses Loaded',
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
    else{
      this.commentService.getComments(this.Id, this.numPage).subscribe((comments) => {
        if(comments.length==0){
          this.numPage = (parseInt(this.numPage, 10) - 1).toString();
          // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'There are not more comments!',
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              customClass: {
                icon: 'swal-icon-color'
              },
              title: 'Responses Loaded',
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
