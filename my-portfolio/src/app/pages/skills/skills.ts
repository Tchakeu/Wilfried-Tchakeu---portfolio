import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill { name: string; level: number; category: string; icon: string; }
interface SkillCategory { title: string; skills: Skill[]; }

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {

  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'Angular',     level: 90, category: 'frontend', icon: `${DI}/angularjs/angularjs-original.svg` },
        { name: 'TypeScript',  level: 85, category: 'frontend', icon: `${DI}/typescript/typescript-original.svg` },
        { name: 'HTML / CSS',  level: 95, category: 'frontend', icon: `${DI}/html5/html5-original.svg` },
        { name: 'JavaScript',  level: 88, category: 'frontend', icon: `${DI}/javascript/javascript-original.svg` },
        { name: 'React',       level: 75, category: 'frontend', icon: `${DI}/react/react-original.svg` },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Spring Boot', level: 85, category: 'backend', icon: `${DI}/spring/spring-original.svg` },
        { name: 'Node.js',     level: 85, category: 'backend', icon: `${DI}/nodejs/nodejs-original.svg` },
        { name: 'Laravel',     level: 80, category: 'backend', icon: `${DI}/laravel/laravel-plain.svg` },
        { name: 'PostgreSQL',  level: 80, category: 'backend', icon: `${DI}/postgresql/postgresql-original.svg` },
        { name: 'MySQL',       level: 75, category: 'backend', icon: `${DI}/mysql/mysql-original.svg` },
        { name: 'MongoDB',     level: 75, category: 'backend', icon: `${DI}/mongodb/mongodb-original.svg` },
        { name: 'Python',      level: 90, category: 'backend', icon: `${DI}/python/python-original.svg` },
      ]
    },
    {
      title: 'DevOps',
      skills: [
        { name: 'Docker',      level: 88, category: 'devops', icon: `${DI}/docker/docker-original.svg` },
        { name: 'Kubernetes',  level: 75, category: 'devops', icon: `${DI}/kubernetes/kubernetes-plain.svg` },
        { name: 'Jenkins',     level: 78, category: 'devops', icon: `${DI}/jenkins/jenkins-original.svg` },
        { name: 'GitLab CI',   level: 85, category: 'devops', icon: `${DI}/gitlab/gitlab-original.svg` },
        { name: 'AWS',         level: 70, category: 'devops', icon: `${DI}/amazonwebservices/amazonwebservices-original.svg` },
        { name: 'Terraform',   level: 68, category: 'devops', icon: `${DI}/terraform/terraform-original.svg` },
      ]
    },
    {
      title: 'Outils & Autres',
      skills: [
        { name: 'Git',         level: 92, category: 'tools', icon: `${DI}/git/git-original.svg` },
        { name: 'Linux',       level: 85, category: 'tools', icon: `${DI}/linux/linux-original.svg` },
        { name: 'Nginx',       level: 75, category: 'tools', icon: `${DI}/nginx/nginx-original.svg` },
        { name: 'Figma',       level: 75, category: 'tools', icon: `${DI}/figma/figma-original.svg` },
        { name: 'Ansible',     level: 70, category: 'tools', icon: `${DI}/ansible/ansible-original.svg` },
      ]
    }
  ];

  ngOnInit(): void {
    this.animateSkillBars();
  }

  private animateSkillBars(): void {
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.skill-progress').forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) bar.style.width = level + '%';
      });
    }, 200);
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Avancé';
    if (level >= 70) return 'Intermédiaire';
    return 'Débutant';
  }
}