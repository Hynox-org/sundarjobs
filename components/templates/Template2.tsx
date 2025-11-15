import { JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';

export function generateTemplate2Html({ formData, templateStyle }: { formData: JobPostFormData; templateStyle: TemplateStyle }): string {
  if (!formData || !templateStyle) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Montserrat:wght@700;900&family=Space+Grotesk:wght@400;700&family=Playfair+Display:wght@700;900&family=Roboto+Mono:wght@400;700&family=Work+Sans:wght@500;700&family=Bebas+Neue&family=Oswald:wght@600;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: ${templateStyle.fontFamily};
            background-color: ${templateStyle.backgroundColor};
            color: ${templateStyle.textColor};
            line-height: 1.4;
            padding: 0;
            width: 793px; /* Fixed width for A4 */
            height: 1122px; /* Fixed height for A4 */
            overflow: hidden; /* Prevent overflow on the main page */
          }

          .container {
            width: 793px;
            height: 1122px; /* Fixed height for A4 */
            margin: 0 auto;
            background: ${templateStyle.backgroundColor};
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden; /* Ensure container content is contained */
          }

          /* Compact hero section */
          .hero {
            padding: 50px 40px 35px;
            position: relative;
            text-align: center;
            background: linear-gradient(135deg, ${templateStyle.backgroundColor} 0%, ${templateStyle.primaryColor}15 100%);
            border-bottom: 3px solid ${templateStyle.primaryColor};
          }

          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, ${templateStyle.primaryColor} 0%, ${templateStyle.secondaryColor} 100%);
          }

          .we-are-hiring {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 12px;
            opacity: 0.9;
          }

          h1 {
            font-size: ${templateStyle.fontSize?.title || '48px'};
            font-weight: 900;
            line-height: 1;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: -1px;
            color: ${templateStyle.textColor};
            text-shadow: 0 2px 6px rgba(0,0,0,0.3);
          }

          .company-name {
            font-size: ${templateStyle.fontSize?.subtitle || '20px'};
            font-weight: 600;
            color: ${templateStyle.primaryColor};
            margin-bottom: 18px;
            letter-spacing: 0.5px;
          }

          .quick-info {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
            margin-top: 18px;
          }

          .quick-badge {
            padding: 8px 18px;
            background: ${templateStyle.primaryColor}20;
            border: 2px solid ${templateStyle.primaryColor};
            border-radius: 3px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: ${templateStyle.textColor};
          }

          /* Compact content sections */
          .content {
            padding: 30px 40px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 25px;
          }

          .section {
            margin-bottom: 0;
          }

          .section-header {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 6px;
            border-left: 3px solid ${templateStyle.primaryColor};
            padding-left: 10px;
          }

          .section-title {
            font-size: 26px;
            font-weight: 900;
            margin-bottom: 15px;
            color: ${templateStyle.textColor};
            line-height: 1.1;
          }

          /* Compact grid layout */
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
          }

          .detail-box {
            background: ${templateStyle.primaryColor}10;
            border-left: 3px solid ${templateStyle.primaryColor};
            padding: 12px 15px;
            position: relative;
          }

          .detail-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 5px;
            opacity: 0.85;
          }

          .detail-value {
            font-size: 18px;
            font-weight: 700;
            color: ${templateStyle.textColor};
            line-height: 1.2;
          }

          /* Compact description */
          .description {
            font-size: ${templateStyle.fontSize?.body || '13px'};
            line-height: 1.6;
            color: ${templateStyle.textColor};
            opacity: 0.9;
            white-space: pre-wrap;
            overflow-y: auto; /* Allow scrolling for description if it overflows */
            max-height: 150px; /* Set a max-height for descriptions */
          }

          /* Compact contact section */
          .contact-grid {
            display: grid;
            gap: 12px;
            margin-top: 15px;
          }

          .contact-row {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 12px 15px;
            background: ${templateStyle.primaryColor}08;
            border-left: 3px solid ${templateStyle.primaryColor};
          }

          .contact-icon {
            width: 38px;
            height: 38px;
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: bold;
            flex-shrink: 0;
          }

          .contact-content {
            flex: 1;
          }

          .contact-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 3px;
          }

          .contact-value {
            font-size: 14px;
            font-weight: 600;
            color: ${templateStyle.textColor};
            line-height: 1.3;
          }

          /* Compact footer */
          .footer {
            padding: 25px 40px;
            text-align: center;
            background: ${templateStyle.primaryColor}05;
            border-top: 3px solid ${templateStyle.primaryColor};
            margin-top: auto;
          }

          .apply-now {
            font-size: 22px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: ${templateStyle.primaryColor};
            margin-bottom: 8px;
          }

          .deadline {
            font-size: 13px;
            color: ${templateStyle.textColor};
            opacity: 0.7;
          }

          /* Minimal decorative elements */
          .accent-line {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, ${templateStyle.primaryColor} 50%, transparent 100%);
            margin: 20px 0;
          }

          @media print {
            body { 
              padding: 0; 
              width: 793px;
              height: 1122px;
              overflow: hidden; /* Ensure no overflow in print */
            }
            .container {
              width: 793px;
              height: 1122px;
              page-break-after: avoid;
              page-break-inside: avoid;
              overflow: hidden; /* Ensure container content is contained */
            }
            .description {
              max-height: none; /* Remove max-height for print */
              overflow: visible; /* Allow content to be visible in print */
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Hero Section -->
          <div class="hero">
            <div class="we-are-hiring">◆ WE ARE HIRING ◆</div>
            <h1>${formData.job_title}</h1>
            <div class="company-name">${formData.company_name}</div>
            
            <div class="quick-info">
              <div class="quick-badge">${formData.job_type}</div>
              <div class="quick-badge">${formData.category}</div>
              <div class="quick-badge">${formData.vacancy} Openings</div>
            </div>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Key Details -->
            <div class="section">
              <div class="section-header">POSITION DETAILS</div>
              <div class="details-grid">
                <div class="detail-box">
                  <div class="detail-label">Vacancies</div>
                  <div class="detail-value">${formData.vacancy}</div>
                </div>
                <div class="detail-box">
                  <div class="detail-label">Experience</div>
                  <div class="detail-value">${formData.experience}</div>
                </div>
                <div class="detail-box">
                  <div class="detail-label">Salary Range</div>
                  <div class="detail-value">${formData.salary}</div>
                </div>
                <div class="detail-box">
                  <div class="detail-label">Apply Before</div>
                  <div class="detail-value">${formData.application_deadline}</div>
                </div>
              </div>
            </div>

            <div class="accent-line"></div>

            <!-- Description -->
            <div class="section">
              <div class="section-header">ABOUT THE ROLE</div>
              <div class="section-title">Job Description</div>
              <div class="description">${formData.job_description}</div>
            </div>

            <div class="accent-line"></div>

            <!-- Contact Info -->
            <div class="section">
              <div class="section-header">GET IN TOUCH</div>
              <div class="section-title">Contact Information</div>
              
              <div class="contact-grid">
                <div class="contact-row">
                  <div class="contact-icon">📍</div>
                  <div class="contact-content">
                    <div class="contact-label">Location</div>
                    <div class="contact-value">${formData.company_address}</div>
                  </div>
                </div>
                
                <div class="contact-row">
                  <div class="contact-icon">📧</div>
                  <div class="contact-content">
                    <div class="contact-label">Email</div>
                    <div class="contact-value">${formData.company_email}</div>
                  </div>
                </div>
                
                <div class="contact-row">
                  <div class="contact-icon">📞</div>
                  <div class="contact-content">
                    <div class="contact-label">Phone</div>
                    <div class="contact-value">${formData.company_phone}</div>
                  </div>
                </div>
              </div>
            </div>

            ${formData.additional_info ? `
              <div class="accent-line"></div>
              <div class="section">
                <div class="section-header">ADDITIONAL INFO</div>
            <div class="description">${formData.additional_info}</div>
              </div>
            ` : ''}
          </div>

          <!-- Footer CTA -->
          <div class="footer">
            <div class="apply-now">APPLY NOW</div>
            <div class="deadline">Application Deadline: ${formData.application_deadline}</div>
          </div>
        </div>
      </body>
    </html>
  `;
}
