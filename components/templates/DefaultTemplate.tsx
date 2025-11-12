import { JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';

export function generateDefaultTemplateHtml({ formData, templateStyle }: { formData: JobPostFormData; templateStyle: TemplateStyle }): string {
  if (!formData || !templateStyle) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Montserrat:wght@700;900&family=Space+Grotesk:wght@400;700&family=Playfair+Display:wght@700;900&family=Roboto+Mono:wght@400;700&family=Work+Sans:wght@500;700;900&family=Bebas+Neue&family=Oswald:wght@600;700&family=Anton&display=swap');

          @page {
            size: A4;
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
            line-height: 1.4;
          }

          .container {
            width: 210mm;
            height: 297mm;
            margin: 0;
            position: relative;
            overflow: hidden;
            background: ${templateStyle.backgroundColor};
          }

          /* Diagonal split background */
          .diagonal-split {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(145deg, 
              ${templateStyle.backgroundColor} 0%, 
              ${templateStyle.backgroundColor} 62%, 
              ${templateStyle.primaryColor} 62%, 
              ${templateStyle.primaryColor} 100%);
            z-index: 0;
          }

          /* Decorative geometric shapes */
          .shape-circle {
            position: absolute;
            top: -70px;
            right: -70px;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: ${templateStyle.secondaryColor};
            opacity: 0.13;
            z-index: 1;
          }

          .shape-square {
            position: absolute;
            bottom: 70px;
            left: -35px;
            width: 160px;
            height: 160px;
            background: ${templateStyle.primaryColor};
            opacity: 0.07;
            transform: rotate(25deg);
            z-index: 1;
          }

          /* Main content wrapper */
          .content-wrapper {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          /* Hero section - Bigger sizes */
          .hero-section {
            padding: 40px 40px 28px;
            position: relative;
          }

          .eyebrow-tag {
            display: inline-block;
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            padding: 8px 24px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 3px;
            text-transform: uppercase;
            transform: rotate(-2deg);
            margin-bottom: 16px;
            box-shadow: 4px 4px 0px ${templateStyle.textColor}20;
          }

          /* Bigger headline */
          .mega-title {
            font-size: 52px;
            font-weight: 900;
            line-height: 0.95;
            color: ${templateStyle.textColor};
            text-transform: uppercase;
            letter-spacing: -2px;
            margin-bottom: 10px;
            word-wrap: break-word;
            text-shadow: 3px 3px 0px ${templateStyle.primaryColor}30;
            max-height: 110px;
            overflow: hidden;
          }

          .mega-title span {
            display: block;
            background: linear-gradient(135deg, ${templateStyle.primaryColor}, ${templateStyle.secondaryColor});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .company-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: ${templateStyle.textColor};
            color: ${templateStyle.backgroundColor};
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 700;
            margin-top: 10px;
            clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
            max-width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .company-icon {
            width: 7px;
            height: 7px;
            background: ${templateStyle.primaryColor};
            border-radius: 50%;
            flex-shrink: 0;
          }

          /* Quick stats bar */
          .stats-banner {
            display: flex;
            gap: 0;
            margin-top: 22px;
            transform: rotate(-1deg);
            box-shadow: 0 8px 18px rgba(0,0,0,0.13);
          }

          .stat-pill {
            flex: 1;
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            padding: 14px 16px;
            text-align: center;
            border-right: 3px solid ${templateStyle.backgroundColor};
            position: relative;
          }

          .stat-pill:last-child {
            border-right: none;
          }

          .stat-pill::before {
            content: '';
            position: absolute;
            top: -3px;
            left: 10px;
            right: 10px;
            height: 3px;
            background: ${templateStyle.secondaryColor};
          }

          .stat-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            opacity: 0.85;
            display: block;
            margin-bottom: 5px;
          }

          .stat-value {
            font-size: 20px;
            font-weight: 900;
            letter-spacing: -0.5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Divider */
          .angled-divider {
            height: 20px;
            background: linear-gradient(175deg, transparent 49%, ${templateStyle.primaryColor}13 50%);
            margin: 20px 0;
          }

          /* Content columns - Bigger text */
          .two-column-layout {
            display: flex;
            gap: 28px;
            padding: 0 40px;
            margin-bottom: 18px;
            flex: 1;
            overflow: hidden;
            max-height: 430px;
          }

          .column-left {
            flex: 1.2;
            overflow: hidden;
          }

          .column-right {
            flex: 1;
            overflow: hidden;
          }

          /* Section styling - Bigger */
          .section {
            margin-bottom: 20px;
          }

          .section-tag {
            display: inline-block;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 2.2px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            border: 2px solid ${templateStyle.primaryColor};
            padding: 6px 14px;
            margin-bottom: 10px;
          }

          .section-heading {
            font-size: 24px;
            font-weight: 900;
            color: ${templateStyle.textColor};
            margin-bottom: 12px;
            letter-spacing: -1px;
            line-height: 1.1;
          }

          .description-text {
            font-size: 13px;
            line-height: 1.65;
            color: ${templateStyle.textColor};
            opacity: 0.88;
            margin-bottom: 12px;
            max-height: 145px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }

          /* Info cards - Bigger */
          .info-card-stack {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .info-card {
            background: ${templateStyle.backgroundColor};
            border-left: 4px solid ${templateStyle.primaryColor};
            padding: 12px 16px;
            box-shadow: 3px 3px 0px ${templateStyle.primaryColor}20;
            position: relative;
          }

          .info-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 100%;
            background: linear-gradient(90deg, transparent, ${templateStyle.primaryColor}07);
          }

          .info-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.6px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 5px;
          }

          .info-value {
            font-size: 17px;
            font-weight: 700;
            color: ${templateStyle.textColor};
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Single-line horizontal contact bar */
          .contact-zone {
            background: ${templateStyle.textColor};
            color: ${templateStyle.backgroundColor};
            padding: 28px 40px 24px;
            position: relative;
            margin-top: auto;
          }

          .contact-zone::before {
            content: '';
            position: absolute;
            top: -14px;
            left: 0;
            right: 0;
            height: 14px;
            background: ${templateStyle.textColor};
            clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%);
          }

          .contact-header {
            font-size: 22px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.8px;
            margin-bottom: 16px;
            color: ${templateStyle.backgroundColor};
            text-align: center;
          }

          /* Horizontal contact bar layout */
          .contact-bar {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            gap: 0;
            margin-bottom: 18px;
            border: 3px solid ${templateStyle.primaryColor};
            background: ${templateStyle.backgroundColor}12;
          }

          .contact-item {
            flex: 1;
            padding: 14px 16px;
            text-align: center;
            border-right: 3px solid ${templateStyle.primaryColor};
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .contact-item:last-child {
            border-right: none;
          }

          .contact-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: ${templateStyle.primaryColor};
            opacity: 0.3;
          }

          .contact-icon {
            font-size: 22px;
            margin-bottom: 6px;
          }

          .contact-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            opacity: 0.75;
            margin-bottom: 5px;
            color: ${templateStyle.backgroundColor};
          }

          .contact-value {
            font-size: 13px;
            font-weight: 700;
            line-height: 1.3;
            color: ${templateStyle.backgroundColor};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 5px;
          }

          /* Call to action */
          .cta-banner {
            background: ${templateStyle.primaryColor};
            color: ${templateStyle.backgroundColor};
            padding: 16px;
            text-align: center;
            transform: rotate(-1deg);
            margin: 0 -8px;
            box-shadow: 0 6px 15px rgba(0,0,0,0.28);
          }

          .cta-text {
            font-size: 24px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }

          .cta-deadline {
            font-size: 12px;
            font-weight: 600;
            margin-top: 4px;
            opacity: 0.9;
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
          <!-- Background elements -->
          <div class="diagonal-split"></div>
          <div class="shape-circle"></div>
          <div class="shape-square"></div>

          <div class="content-wrapper">
            <!-- Hero Section -->
            <div class="hero-section">
              <div class="eyebrow-tag">★ NOW HIRING ★</div>
              
              <h1 class="mega-title">
                ${formData.jobTitle.split(' ').slice(0, 2).join(' ')}
                <span>${formData.jobTitle.split(' ').slice(2).join(' ') || ''}</span>
              </h1>

              <div class="company-badge">
                <div class="company-icon"></div>
                ${formData.companyName}
              </div>

              <div class="stats-banner">
                <div class="stat-pill">
                  <span class="stat-label">Openings</span>
                  <div class="stat-value">${formData.vacancy}</div>
                </div>
                <div class="stat-pill">
                  <span class="stat-label">Type</span>
                  <div class="stat-value">${formData.jobType.split(' ')[0]}</div>
                </div>
                <div class="stat-pill">
                  <span class="stat-label">Experience</span>
                  <div class="stat-value">${formData.experience.split(' ')[0]}</div>
                </div>
              </div>
            </div>

            <div class="angled-divider"></div>

            <!-- Two Column Content -->
            <div class="two-column-layout">
              <!-- Left Column -->
              <div class="column-left">
                <div class="section">
                  <div class="section-tag">ROLE</div>
                  <h2 class="section-heading">What You'll Do</h2>
                  <div class="description-text">${formData.jobDescription}</div>
                </div>

                ${formData.additionalInfo ? `
                  <div class="section">
                    <div class="section-tag">PERKS</div>
                    <div class="description-text" style="max-height: 85px; -webkit-line-clamp: 4;">${formData.additionalInfo}</div>
                  </div>
                ` : ''}
              </div>

              <!-- Right Column -->
              <div class="column-right">
                <div class="section">
                  <div class="section-tag">DETAILS</div>
                  <h2 class="section-heading">Key Info</h2>
                  
                  <div class="info-card-stack">
                    <div class="info-card">
                      <div class="info-label">Category</div>
                      <div class="info-value">${formData.category}</div>
                    </div>
                    
                    <div class="info-card">
                      <div class="info-label">Salary Range</div>
                      <div class="info-value">${formData.salary}</div>
                    </div>
                    
                    <div class="info-card">
                      <div class="info-label">Apply By</div>
                      <div class="info-value">${formData.applicationDeadline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Horizontal Contact Bar -->
            <div class="contact-zone">
              <h3 class="contact-header">Let's Connect</h3>
              
              <div class="contact-bar">
                <div class="contact-item">
                  <div class="contact-icon">📍</div>
                  <div class="contact-label">Location</div>
                  <div class="contact-value">${formData.companyAddress}</div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">📧</div>
                  <div class="contact-label">Email</div>
                  <div class="contact-value">${formData.companyEmail}</div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">📞</div>
                  <div class="contact-label">Phone</div>
                  <div class="contact-value">${formData.companyPhone}</div>
                </div>
                
                <div class="contact-item">
                  <div class="contact-icon">⏰</div>
                  <div class="contact-label">Deadline</div>
                  <div class="contact-value">${formData.applicationDeadline}</div>
                </div>
              </div>

              <div class="cta-banner">
                <div class="cta-text">Apply Today!</div>
                <div class="cta-deadline">Join Our Growing Team</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}