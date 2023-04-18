import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent {

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
      this.commentData=commentData;
      console.log(commentData);
    });
  }

  showResponses(comment:Comment):void{
    this.router.navigate(['comment-details/responses/',comment._id])
  }

}
