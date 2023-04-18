import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent {

  commentForm: FormGroup | any;
  isModalOpen:boolean=false;
  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private router: Router) { 
    
    this.commentForm = this.formBuilder.group({
      "idUserComment": ['', Validators.required],
      "idPublicationComment": ['', Validators.required],
      "textComment": ['', Validators.required]
      })
  }

  get f() {
    return this.commentForm.controls;
  }

  onSubmit(): void {
    if (this.commentForm.invalid) {
      return;
    }
    this.openModal();
  }
  confirmChanges(): void {
    const commentData = this.commentForm.value;
    console.log(commentData);
    this.commentService.addComment(commentData).subscribe(
      (response) => {
        console.log('Localización guardada correctamente:', response);
        // Aquí podrías redirigir a la página de éxito, por ejemplo
      },
      (error) => {
        console.error('Error al guardar location:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
    this.closeModal();
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

}
