import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const TITLES = [
  'Développement Frontend',
  'Développement Backend',
  'Administration DevOps'
];

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Typing
  displayedText = '';
  private currentTitleIndex = 0;
  private isDeleting = false;
  private typingSpeed = 100;
  private deleteSpeed = 50;
  private pauseTime = 2000;
  private typingInterval: any;

  skills: string[] = ['Angular', 'Node.js', 'Docker', 'Kubernetes', 'CI/CD', 'TypeScript', 'React', 'NestJS', 'AWS'];

  // Canvas particles
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;

  // Variable pour vérifier si on est dans le navigateur
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Vérifier si on est dans le navigateur
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.startTypingEffect();
  }

  ngAfterViewInit(): void {
    // N'initialiser le canvas QUE si on est dans le navigateur
    if (this.isBrowser) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      this.resizeCanvas();
      this.initParticles();
      this.animate();
    }
  }

  // === Effet de typing ===
  private startTypingEffect(): void {
    this.typingInterval = setInterval(() => {
      this.tick();
    }, this.isDeleting ? this.deleteSpeed : this.typingSpeed);
  }

  private tick(): void {
    const currentFullText = TITLES[this.currentTitleIndex];

    if (this.isDeleting) {
      this.displayedText = currentFullText.substring(0, this.displayedText.length - 1);
    } else {
      this.displayedText = currentFullText.substring(0, this.displayedText.length + 1);
    }

    // Changement de phase
    if (!this.isDeleting && this.displayedText === currentFullText) {
      // Pause à la fin du texte
      setTimeout(() => {
        this.isDeleting = true;
      }, this.pauseTime);
    } else if (this.isDeleting && this.displayedText === '') {
      this.isDeleting = false;
      this.currentTitleIndex = (this.currentTitleIndex + 1) % TITLES.length;
    }
  }

  // === Canvas - Protégé contre le SSR ===
  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.resizeCanvas();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isBrowser) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  }

  private resizeCanvas(): void {
    if (!this.isBrowser || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
  }

  private initParticles(): void {
    if (!this.isBrowser || !this.canvasRef) return;

    this.particles = [];
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  private animate = (): void => {
    if (!this.isBrowser || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
      this.ctx.fill();

      // Connexions entre particules
      this.particles.slice(i + 1).forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / 120})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });

      // Connexion à la souris
      const dx = particle.x - this.mouseX;
      const dy = particle.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = `rgba(118, 75, 162, ${1 - distance / 150})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  scrollToProjects(): void {
    this.router.navigate(['/projects']);
  }

  scrollToContact(): void {
    this.router.navigate(['/contact']);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }
}
