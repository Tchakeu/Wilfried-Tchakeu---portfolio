import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin, faGithub, faTwitter,faGitlab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: faLinkedin, url: 'https://www.linkedin.com/in/wilfried-tchakeu-8729292b0/', label: 'LinkedIn' },
    { icon: faGithub, url: 'https://github.com/Tchakeu', label: 'GitHub' },
    { icon: faGitlab, url: 'https://gitlab.com/vigny', label: 'GitLab' }
  ];

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}

