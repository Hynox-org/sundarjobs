import { JobPostFormData } from '@/constants/jobTemplates';

export function generateTemplate4Html({ 
  formData, 
  backgroundColor = '#FFFFFF', 
  textColor = '#333333', 
  primaryColor = '#2563EB', 
  secondaryColor = '#60A5FA', 
  fontFamily = 'Arial, sans-serif' 
}: { 
  formData: JobPostFormData; 
  backgroundColor?: string; 
  textColor?: string; 
  primaryColor?: string; 
  secondaryColor?: string; 
  fontFamily?: string; 
}): string {
  if (!formData) return '<h1>Loading...</h1>';

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
            width: 100%;
            height: 100%;
            margin: 0;
            display: flex;
            justify-content:center;
            align-items:center;
            padding: 0;
            overflow: hidden;
          }

          body {
            font-family: ${fontFamily};
            line-height: 1.5;
          }

          .container {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 50px 45px;
            background: ${backgroundColor};
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden; 
          }

          /* Hero Section */
          .hero-section {
            text-align: center;
            margin-bottom: 45px;
            padding-bottom: 35px;
            border-bottom: 3px solid ${primaryColor};
          }

          .hero-title {
            font-family: ${fontFamily};
            font-size: 72px;
            font-weight: 900;
            color: ${primaryColor};
            letter-spacing: -2px;
            margin-bottom: 15px;
            text-transform: uppercase;
            line-height: 1;
          }

          .hero-subtitle {
            font-size: 24px;
            font-weight: 600;
            color: ${textColor};
            opacity: 0.8;
          }

          /* Job Title Section */
          .job-title-section {
            text-align: center;
            margin-bottom: 35px;
          }

          .job-title {
            font-family: ${fontFamily};
            font-size: 48px;
            font-weight: 800;
            color: ${textColor};
            margin-bottom: 12px;
            letter-spacing: -1px;
          }

          .company-name {
            font-size: 22px;
            font-weight: 600;
            color: ${primaryColor};
          }

          /* Key Info Grid */
          .key-info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 35px;
          }

          .info-card {
            background: ${backgroundColor === '#FFFFFF' ? '#F8F9FA' : backgroundColor + '4D'};
            padding: 20px 16px;
            border-radius: 16px;
            text-align: center;
            border: 2px solid ${primaryColor}33;
            transition: transform 0.2s;
          }

          .info-card:hover {
            transform: translateY(-2px);
          }

          .info-icon {
            font-size: 32px;
            display: block;
            margin-bottom: 10px;
          }

          .info-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: ${primaryColor};
            margin-bottom: 8px;
          }

          .info-value {
            font-size: 16px;
            font-weight: 700;
            color: ${textColor};
            line-height: 1.3;
          }

          /* Content Layout */
          .content-layout {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 24px;
            flex: 1;
            margin-bottom: 30px;
          }

          /* Left Column */
          .left-column {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .content-box {
            background: ${backgroundColor === '#FFFFFF' ? '#F8F9FA' : backgroundColor + '4D'};
            padding: 24px;
            border-radius: 18px;
            border-left: 4px solid ${primaryColor};
          }

          .content-box-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 2px solid ${primaryColor}26;
          }

          .content-box-icon {
            font-size: 24px;
          }

          .content-box-title {
            font-family: ${fontFamily};
            font-size: 20px;
            font-weight: 700;
            color: ${textColor};
          }

          .content-box-text {
            font-size: 13.5px;
            line-height: 1.75;
            color: ${textColor};
            max-height: 180px;
            overflow-y: auto;
          }

          /* Right Column */
          .right-column {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .detail-group {
            background: ${backgroundColor === '#FFFFFF' ? '#F8F9FA' : backgroundColor + '4D'};
            padding: 18px;
            border-radius: 14px;
            border: 2px solid ${secondaryColor}33;
          }

          .detail-item {
            margin-bottom: 16px;
          }

          .detail-item:last-child {
            margin-bottom: 0;
          }

          .detail-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: ${primaryColor};
            margin-bottom: 6px;
          }

          .detail-value {
            font-size: 15px;
            font-weight: 600;
            color: ${textColor};
            line-height: 1.4;
          }

          /* CTA Section */
          .cta-section {
            background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}E6);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            margin-top: auto;
          }

          .cta-title {
            font-family: ${fontFamily};
            font-size: 28px;
            font-weight: 800;
            color: ${backgroundColor};
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .contact-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 20px;
          }

          .contact-card {
            background: ${backgroundColor}26;
            backdrop-filter: blur(10px);
            padding: 16px 12px;
            border-radius: 12px;
            border: 1px solid ${backgroundColor}40;
          }

          .contact-icon {
            font-size: 24px;
            display: block;
            margin-bottom: 8px;
          }

          .contact-label {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: ${backgroundColor};
            opacity: 0.9;
            margin-bottom: 6px;
          }

          .contact-value {
            font-size: 13px;
            font-weight: 600;
            color: ${backgroundColor};
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .apply-button {
            background: ${backgroundColor};
            color: ${primaryColor};
            padding: 18px 40px;
            border-radius: 12px;
            font-family: ${fontFamily};
            font-size: 20px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
          }

          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            .container {
              width: 210mm;
              height: 297mm;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            .content-box-text {
              max-height: none;
              overflow: visible;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Hero Section -->
          <div class="hero-section">
            <h1 class="hero-title">We Are Hiring</h1>
            <p class="hero-subtitle">Join Our Growing Team</p>
          </div>

          <!-- Job Title Section -->
          <div class="job-title-section">
            <h2 class="job-title">${formData.job_title}</h2>
            <p class="company-name">${formData.company_name}</p>
          </div>

          <!-- Key Info Grid -->
          <div class="key-info-grid">
            <div class="info-card">
              <span class="info-icon">💰</span>
              <div class="info-label">Salary</div>
              <div class="info-value">${formData.salary}</div>
            </div>
            <div class="info-card">
              <span class="info-icon">📊</span>
              <div class="info-label">Experience</div>
              <div class="info-value">${formData.experience}</div>
            </div>
            <div class="info-card">
              <span class="info-icon">💼</span>
              <div class="info-label">Job Type</div>
              <div class="info-value">${formData.job_type}</div>
            </div>
            <div class="info-card">
              <span class="info-icon">👥</span>
              <div class="info-label">Openings</div>
              <div class="info-value">${formData.vacancy} Position${formData.vacancy > 1 ? 's' : ''}</div>
            </div>
          </div>

          <!-- Content Layout -->
          <div class="content-layout">
            <!-- Left Column -->
            <div class="left-column">
              <div class="content-box">
                <div class="content-box-header">
                  <span class="content-box-icon">📝</span>
                  <h3 class="content-box-title">Job Description</h3>
                </div>
                <div class="content-box-text">
                  ${formData.job_description}
                </div>
              </div>

              ${formData.additional_info ? `
              <div class="content-box">
                <div class="content-box-header">
                  <span class="content-box-icon">🎁</span>
                  <h3 class="content-box-title">Benefits & Perks</h3>
                </div>
                <div class="content-box-text">
                  ${formData.additional_info}
                </div>
              </div>
              ` : ''}
            </div>

            <!-- Right Column -->
            <div class="right-column">
              <div class="detail-group">
                <div class="detail-item">
                  <div class="detail-label">Category</div>
                  <div class="detail-value">${formData.category}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Location</div>
                  <div class="detail-value">${formData.company_address.split(',').slice(0, 2).join(',')}</div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Application Deadline</div>
                  <div class="detail-value">${formData.application_deadline}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="cta-section">
            <h3 class="cta-title">Ready to Join Us?</h3>
            
            <div class="contact-grid">
              <div class="contact-card">
                <span class="contact-icon">📧</span>
                <div class="contact-label">Email</div>
                <div class="contact-value">${formData.company_email}</div>
              </div>

              <div class="contact-card">
                <span class="contact-icon">📞</span>
                <div class="contact-label">Phone</div>
                <div class="contact-value">${formData.company_phone}</div>
              </div>

              <div class="contact-card">
                <span class="contact-icon">📍</span>
                <div class="contact-label">Location</div>
                <div class="contact-value">${formData.company_address.split(',')[0]}</div>
              </div>
            </div>

            <div class="apply-button">
              Apply Now
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
