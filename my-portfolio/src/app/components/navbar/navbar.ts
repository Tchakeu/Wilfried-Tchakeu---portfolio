import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 isScrolled = false;
  isMobileMenuOpen = false;

  menuItems = [
    { label: 'Accueil', route: '/home', fragment: '' },
    { label: 'À propos', route: '/about', fragment: '' },
    { label: 'Compétences', route: '/skills', fragment: '' },
    { label: 'Projets', route: '/projects', fragment: '' },
    { label: 'Contact', route: '/contact', fragment: '' }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}