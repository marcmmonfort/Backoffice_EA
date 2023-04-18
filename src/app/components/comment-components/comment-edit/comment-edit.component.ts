import { Component } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';


@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent {

  commentData!: Comment;
  commentId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private commentService: CommentService,private router:Router) {}

  ngOnInit(): void {
    this.loadCommentData();
  }

  loadCommentData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.commentId = parts[parts.length - 1];
    console.log(this.commentId);
    this.commentService.getComment(this.commentId).subscribe(commentData=>{
      console.log(commentData);
      this.commentData=commentData;
    });
  }

  onSubmit():void{
    this.openModal();
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  confirmChanges(): void {
    this.commentService.editComment(this.commentData, this.commentId).subscribe(() => {
      this.closeModal();
    });
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadCommentData();
  }

}
