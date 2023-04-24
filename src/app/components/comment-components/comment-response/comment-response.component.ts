import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.css']
})
export class CommentResponseComponent implements OnInit {

  comments: Comment[] = [];
  filteredComments: any[] = [];
  //idPublicationComment: string = 'id';
  commentId!: string;
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;

  constructor(private commentService: CommentService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getCommentId();
    this.printeado = false;
    this.numPage="1";
  }

  getCommentId(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.commentId = parts[parts.length - 1];
    console.log(this.commentId);
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
    this.commentService.getResponsesOfParticularComment(this.commentId, this.numPage).subscribe((comments) => {
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
