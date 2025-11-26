import { JobPostFormData } from "@/constants/jobTemplates";

export function generateTemplate10Html({ formData }: { formData: JobPostFormData }): string {
  if (!formData) return '<h1>Loading...</h1>';

const backgroundColor = '#F8FDF8';
const primaryColor = '#6A994E';
const secondaryColor = '#A7C957';
const accentColor = '#BC4749';
const textColor = '#1B2617';
const cardBg = '#FFFFFF';
const fontFamily = "'Poppins', sans-serif";



  // Calculate counts and scaling
  const mainJobCount = formData.job_title ? 1 : 0;
  const additionalJobCount = formData.additional_jobs?.length || 0;
  const totalJobs = mainJobCount + additionalJobCount;
  const scaleFactor =
    totalJobs <= 1 ? 1 : totalJobs >= 6 ? 0.6 : 1 - (totalJobs - 1) * 0.08;

  // Font sizes - INCREASED for better readability
  const jobTitleFontSize = (32 * scaleFactor).toFixed(2);
  const jobReqFontSize = (18 * scaleFactor).toFixed(2); // Increased from 14
  const nosFontSize = (18 * scaleFactor).toFixed(2);
  const companyNameFontSize = (38 * scaleFactor).toFixed(2);
  const contactFontSize = (16 * scaleFactor).toFixed(2);
  const phoneFontSize = (24 * scaleFactor).toFixed(2);
  const footerFontSize = (20 * scaleFactor).toFixed(2);
  const titleSubtextFontSize = (32 * scaleFactor).toFixed(2); // New - increased from 26

  // Margins and gaps
  const marginHeader = 70 - (totalJobs - 1) * 10 > 25 ? 70 - (totalJobs - 1) * 10 : 25;
  const marginJobSection = 60 - (totalJobs - 1) * 12 > 18 ? 60 - (totalJobs - 1) * 12 : 18;
  const gapBetweenJobs = 15 * scaleFactor;
  const gapFooterToContact = 30 * scaleFactor;
  const contactHeight = 65 * scaleFactor;

  return `
<!DOCTYPE html>
<html>
  <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

      @page {
        size: A4;
        margin: 0;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      @media print {
        html, body {
          background-color: ${backgroundColor} !important;
          color: ${textColor} !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .container {
          background-color: ${backgroundColor} !important;
          page-break-inside: avoid !important;
        }
        .job-item {
          background-color: ${cardBg} !important;
          border-color: ${primaryColor} !important;
          color: ${textColor} !important;
          page-break-inside: avoid !important;
        }
        .company-section {
          background-color: ${cardBg} !important;
          page-break-inside: avoid !important;
          color: ${textColor} !important;
        }
        .app-section {
          background-color: ${primaryColor} !important;
          color: ${backgroundColor} !important;
          page-break-inside: avoid !important;
        }
        * {
          filter: none !important;
        }
      }

      html, body {
        width: 100%;
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${fontFamily};
        color: ${textColor};
      }

      .container {
        width: 210mm;
        max-height: 297mm;
        min-height: auto;
        background: ${backgroundColor};
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 50px 60px;
        height: 100vh;
        justify-content: center;
        border: 2px solid #2D3142;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
      }

      .megaphone-icon {
        position: absolute;
        top: 10%;
        right: 40px;
        width: 180px;
        height: 140px;
        z-index: 10;
        opacity: 0.9;
      }

      .megaphone-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(1.2) saturate(1.3);
      }

      .accent-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%);
      }

      .header-section {
        text-align: left;
        margin-bottom: ${marginHeader}px;
        border-left: 6px solid ${primaryColor};
        padding-left: 25px;
      }

      .we-are-hiring {
        font-family: ${fontFamily};
        font-weight: 800;
        font-size: 64px;
        color: ${textColor};
        text-transform: uppercase;
        letter-spacing: -2px;
        line-height: 1.1;
        margin-bottom: 15px;
      }

      .we-are-hiring .highlight {
        color: ${primaryColor};
        display: block;
      }

      .we-are-hiring .title {
        font-size: ${titleSubtextFontSize}px; /* Increased size */
        font-weight: 600;
        margin-top: 18px;
        color: ${textColor};
        line-height: 1.4;
        text-transform: none;
        letter-spacing: 0;
        opacity: 0.9; /* Increased from 0.85 */
      }

      .job-positions-section {
        margin-bottom: ${marginJobSection}px;
      }

      .section-title {
        font-size: 14px;
        font-weight: 700;
        color: ${backgroundColor};
        text-transform: uppercase;
        margin-bottom: 20px;
        letter-spacing: 2px;
        background: ${primaryColor};
        padding: 10px 18px;
        display: inline-block;
        border-radius: 4px;
      }

      .job-item {
        background-color: ${cardBg};
        border: 2px solid ${primaryColor};
        border-radius: 8px;
        padding: ${22 * scaleFactor}px ${28 * scaleFactor}px;
        margin-bottom: ${gapBetweenJobs}px;
        text-align: left;
        color: ${textColor};
        position: relative;
        border-left: 5px solid ${primaryColor};
      }

      .job-item:nth-child(odd) {
        border-left-color: ${secondaryColor};
      }

      .job-item:nth-child(3n) {
        border-left-color: ${accentColor};
      }

      .job-title {
        font-size: ${jobTitleFontSize}px;
        font-weight: 800;
        color: ${textColor};
        text-transform: uppercase;
        margin-bottom: ${10 * scaleFactor}px;
        letter-spacing: 1px;
        line-height: 1.3;
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex-wrap: wrap;
      }

      .vacancy-badge {
        font-size: ${nosFontSize}px;
        background: ${primaryColor};
        color: ${backgroundColor};
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 700;
        text-transform: lowercase;
        letter-spacing: 0;
      }

      .job-requirements {
        font-size: ${jobReqFontSize}px; /* Increased size */
        font-weight: 500;
        color: ${textColor};
        line-height: 1.7;
        opacity: 0.85; /* Increased from 0.75 */
      }

      .company-section {
        background-color: ${cardBg};
        padding: ${22 * scaleFactor}px ${28 * scaleFactor}px;
        margin-bottom: ${gapFooterToContact}px;
        min-height: ${contactHeight}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${18 * scaleFactor}px;
        color: ${textColor};
        border-radius: 8px;
        border: 2px solid #3A3F52;
      }

      .company-name {
        font-size: ${companyNameFontSize}px;
        font-weight: 900;
        color: ${secondaryColor};
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .contact-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${20 * scaleFactor}px;
        flex-wrap: wrap;
        width: 100%;
      }

      .contact-item {
        display: flex;
        align-items: center;
        gap: ${8 * scaleFactor}px;
        font-size: ${contactFontSize}px;
        font-weight: 600;
        color: ${textColor};
      }

      .contact-label {
        font-size: ${14 * scaleFactor}px;
        color: ${primaryColor};
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .icon {
        font-size: ${20 * scaleFactor}px;
        color: ${primaryColor};
      }

      .phone-number {
        font-size: ${phoneFontSize}px;
        font-weight: 900;
        color: ${primaryColor};
      }

      .app-section {
        background-color: ${primaryColor};
        border-radius: 8px;
        padding: ${20 * scaleFactor}px ${30 * scaleFactor}px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${20 * scaleFactor}px;
        flex-wrap: wrap;
        font-size: ${footerFontSize}px;
        color: ${backgroundColor};
      }

      .app-left {
        display: flex;
        align-items: center;
        gap: ${15 * scaleFactor}px;
      }

      .app-logo {
        width: ${50 * scaleFactor}px;
        height: ${50 * scaleFactor}px;
        background: white;
        border-radius: 8px;
        padding: ${8 * scaleFactor}px;
      }

      .app-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .app-name {
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .app-right {
        display: flex;
        gap: ${12 * scaleFactor}px;
      }

      .store-badge {
        display: flex;
        align-items: center;
        gap: ${8 * scaleFactor}px;
        background: rgba(26,29,41,0.3);
        padding: ${10 * scaleFactor}px ${16 * scaleFactor}px;
        border-radius: 6px;
        border: 1px solid rgba(26,29,41,0.5);
      }

      .store-icon {
        width: ${24 * scaleFactor}px;
        height: ${24 * scaleFactor}px;
        background: ${backgroundColor};
        border-radius: 5px;
      }

      .store-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .store-text {
        font-weight: 700;
        text-transform: uppercase;
        font-size: ${14 * scaleFactor}px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="accent-bar"></div>
      
      <div class="megaphone-icon">
        <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/bottom-right2.png" alt="Megaphone" />
      </div>

      <div class="main-content">
        <!-- Poster Title -->
        <div class="header-section">
          <div class="we-are-hiring">
            <span class="highlight">WE ARE</span>
            HIRING
          </div>
          ${formData.title ? `<div class="title">${formData.title}</div>` : ''}
        </div>

        <!-- Job Positions Section -->
        <div class="job-positions-section">
          <div class="section-title">OPEN POSITIONS</div>

          ${formData.job_title ? `<div class="job-item">
              <div class="job-title">
                <span>${formData.job_title}</span>
                <span class="vacancy-badge">${formData.vacancy} positions</span>
              </div>
              ${formData.experience ? `<div class="job-requirements">Required: ${formData.experience} years of relevant experience</div>` : ''}
          </div>` : ''}

          ${
            formData.additional_jobs && formData.additional_jobs.length > 0
              ? formData.additional_jobs.map(
                  (job, index) => `<div class="job-item">
                  <div class="job-title">
                    <span>${job.job_title}</span>
                    <span class="vacancy-badge">${job.vacancy} positions</span>
                  </div>
                  ${job.experience ? `<div class="job-requirements">Required: ${job.experience} years of relevant experience</div>` : ''}
                </div>`
                ).join("")
              : ""
          }
        </div>

        <!-- Company Details Section -->
        <div class="company-section">
          ${formData.company_name ? `<div class="company-name">${formData.company_name}</div>` : ''}

          <div class="contact-row">
            ${formData.company_address ? `<div class="contact-item"><span class="contact-label">Visit Us:</span> <span>${formData.company_address}</span></div>` : ''}
            ${formData.company_phone ? `<div class="contact-item"><span class="contact-label">Call Us:</span> <span class="phone-number">${formData.company_phone}</span></div>` : ''}
            ${formData.company_email ? `<div class="contact-item"><span class="contact-label">Email Us:</span> <span>${formData.company_email}</span></div>` : ''}
          </div>
        </div>

        <!-- Footer / Marketing Section -->
        <div class="app-section">
          <div class="app-left">
            <div class="app-logo">
              <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/logo.png" alt="Logo" />
            </div>
            <div class="app-name">SUNDAR JOBS APP</div>
          </div>
          <div class="app-right">
            <div class="store-badge">
              <div class="store-icon">
                <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/playstore-icon.png" alt="Play Store" />
              </div>
              <div class="store-text">Android</div>
            </div>
            <div class="store-badge">
              <div class="store-icon">
                <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/appstore-icon.png" alt="App Store" />
              </div>
              <div class="store-text">iPhone</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
  `;
}