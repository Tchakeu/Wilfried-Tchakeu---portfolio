import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  detailedDescription?: string;
  features?: string[];
  screenshots?: string[];
}

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css',
})
export class ProjectModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() project: Project | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  currentScreenshotIndex: number = 0;

  ngOnInit() {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
  }

  ngOnChanges() {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
      this.currentScreenshotIndex = 0;
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  nextScreenshot() {
    if (this.project?.screenshots) {
      this.currentScreenshotIndex =
        (this.currentScreenshotIndex + 1) % this.project.screenshots.length;
    }
  }

  previousScreenshot() {
    if (this.project?.screenshots) {
      this.currentScreenshotIndex =
        this.currentScreenshotIndex === 0
          ? this.project.screenshots.length - 1
          : this.currentScreenshotIndex - 1;
    }
  }

  goToScreenshot(index: number) {
    this.currentScreenshotIndex = index;
  }

  openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
