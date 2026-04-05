import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Contacts {

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faLinkedin = faLinkedin;

  formData = { name: '', email: '', subject: '', message: '' };
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  contactInfo = [
    { icon: this.faEnvelope, label: 'Email', value: 'wilfried.tchakeu@gmail.com', link: 'mailto:wilfried.tchakeu@gmail.com' },
    { icon: this.faPhone, label: 'Téléphone', value: '+33 6 XX XX XX XX', link: 'tel:+33600000000' },
    { icon: this.faMapMarkerAlt, label: 'Localisation', value: 'Amiens, France', link: '' },
    { icon: this.faLinkedin, label: 'LinkedIn', value: 'linkedin.com', link: 'https://linkedin.com/in/wilfried-tchakeu-8729292b0' }
  ];

  isFormValid(): boolean {
    return !!(this.formData.name && this.formData.email && this.formData.subject && this.formData.message);
  }

  send(): void {
    if (!this.isFormValid()) return;
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    setTimeout(() => {
      this.isSubmitting = false;
      this.submitSuccess = true;
      this.formData = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => { this.submitSuccess = false; }, 5000);
    }, 1500);
  }

  openLink(link: string): void {
    if (link) window.open(link, '_blank');
  }
}
