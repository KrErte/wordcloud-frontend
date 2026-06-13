import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Text } from '../text';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  selectedFile: File | null = null;
  uploading = false;
  error: string | null = null;

  constructor(private textService: Text, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.error = null;
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      this.error = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  upload(): void {
    if (!this.selectedFile) return;
    this.uploading = true;
    this.error = null;

    this.textService.uploadFile(this.selectedFile).subscribe({
      next: (response) => this.router.navigate(['/results', response.id]),
      error: () => {
        this.error = 'Upload failed. Please try again.';
        this.uploading = false;
      }
    });
  }
}
