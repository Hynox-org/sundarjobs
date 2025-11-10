import React from 'react';
import { JobTemplate } from '@/constants/jobTemplates';

interface FormData {
  id?: string;
  title: string;
  jobTitle: string;
  vacancy: string;
  jobType: string;
  category: string;
  experience: string;
  salary: string;
  jobDescription: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  applicationDeadline: string;
  additionalInfo: string;
}

interface HtmlTemplateProps {
  formData: FormData;
  template: JobTemplate;
}

export default function generateHtmlTemplate({ formData, template }: HtmlTemplateProps): string {
  if (!formData || !template) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: ${template.backgroundColor || '#ffffff'};
            color: ${template.textColor || '#000000'};
            padding: 0; /* Remove body padding */
            line-height: 1.6;
          }
          .container {
            width: 793px; /* Fixed width for PDF preview */
            margin: 0 auto;
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            text-align: center;
            padding: 40px 30px;
            background: linear-gradient(135deg, ${template.primaryColor || '#0ea5e9'} 0%, ${template.secondaryColor || '#06b6d4'} 100%);
            color: white;
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            line-height: 1.2;
          }
          .company-name {
            font-size: 20px;
            font-weight: 500;
            opacity: 0.95;
            margin-bottom: 15px;
          }
          .badge-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
          }
          .badge {
            display: inline-block;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            color: white;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          .content {
            padding: 30px;
          }
          .section {
            margin-bottom: 30px;
            padding-bottom: 25px;
            border-bottom: 2px solid #f0f0f0;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 20px;
            color: ${template.primaryColor || '#0ea5e9'};
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .section-title::before {
            content: '';
            width: 4px;
            height: 24px;
            background: ${template.primaryColor || '#0ea5e9'};
            border-radius: 2px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          .info-item {
            padding: 15px;
            background: #f9fafb;
            border-radius: 8px;
            border-left: 3px solid ${template.primaryColor || '#0ea5e9'};
          }
          .label {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .value {
            font-size: 16px;
            font-weight: 500;
            color: #111827;
          }
          .description {
            line-height: 1.8;
            white-space: pre-wrap;
            font-size: 15px;
            color: #374151;
          }
          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: #f9fafb;
            border-radius: 8px;
          }
          .contact-icon {
            width: 40px;
            height: 40px;
            background: ${template.primaryColor || '#0ea5e9'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f9fafb;
            color: #6b7280;
            font-size: 14px;
          }
          @media print {
            body { padding: 0; }
            .container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${formData.jobTitle}</h1>
            <div class="company-name">${formData.companyName}</div>
            <div class="badge-container">
              <span class="badge">${formData.jobType}</span>
              <span class="badge">${formData.category}</span>
              <span class="badge">${formData.vacancy} Positions</span>
            </div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Job Details</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Vacancies</div>
                  <div class="value">${formData.vacancy}</div>
                </div>
                <div class="info-item">
                  <div class="label">Experience</div>
                  <div class="value">${formData.experience}</div>
                </div>
                <div class="info-item">
                  <div class="label">Salary</div>
                  <div class="value">${formData.salary}</div>
                </div>
                <div class="info-item">
                  <div class="label">Deadline</div>
                  <div class="value">${formData.applicationDeadline}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Job Description</div>
              <div class="description">${formData.jobDescription}</div>
            </div>

            <div class="section">
              <div class="section-title">Company Information</div>
              <div class="contact-info">
                <div class="contact-item">
                  <div class="contact-icon">📍</div>
                  <div>
                    <div class="label">Address</div>
                    <div class="value">${formData.companyAddress}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">📧</div>
                  <div>
                    <div class="label">Email</div>
                    <div class="value">${formData.companyEmail}</div>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">📞</div>
                  <div>
                    <div class="label">Phone</div>
                    <div class="value">${formData.companyPhone}</div>
                  </div>
                </div>
              </div>
            </div>

            ${formData.additionalInfo ? `
              <div class="section">
                <div class="section-title">Additional Information</div>
                <div class="description">${formData.additionalInfo}</div>
              </div>
            ` : ''}
          </div>

          <div class="footer">
            Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </body>
    </html>
  `;
}
