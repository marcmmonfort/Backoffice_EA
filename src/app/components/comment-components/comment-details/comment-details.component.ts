import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent {

  commentData!: any;
  commentId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private commentService: CommentService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.commentId = parts[parts.length - 1];
    console.log(this.commentId);
    this.commentService.getComment(this.commentId).subscribe((commentData)=>{
      this.commentData=commentData;
      const idaux:string =this.commentData.idUserComment
      console.log(idaux);
    });
    console.log("Aqui llega");
    //console.log(this.commentData._id+"Hola");
    const idaux:string =this.commentData.idUserComment
    console.log(idaux);
  }

  showResponses(id:string):void{
    this.router.navigate(['comment-details/responses/',id])
  }

}
