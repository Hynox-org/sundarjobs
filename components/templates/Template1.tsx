import { JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';

export function generateTemplate1Html({ formData, templateStyle }: { formData: JobPostFormData; templateStyle: TemplateStyle }): string {
  if (!formData || !templateStyle) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Sora:wght@600;800&family=Outfit:wght@500;700;900&family=Poppins:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;900&family=Space+Grotesk:wght@400;500;700&family=Playfair+Display:wght@700;900&family=Roboto+Mono:wght@400;700&display=swap');

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
            height: 297mm; /* Fixed height for A4 */
            margin: 0;
            padding: 0;
            overflow: hidden; /* Prevent overflow on the main page */
          }

          body {
            font-family: ${templateStyle.fontFamily};
            line-height: 1.5;
            overflow: hidden; /* Ensure body content is contained */
          }

          .container {
            width: 210mm;
            height: 297mm; /* Fixed height for A4 */
            margin: 0;
            position: relative;
            background: ${templateStyle.backgroundColor};
            display: flex; /* Use flexbox to manage content distribution */
            flex-direction: column;
          }

          /* Asymmetric split background */
          .bg-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
          }

          .bg-section-1 {
            position: absolute;
            top: 0;
            left: 0;
            width: 45%;
            height: 100%;
            background: linear-gradient(165deg, ${templateStyle.primaryColor} 0%, ${templateStyle.primaryColor}DD 100%);
          }

          .bg-section-2 {
            position: absolute;
            top: 0;
            right: 0;
            width: 55%;
            height: 100%;
            background: ${templateStyle.backgroundColor};
          }

          /* Curved divider between sections */
          .curve-divider {
            position: absolute;
            left: 40%;
            top: 0;
            width: 15%;
            height: 100%;
            background: linear-gradient(90deg, ${templateStyle.primaryColor} 0%, transparent 100%);
            clip-path: ellipse(50% 100% at 0% 50%);
            opacity: 0.3;
          }

          /* Large decorative microphone - left side */
          .mic-decoration-left {
            position: absolute;
            bottom: -60px;
            left: -40px;
            font-size: 280px;
            opacity: 0.12;
            transform: rotate(-25deg);
            z-index: 1;
          }

          /* Medium microphone - top right */
          .mic-decoration-right {
            position: absolute;
            top: -50px;
            right: 40px;
            font-size: 180px;
            opacity: 0.08;
            transform: rotate(35deg);
            z-index: 1;
          }

          /* Organic blob shapes */
          .blob-1 {
            position: absolute;
            top: 15%;
            right: 10%;
            width: 150px;
            height: 150px;
            background: ${templateStyle.secondaryColor};
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
            opacity: 0.15;
            z-index: 1;
          }

          .blob-2 {
            position: absolute;
            bottom: 20%;
            left: 8%;
            width: 100px;
            height: 100px;
            background: ${templateStyle.backgroundColor};
            border-radius: 48% 52% 68% 32% / 42% 58% 42% 58%;
            opacity: 0.25;
            z-index: 1;
          }

          .blob-3 {
            position: absolute;
            top: 40%;
            right: 5%;
            width: 120px;
            height: 120px;
            background: ${templateStyle.secondaryColor};
            border-radius: 35% 65% 72% 28% / 64% 36% 64% 36%;
            opacity: 0.1;
            z-index: 1;
          }

          /* Mesh gradient overlay */
          .mesh-gradient {
            position: absolute;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(at 20% 30%, ${templateStyle.secondaryColor}26 0px, transparent 50%),
              radial-gradient(at 80% 70%, ${templateStyle.primaryColor}1F 0px, transparent 50%),
              radial-gradient(at 50% 50%, ${templateStyle.secondaryColor}14 0px, transparent 50%);
            z-index: 1;
          }

          /* Content wrapper */
          .content-wrapper {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
          }

          /* Left panel - Primary color section */
          .left-panel {
            width: 42%;
            padding: 45px 35px;
            display: flex;
            flex-direction: column;
            color: ${templateStyle.backgroundColor};
            position: relative;
          }

          /* Badge with animation */
          .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: ${templateStyle.backgroundColor}40;
            backdrop-filter: blur(10px);
            border: 2px solid ${templateStyle.backgroundColor}66;
            color: ${templateStyle.backgroundColor};
            padding: 10px 22px;
            border-radius: 30px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 30px;
            width: fit-content;
          }

          .pulse-dot {
            width: 10px;
            height: 10px;
            background: ${templateStyle.secondaryColor};
            border-radius: 50%;
            animation: pulse-glow 2s infinite;
          }

          @keyframes pulse-glow {
            0%, 100% { 
              transform: scale(1);
              opacity: 1;
            }
            50% { 
              transform: scale(1.3);
              opacity: 0.7;
            }
          }

          /* Job title section */
          .title-section {
            margin-bottom: 35px;
          }

          .job-title-main {
            font-family: ${templateStyle.fontFamily};
            font-size: ${templateStyle.fontSize?.title || '48px'};
            font-weight: 800;
            line-height: 1.1;
            color: ${templateStyle.backgroundColor};
            margin-bottom: 20px;
            letter-spacing: -1.5px;
            text-shadow: 2px 4px 12px ${templateStyle.textColor}33;
            max-height: 120px;
            overflow: hidden;
            text-transform: ${templateStyle.headerStyle === 'uppercase' ? 'uppercase' : 'none'};
          }

          .company-info {
            display: flex;
            align-items: center;
            gap: 14px;
            background: ${templateStyle.textColor}26;
            backdrop-filter: blur(8px);
            padding: 14px 20px;
            border-radius: 16px;
            border: 1px solid ${templateStyle.backgroundColor}33;
          }

          .company-avatar {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, ${templateStyle.secondaryColor}, ${templateStyle.secondaryColor}CC);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 900;
            color: ${templateStyle.backgroundColor};
            flex-shrink: 0;
          }

          .company-name {
            font-size: 19px;
            font-weight: 700;
            color: ${templateStyle.backgroundColor};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Key highlights - vertical pills */
          .highlights-section {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .highlight-pill {
            background: ${templateStyle.backgroundColor}33;
            backdrop-filter: blur(10px);
            padding: 16px 20px;
            border-radius: 16px;
            border: 1px solid ${templateStyle.backgroundColor}4D;
          }

          .highlight-pill {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .highlight-icon {
            font-size: 28px;
            flex-shrink: 0;
          }

          .highlight-content {
            flex: 1;
          }

          .highlight-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            opacity: 0.8;
            margin-bottom: 4px;
          }

          .highlight-value {
            font-size: 17px;
            font-weight: 800;
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Right panel - Light section */
          .right-panel {
            flex: 1;
            padding: 45px 40px;
            display: flex;
            flex-direction: column;
          }

          /* Top stats row */
          .stats-row {
            display: flex;
            gap: 12px;
            margin-bottom: 30px;
          }

          .stat-box {
            flex: 1;
            background: ${templateStyle.backgroundColor === '#FFFFFF' || templateStyle.backgroundColor === '#FBF8F3' ? '#FFFFFF' : templateStyle.backgroundColor + '1A'};
            padding: 18px 16px;
            border-radius: 18px;
            text-align: center;
            box-shadow: 0 4px 24px ${templateStyle.primaryColor}14;
            border: 2px solid ${templateStyle.primaryColor}26;
            position: relative;
            overflow: hidden;
          }

          .stat-box::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, ${templateStyle.primaryColor}, ${templateStyle.secondaryColor});
          }

          .stat-emoji {
            font-size: 28px;
            display: block;
            margin-bottom: 8px;
          }

          .stat-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 6px;
          }

          .stat-value {
            font-size: 18px;
            font-weight: 800;
            color: ${templateStyle.textColor};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Content sections */
          .content-sections {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow-y: auto; /* Allow scrolling within content sections if needed */
            max-height: calc(100% - 200px); /* Adjust based on surrounding elements' height */
            padding-bottom: 20px; /* Add some padding at the bottom */
          }

          .content-card {
            background: ${templateStyle.backgroundColor === '#FFFFFF' || templateStyle.backgroundColor === '#FBF8F3' ? '#FFFFFF' : templateStyle.backgroundColor + '1A'};
            padding: 26px;
            border-radius: 22px;
            box-shadow: 0 6px 32px ${templateStyle.textColor}0F;
            border: 2px solid ${templateStyle.secondaryColor}1A;
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 16px;
            padding-bottom: 14px;
            border-bottom: 2px solid ${templateStyle.primaryColor}26;
          }

          .card-icon-wrapper {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, ${templateStyle.primaryColor}, ${templateStyle.primaryColor}DD);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 16px ${templateStyle.primaryColor}40;
          }

          .card-title {
            font-family: ${templateStyle.fontFamily};
            font-size: ${templateStyle.fontSize?.subtitle || '22px'};
            font-weight: 800;
            color: ${templateStyle.textColor};
            letter-spacing: -0.5px;
          }

          .card-content {
            font-size: ${templateStyle.fontSize?.body || '13.5px'};
            line-height: 1.75;
            color: ${templateStyle.textColor};
          }

          .description-block {
            max-height: 150px; /* Keep existing max-height */
            overflow-y: auto; /* Allow scrolling for description if it overflows */
            text-overflow: ellipsis; /* Keep ellipsis for single line overflow */
          }

          /* Info grid */
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .info-item {
            background: linear-gradient(135deg, ${templateStyle.secondaryColor}26, ${templateStyle.primaryColor}1A);
            padding: 16px 18px;
            border-radius: 14px;
            border-left: 4px solid ${templateStyle.primaryColor};
          }

          .info-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 6px;
          }

          .info-value {
            font-size: 16px;
            font-weight: 700;
            color: ${templateStyle.textColor};
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* Bottom action section */
          .action-section {
            background: linear-gradient(135deg, ${templateStyle.textColor}, ${templateStyle.textColor}F0);
            margin: 0 -40px -45px;
            padding: 32px 40px;
            border-radius: 28px 28px 0 0;
            position: relative;
            overflow: hidden;
          }

          .action-section::before {
            content: '💼';
            position: absolute;
            font-size: 140px;
            opacity: 0.04;
            top: 50%;
            right: 30px;
            transform: translateY(-50%) rotate(-15deg);
          }

          .action-title {
            font-family: ${templateStyle.fontFamily};
            font-size: 24px;
            font-weight: 800;
            color: ${templateStyle.backgroundColor};
            text-align: center;
            margin-bottom: 18px;
            letter-spacing: -0.5px;
          }

          .contact-items {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          }

          .contact-item {
            background: ${templateStyle.backgroundColor}14;
            backdrop-filter: blur(10px);
            padding: 16px 12px;
            border-radius: 14px;
            text-align: center;
            border: 1px solid ${templateStyle.backgroundColor}26;
          }

          .contact-emoji {
            font-size: 26px;
            display: block;
            margin-bottom: 8px;
          }

          .contact-label {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.3px;
            text-transform: uppercase;
            color: ${templateStyle.backgroundColor}B3;
            margin-bottom: 6px;
          }

          .contact-value {
            font-size: 13px;
            font-weight: 600;
            color: ${templateStyle.backgroundColor};
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0 4px;
          }

          .cta-button {
            background: linear-gradient(135deg, ${templateStyle.primaryColor}, ${templateStyle.primaryColor}DD);
            color: ${templateStyle.backgroundColor};
            text-align: center;
            padding: 20px;
            border-radius: 16px;
            font-family: ${templateStyle.fontFamily};
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            box-shadow: 0 8px 32px ${templateStyle.primaryColor}66;
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
            background: linear-gradient(90deg, transparent, ${templateStyle.backgroundColor}4D, transparent);
            animation: slide-shine 3s infinite;
          }

          @keyframes slide-shine {
            to { left: 100%; }
          }

          .cta-subtitle {
            font-size: 12px;
            font-weight: 600;
            margin-top: 6px;
            opacity: 0.9;
            letter-spacing: 0.5px;
          }

          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              overflow: hidden; /* Ensure no overflow in print */
            }
            .container {
              width: 210mm;
              height: 297mm;
              page-break-after: avoid;
              page-break-inside: avoid;
              overflow: hidden; /* Ensure container content is contained */
            }
            .content-sections {
              max-height: none; /* Remove max-height for print to allow content to flow */
              overflow: visible; /* Allow content to be visible in print */
            }
            .description-block {
              max-height: none; /* Remove max-height for print */
              overflow: visible; /* Allow content to be visible in print */
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Background layers -->
          <div class="bg-layer">
            <div class="bg-section-1"></div>
            <div class="bg-section-2"></div>
            <div class="curve-divider"></div>
          </div>

          <!-- Decorative elements -->
          <div class="mic-decoration-left">🎤</div>
          <div class="mic-decoration-right">🎙️</div>
          <div class="blob-1"></div>
          <div class="blob-2"></div>
          <div class="blob-3"></div>
          <div class="mesh-gradient"></div>

          <!-- Main content -->
          <div class="content-wrapper">
            <!-- Left Panel - Primary Color Section -->
            <div class="left-panel">
              <div class="status-badge">
                <div class="pulse-dot"></div>
                Open Position
              </div>

              <div class="title-section">
                <h1 class="job-title-main">${formData.job_title}</h1>
                
                <div class="company-info">
                  <div class="company-avatar">${formData.company_name.charAt(0)}</div>
                  <div class="company-name">${formData.company_name}</div>
                </div>
              </div>

              <div class="highlights-section">
                <div class="highlight-pill">
                  <div class="highlight-icon">💰</div>
                  <div class="highlight-content">
                    <div class="highlight-label">Salary Range</div>
                    <div class="highlight-value">${formData.salary}</div>
                  </div>
                </div>

                <div class="highlight-pill">
                  <div class="highlight-icon">📊</div>
                  <div class="highlight-content">
                    <div class="highlight-label">Experience</div>
                    <div class="highlight-value">${formData.experience}</div>
                  </div>
                </div>

                <div class="highlight-pill">
                  <div class="highlight-icon">💼</div>
                  <div class="highlight-content">
                    <div class="highlight-label">Job Type</div>
                    <div class="highlight-value">${formData.job_type}</div>
                  </div>
                </div>

                <div class="highlight-pill">
                  <div class="highlight-icon">⏰</div>
                  <div class="highlight-content">
                    <div class="highlight-label">Apply Before</div>
                    <div class="highlight-value">${formData.application_deadline}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel - Light Section -->
            <div class="right-panel">
              <!-- Stats -->
              <div class="stats-row">
                <div class="stat-box">
                  <span class="stat-emoji">👥</span>
                  <div class="stat-label">Positions</div>
                  <div class="stat-value">${formData.vacancy}</div>
                </div>
                <div class="stat-box">
                  <span class="stat-emoji">🏢</span>
                  <div class="stat-label">Category</div>
                  <div class="stat-value">${formData.category.split(' ').slice(0, 2).join(' ')}</div>
                </div>
              </div>

              <!-- Content cards -->
              <div class="content-sections">
                <div class="content-card">
                  <div class="card-header">
                    <div class="card-icon-wrapper">📝</div>
                    <h2 class="card-title">Role Overview</h2>
                  </div>
                  <div class="card-content description-block">
                    ${formData.job_description}
                  </div>
                </div>

                ${formData.additional_info ? `
                <div class="content-card" style="flex: 0 0 auto;">
                  <div class="card-header">
                    <div class="card-icon-wrapper">🎁</div>
                    <h2 class="card-title">Benefits & Perks</h2>
                  </div>
                  <div class="card-content" style="max-height: 90px; overflow: hidden;">
                    ${formData.additional_info}
                  </div>
                </div>
                ` : ''}

                <div class="content-card" style="flex: 0 0 auto;">
                  <div class="info-grid">
                    <div class="info-item">
                      <div class="info-label">Category</div>
                      <div class="info-value">${formData.category}</div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">Openings</div>
                      <div class="info-value">${formData.vacancy} Position${formData.vacancy > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action section -->
              <div class="action-section">
                <h3 class="action-title">Ready to Apply?</h3>
                
                <div class="contact-items">
                  <div class="contact-item">
                    <span class="contact-emoji">📍</span>
                    <div class="contact-label">Location</div>
                    <div class="contact-value">${formData.company_address.split(',')[0]}</div>
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
                  Apply Now
                  <div class="cta-subtitle">Join Our Team Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
