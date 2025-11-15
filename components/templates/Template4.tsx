import { JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';

export function generateTemplate4Html({ formData, templateStyle }: { formData: JobPostFormData; templateStyle: TemplateStyle }): string {
  if (!formData || !templateStyle) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Orbitron:wght@400;700;900&family=Quicksand:wght@400;600;700&family=Raleway:wght@400;600;700;900&family=Cormorant+Garamond:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&family=Bebas+Neue&family=Nunito:wght@400;600;700;900&family=Poppins:wght@400;600;700;900&family=Work+Sans:wght@400;600;700&family=Inter:wght@400;600;700;900&family=Rubik:wght@400;600;700;900&family=Lexend:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&family=Merriweather:wght@400;700;900&family=DM+Sans:wght@400;600;700;900&display=swap');

          @page {
            size: A3;
            margin: 0;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          body {
            font-family: ${templateStyle.fontFamily};
            background-color: ${templateStyle.backgroundColor};
            color: ${templateStyle.textColor};
            line-height: 1.6;
          }

          .container {
            width: 210mm;
            height: 297mm;
            margin: 0;
            position: relative;
            overflow: hidden;
            background: ${templateStyle.backgroundColor};
          }

          /* Subtle decorative elements - non-overlapping */
          .bg-pattern {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
          }

          .shape-circle-topleft {
            position: absolute;
            top: -100px;
            left: -100px;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            border: 2px solid ${templateStyle.primaryColor}20;
          }

          .shape-circle-bottomright {
            position: absolute;
            bottom: -80px;
            right: -80px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: ${templateStyle.secondaryColor}10;
          }

          .shape-square-topright {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: ${templateStyle.primaryColor}15;
            transform: rotate(45deg);
          }

          .shape-square-bottomleft {
            position: absolute;
            bottom: 50px;
            left: 40px;
            width: 80px;
            height: 80px;
            border: 3px solid ${templateStyle.secondaryColor}20;
            transform: rotate(15deg);
          }

          /* Main content wrapper - centered layout */
          .content-wrapper {
            position: relative;
            z-index: 2;
            height: 100%;
            padding: 60px 50px;
            display: flex;
            flex-direction: column;
            gap: 35px;
          }

          /* HERO SECTION - Large centered "WE ARE HIRING" */
          .hero-section {
            text-align: center;
            padding: 40px 20px;
          }

          .hero-main-title {
            font-family: ${templateStyle.fontFamily};
            font-size: 72px;
            font-weight: 900;
            line-height: 1;
            color: ${templateStyle.primaryColor};
            letter-spacing: -3px;
            margin-bottom: 15px;
            text-transform: ${templateStyle.headerStyle === 'uppercase' ? 'uppercase' : 'uppercase'};
            text-shadow: 3px 3px 0px ${templateStyle.primaryColor}20;
          }

          .hero-subtitle {
            font-size: 24px;
            font-weight: 600;
            color: ${templateStyle.textColor};
            opacity: 0.8;
            letter-spacing: 4px;
            text-transform: uppercase;
          }

          /* Job Title & Company Section */
          .job-info-section {
            text-align: center;
            padding: 30px 40px;
            background: ${templateStyle.backgroundColor === '#FFFFFF' ? '#FAFAFA' : templateStyle.backgroundColor + 'CC'};
            border-radius: 20px;
            border: 3px solid ${templateStyle.primaryColor};
            box-shadow: 0 10px 40px ${templateStyle.primaryColor}15;
          }

          .job-title {
            font-family: ${templateStyle.fontFamily};
            font-size: ${templateStyle.fontSize?.title || '56px'};
            font-weight: 900;
            line-height: 1.1;
            color: ${templateStyle.textColor};
            margin-bottom: 20px;
            letter-spacing: -2px;
            text-transform: ${templateStyle.headerStyle === 'uppercase' ? 'uppercase' : 'none'};
          }

          .company-info {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            padding: 12px 30px;
            border-radius: 50px;
            box-shadow: 0 6px 20px ${templateStyle.primaryColor}40;
          }

          .company-initial {
            width: 40px;
            height: 40px;
            background: ${templateStyle.backgroundColor};
            color: ${templateStyle.primaryColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 900;
            flex-shrink: 0;
          }

          .company-name {
            font-size: 20px;
            font-weight: 700;
          }

          /* Stats Grid - Horizontal 4 columns */
          .stats-section {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding: 0 20px;
          }

          .stat-item {
            background: ${templateStyle.backgroundColor === '#FFFFFF' ? '#FFFFFF' : templateStyle.backgroundColor};
            padding: 25px 20px;
            border-radius: 16px;
            text-align: center;
            border: 2px solid ${templateStyle.primaryColor}30;
            box-shadow: 0 6px 25px ${templateStyle.textColor}08;
            position: relative;
            overflow: hidden;
          }

          .stat-item::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, ${templateStyle.primaryColor}, ${templateStyle.secondaryColor});
          }

          .stat-emoji {
            font-size: 38px;
            display: block;
            margin-bottom: 12px;
          }

          .stat-label {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: ${templateStyle.textColor};
            opacity: 0.6;
            margin-bottom: 8px;
          }

          .stat-value {
            font-size: 24px;
            font-weight: 900;
            color: ${templateStyle.primaryColor};
            line-height: 1.2;
          }

          /* Main Content - 2 Column Grid */
          .content-section {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 25px;
            flex: 1;
            overflow: hidden;
          }

          .content-card {
            background: ${templateStyle.backgroundColor === '#FFFFFF' ? '#FFFFFF' : templateStyle.backgroundColor};
            padding: 30px;
            border-radius: 20px;
            border: 2px solid ${templateStyle.secondaryColor}25;
            box-shadow: 0 8px 30px ${templateStyle.textColor}08;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 18px;
            padding-bottom: 16px;
            border-bottom: 3px solid ${templateStyle.primaryColor};
          }

          .card-icon {
            width: 50px;
            height: 50px;
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            flex-shrink: 0;
            box-shadow: 0 4px 15px ${templateStyle.primaryColor}35;
          }

          .card-title {
            font-family: ${templateStyle.fontFamily};
            font-size: ${templateStyle.fontSize?.subtitle || '26px'};
            font-weight: 800;
            color: ${templateStyle.textColor};
            letter-spacing: -0.5px;
          }

          .card-body {
            font-size: ${templateStyle.fontSize?.body || '15px'};
            line-height: 1.8;
            color: ${templateStyle.textColor};
            opacity: 0.9;
            overflow-y: auto;
          }

          .description-content {
            max-height: 320px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 14;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }

          /* Details List */
          .details-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .detail-item {
            background: linear-gradient(135deg, ${templateStyle.primaryColor}12, ${templateStyle.secondaryColor}08);
            padding: 18px 20px;
            border-radius: 14px;
            border-left: 5px solid ${templateStyle.primaryColor};
          }

          .detail-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 8px;
          }

          .detail-value {
            font-size: 18px;
            font-weight: 700;
            color: ${templateStyle.textColor};
            line-height: 1.3;
          }

          /* Footer Contact Section */
          .footer-section {
            background: ${templateStyle.primaryColor};
            padding: 35px 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px ${templateStyle.primaryColor}40;
          }

          .footer-title {
            font-family: ${templateStyle.fontFamily};
            font-size: 32px;
            font-weight: 900;
            color: ${templateStyle.backgroundColor};
            text-align: center;
            margin-bottom: 25px;
            letter-spacing: -0.5px;
            text-transform: ${templateStyle.headerStyle === 'uppercase' ? 'uppercase' : 'none'};
          }

          .contact-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            margin-bottom: 22px;
          }

          .contact-item {
            background: ${templateStyle.backgroundColor}25;
            backdrop-filter: blur(10px);
            padding: 20px 16px;
            border-radius: 14px;
            text-align: center;
            border: 2px solid ${templateStyle.backgroundColor}40;
          }

          .contact-emoji {
            font-size: 32px;
            display: block;
            margin-bottom: 10px;
          }

          .contact-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: ${templateStyle.backgroundColor};
            opacity: 0.85;
            margin-bottom: 8px;
          }

          .contact-value {
            font-size: 15px;
            font-weight: 700;
            color: ${templateStyle.backgroundColor};
            line-height: 1.3;
          }

          .cta-button {
            background: ${templateStyle.secondaryColor};
            color: ${templateStyle.backgroundColor};
            text-align: center;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 8px 30px ${templateStyle.secondaryColor}50;
            position: relative;
            overflow: hidden;
          }

          .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, ${templateStyle.backgroundColor}30, transparent);
            animation: slide-effect 3s infinite;
          }

          @keyframes slide-effect {
            to { left: 100%; }
          }

          .cta-text {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
          }

          .cta-subtext {
            font-size: 14px;
            font-weight: 600;
            margin-top: 8px;
            opacity: 0.95;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 1;
          }

          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 210mm;
              height: 297mm;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Subtle Background Decorations -->
          <div class="bg-pattern">
            <div class="shape-circle-topleft"></div>
            <div class="shape-circle-bottomright"></div>
            <div class="shape-square-topright"></div>
            <div class="shape-square-bottomleft"></div>
          </div>

          <!-- Main Content Wrapper -->
          <div class="content-wrapper">
            <!-- HERO SECTION - Large "WE ARE HIRING" -->
            <div class="hero-section">
              <h1 class="hero-main-title">WE ARE HIRING</h1>
              <p class="hero-subtitle">Join Our Team</p>
            </div>

            <!-- Job Title & Company Info -->
            <div class="job-info-section">
              <h2 class="job-title">${formData.job_title}</h2>
              <div class="company-info">
                <div class="company-initial">${formData.company_name.charAt(0)}</div>
                <span class="company-name">${formData.company_name}</span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-section">
              <div class="stat-item">
                <span class="stat-emoji">👥</span>
                <div class="stat-label">Openings</div>
                <div class="stat-value">${formData.vacancy}</div>
              </div>

              <div class="stat-item">
                <span class="stat-emoji">💼</span>
                <div class="stat-label">Job Type</div>
                <div class="stat-value">${formData.job_type.split(' ').slice(0, 2).join(' ')}</div>
              </div>

              <div class="stat-item">
                <span class="stat-emoji">📊</span>
                <div class="stat-label">Experience</div>
                <div class="stat-value">${formData.experience.split(' ')[0]}${formData.experience.includes('Year') ? ' Yrs' : ''}</div>
              </div>

              <div class="stat-item">
                <span class="stat-emoji">💰</span>
                <div class="stat-label">Salary</div>
                <div class="stat-value">${formData.salary.split('-')[0].trim()}</div>
              </div>
            </div>

            <!-- Main Content - 2 Columns -->
            <div class="content-section">
              <!-- Job Description -->
              <div class="content-card">
                <div class="card-header">
                  <div class="card-icon">📋</div>
                  <h3 class="card-title">Job Description</h3>
                </div>
                <div class="card-body description-content">
                  ${formData.job_description}
                </div>
              </div>

              <!-- Key Details Column -->
              <div class="content-card">
                <div class="card-header">
                  <div class="card-icon">🎯</div>
                  <h3 class="card-title">Key Details</h3>
                </div>
                <div class="details-list">
                  <div class="detail-item">
                    <div class="detail-label">Category</div>
                    <div class="detail-value">${formData.category}</div>
                  </div>

                  <div class="detail-item">
                    <div class="detail-label">Salary Range</div>
                    <div class="detail-value">${formData.salary}</div>
                  </div>

                  <div class="detail-item">
                    <div class="detail-label">Experience</div>
                    <div class="detail-value">${formData.experience}</div>
                  </div>

                  <div class="detail-item">
                    <div class="detail-label">Application Deadline</div>
                    <div class="detail-value">${formData.application_deadline}</div>
                  </div>

                  ${formData.additional_info ? `
                  <div class="detail-item">
                    <div class="detail-label">Benefits</div>
                    <div class="detail-value" style="font-size: 14px; line-height: 1.5; max-height: 60px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${formData.additional_info}</div>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Footer Contact Section -->
            <div class="footer-section">
              <h3 class="footer-title">How to Apply</h3>

              <div class="contact-grid">
                <div class="contact-item">
                  <span class="contact-emoji">📍</span>
                  <div class="contact-label">Location</div>
                  <div class="contact-value">${formData.company_address}</div>
                </div>

                <div class="contact-item">
                  <span class="contact-emoji">📧</span>
                  <div class="contact-label">Email</div>
                  <div class="contact-value">${formData.company_email}</div>
                </div>

                <div class="contact-item">
                  <span class="contact-emoji">📞</span>
                  <div class="contact-label">Phone</div>
                  <div class="contact-value">${formData.company_phone}</div>
                </div>

                <div class="contact-item">
                  <span class="contact-emoji">⏰</span>
                  <div class="contact-label">Deadline</div>
                  <div class="contact-value">${formData.application_deadline}</div>
                </div>
              </div>

              <div class="cta-button">
                <div class="cta-text">Apply Now</div>
                <div class="cta-subtext">Start Your Journey With Us Today</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

