import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  idPublicationComment: string = 'id';
  numPage: string='5'; //PONER ALGUN TIPO DE PÁGINAS PARA QUE AL CAMBIAR DE LA PAGINA 1 A LA 2 SE OBTENGAN LOS COMENTARIOS
  searchTerm: string = '';
  constructor(private commentService: CommentService, private router: Router) {}
  ngOnInit(): void {
    this.commentService.getComments(this.idPublicationComment,this.numPage).subscribe(comments=> {
      this.comments = comments;
    });
  }

  showDetails(comment: any): void {
    this.router.navigate(['/comment-details', comment.id]);
  }
  showEdit(comment: any): void {
    this.router.navigate(['/comment-edit', comment.id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredComments = this.comments.filter((comment) =>
        comment.dateComment.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredComments = this.comments;
    }
  }

}
