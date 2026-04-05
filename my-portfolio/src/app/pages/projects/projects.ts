import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModalComponent } from '../project-modal/project-modal';

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
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  selectedCategory: string = 'all';
  selectedProject: Project | null = null;
  isModalOpen: boolean = false;

  categories = [
    { id: 'all', label: 'Tous' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'devops', label: 'DevOps' },
    { id: 'frontend', label: 'Frontend' }
  ];

  /** Retourne une icône SVG selon la catégorie */
  getProjectIcon(category: string): string {
    const icons: Record<string, string> = {
      fullstack: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3"/><path d="M13 14h4"/></svg>`,
      devops: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      frontend: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    };
    return icons[category] ?? icons['fullstack'];
  }

  projects: Project[] = [
    {
      id: 1,
      title: 'Plateforme E-commerce',
      description: 'Application e-commerce complète avec panier, paiement et gestion des commandes.',
      detailedDescription: 'Plateforme e-commerce full-stack moderne construite avec Angular et Node.js. Cette application offre une expérience d\'achat fluide avec un système de panier intelligent, intégration de paiement sécurisée via Stripe, et un dashboard administrateur complet. Architecture microservices conteneurisée avec Docker pour une scalabilité optimale.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Docker', 'Stripe', 'Redis', 'JWT'],
      image: 'fullstack',
      githubUrl: 'https://github.com/votre-username/ecommerce',
      liveUrl: 'https://demo-ecommerce.com',
      category: 'fullstack',
      features: [
        'Système de panier avec sauvegarde en temps réel',
        'Paiement sécurisé avec Stripe et gestion des webhooks',
        'Dashboard administrateur avec statistiques détaillées',
        'Gestion des stocks et notifications automatiques',
        'Système de recommandations basé sur l\'historique',
        'API RESTful documentée avec Swagger'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Pipeline CI/CD',
      description: 'Infrastructure automatisée avec Jenkins, Docker et Kubernetes.',
      detailedDescription: 'Solution DevOps complète pour le déploiement continu d\'applications. Pipeline automatisé qui gère les tests, la construction, et le déploiement sur Kubernetes.',
      technologies: ['Jenkins', 'Docker', 'Kubernetes', 'GitLab', 'Terraform', 'Ansible', 'Prometheus'],
      image: 'devops',
      githubUrl: 'https://github.com/votre-username/cicd-pipeline',
      category: 'devops',
      features: [
        'Déploiement automatisé sur Kubernetes avec rolling updates',
        'Tests automatisés à chaque commit (unit, integration, e2e)',
        'Infrastructure as Code avec Terraform et modules réutilisables',
        'Monitoring et alerting avec Prometheus et Grafana',
        'Rollback automatique en cas d\'échec de déploiement',
        'Intégration Slack pour notifications d\'équipe'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop'
      ]
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Tableau de bord temps réel pour visualisation de données avec graphiques interactifs.',
      detailedDescription: 'Dashboard analytics moderne et réactif développé avec Angular. Visualisation en temps réel de données complexes avec des graphiques interactifs et personnalisables.',
      technologies: ['Angular', 'Chart.js', 'RxJS', 'WebSocket', 'D3.js', 'SCSS'],
      image: 'frontend',
      githubUrl: 'https://github.com/votre-username/dashboard',
      liveUrl: 'https://dashboard-demo.com',
      category: 'frontend',
      features: [
        'Graphiques interactifs avec Chart.js et D3.js',
        'Mises à jour en temps réel via WebSocket',
        'Widgets personnalisables avec drag & drop',
        'Export des données en PDF, Excel, CSV',
        'Système de filtres avancés et recherche',
        'Dark mode et thèmes personnalisables'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'
      ]
    },
    {
      id: 4,
      title: 'API REST Sécurisée',
      description: 'API RESTful avec authentification JWT, rate limiting et documentation Swagger.',
      detailedDescription: 'API REST robuste et sécurisée construite avec Node.js et Express. Architecture modulaire avec middlewares personnalisés.',
      technologies: ['Node.js', 'Express', 'JWT', 'PostgreSQL', 'Swagger', 'Redis', 'Winston'],
      image: 'fullstack',
      githubUrl: 'https://github.com/votre-username/secure-api',
      category: 'fullstack',
      features: [
        'Authentification JWT avec refresh tokens',
        'Rate limiting par utilisateur et par endpoint',
        'Validation des données avec Joi',
        'Logging structuré avec Winston',
        'Cache Redis pour optimisation des performances',
        'Documentation Swagger interactive et à jour'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop'
      ]
    },
    {
      id: 5,
      title: 'Monitoring Stack',
      description: 'Stack de monitoring avec Prometheus, Grafana et Alertmanager.',
      detailedDescription: 'Solution de monitoring complète pour infrastructure cloud. Collecte de métriques avec Prometheus, visualisation avec Grafana.',
      technologies: ['Prometheus', 'Grafana', 'Docker', 'Alertmanager', 'Node Exporter', 'cAdvisor'],
      image: 'devops',
      githubUrl: 'https://github.com/votre-username/monitoring',
      category: 'devops',
      features: [
        'Dashboards Grafana prêts à l\'emploi',
        'Alertes intelligentes avec Alertmanager',
        'Métriques système avec Node Exporter',
        'Monitoring de conteneurs avec cAdvisor',
        'Intégration notifications (Email, Slack, PagerDuty)',
        'Rétention des données configurable'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop'
      ]
    },
    {
      id: 6,
      title: 'Progressive Web App',
      description: 'Application web progressive avec fonctionnalités offline et notifications push.',
      detailedDescription: 'PWA moderne développée avec Angular offrant une expérience native sur mobile et desktop.',
      technologies: ['Angular', 'Service Workers', 'IndexedDB', 'PWA', 'Workbox', 'Firebase'],
      image: 'frontend',
      githubUrl: 'https://github.com/votre-username/pwa',
      liveUrl: 'https://pwa-demo.com',
      category: 'frontend',
      features: [
        'Mode offline avec Service Workers',
        'Synchronisation en arrière-plan',
        'Notifications push avec Firebase Cloud Messaging',
        'Installation sur écran d\'accueil',
        'Cache stratégique pour performances optimales',
        'Score Lighthouse 100/100'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop'
      ]
    }
  ];

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'all') return this.projects;
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(categoryId: string): void { this.selectedCategory = categoryId; }

  openProjectModal(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => { this.selectedProject = null; }, 300);
  }

  openLink(url: string | undefined): void {
    if (url) window.open(url, '_blank');
  }
}
