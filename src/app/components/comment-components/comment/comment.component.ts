import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';

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
    this.commentService.getAllPaginatedComments(this.numPage).subscribe((comments) => {
      if(comments.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        alert("Ya no hay más comentarios")
      }
      else{
        this.filteredComments = comments;
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
        alert("Estas en la primera pagina");
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

}
