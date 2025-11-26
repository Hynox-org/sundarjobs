import { JobPostFormData } from "@/constants/jobTemplates";

export function generateTemplate2Html({ formData }: { formData: JobPostFormData }): string {
  if (!formData) return '<h1>Loading...</h1>';

  // Clean dark theme with vibrant accents - SOLID COLORS ONLY
  const backgroundColor = '#FFF5F9';
const primaryColor = '#E63946';
const secondaryColor = '#F4A6B2';
const accentColor = '#FFB3C1';
const textColor = '#1D1D1F';
const cardBg = '#FFFFFF';
const fontFamily = "'Poppins', sans-serif";


  // Calculate job counts and scaling
  const mainJobCount = formData.job_title ? 1 : 0;
  const additionalJobCount = formData.additional_jobs?.length || 0;
  const totalJobs = mainJobCount + additionalJobCount;
  const scaleFactor = totalJobs <= 1 ? 1 : totalJobs >= 6 ? 0.6 : 1 - (totalJobs - 1) * 0.08;

  // Font sizes scaled
  const jobTitleFontSize = (32 * scaleFactor).toFixed(2);
  const jobReqFontSize = (14 * scaleFactor).toFixed(2);
  const nosFontSize = (18 * scaleFactor).toFixed(2);
  const companyNameFontSize = (38 * scaleFactor).toFixed(2);
  const contactFontSize = (16 * scaleFactor).toFixed(2);
  const phoneFontSize = (24 * scaleFactor).toFixed(2);
  const footerFontSize = (20 * scaleFactor).toFixed(2);

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
          background: ${primaryColor} !important;
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
        border: 3px solid ${primaryColor};
      }

      .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
      }

      /* Megaphone Icon */
      .megaphone-icon {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 160px;
        height: 180px;
        z-index: 10;
        opacity: 0.95;
      }

      .megaphone-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: brightness(1.3) saturate(1.2);
      }

      /* Diagonal accent stripe - SOLID COLOR */
      .accent-stripe {
        position: absolute;
        top: 0;
        right: 0;
        width: 250px;
        height: 250px;
        background: ${secondaryColor};
        opacity: 0.15;
        clip-path: polygon(100% 0, 100% 100%, 0 0);
        z-index: 1;
      }

      /* Header Section */
      .header-section {
        text-align: right;
        margin-bottom: ${marginHeader}px;
        border-right: 8px solid ${primaryColor};
        padding-right: 30px;
        z-index: 2;
        position: relative;
      }

      .we-are-hiring {
        font-family: ${fontFamily};
        font-weight: 900;
        font-size: 68px;
        color: ${textColor};
        text-transform: uppercase;
        letter-spacing: -1px;
        line-height: 1;
        margin-bottom: 0;
      }

      .we-are-hiring .highlight {
        color: ${primaryColor};
        display: block;
      }

      .we-are-hiring .title {
        font-size: 26px;
        font-weight: 600;
        margin-top: 18px;
        color: ${textColor};
        line-height: 1.4;
        text-transform: none;
        letter-spacing: 0;
        opacity: 0.85;
      }

      /* Job Positions Section */
      .job-positions-section {
        margin-bottom: ${marginJobSection}px;
      }

      .section-title {
        font-size: 13px;
        font-weight: 700;
        color: ${backgroundColor};
        text-transform: uppercase;
        margin-bottom: 22px;
        letter-spacing: 3px;
        background: ${primaryColor};
        padding: 12px 20px;
        display: inline-block;
        border-radius: 6px;
      }

      .job-item {
        background-color: ${cardBg};
        border: 2px solid ${primaryColor};
        border-radius: 0;
        padding: ${22 * scaleFactor}px ${28 * scaleFactor}px;
        margin-bottom: ${gapBetweenJobs}px;
        text-align: left;
        color: ${textColor};
        position: relative;
      }

      .job-item::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        background: ${primaryColor};
      }

      .job-item:nth-child(even)::after {
        background: ${secondaryColor};
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
        gap: 10px;
        flex-wrap: wrap;
      }

      .vacancy-badge {
        font-size: ${nosFontSize}px;
        background: ${primaryColor};
        color: ${backgroundColor};
        padding: 5px 14px;
        border-radius: 25px;
        font-weight: 700;
        text-transform: lowercase;
        letter-spacing: 0;
      }

      .job-requirements {
        font-size: ${jobReqFontSize}px;
        font-weight: 500;
        color: ${textColor};
        line-height: 1.7;
        opacity: 0.75;
      }

      /* Company Info Section */
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
        border-radius: 10px;
        border: 2px solid #30363D;
        border-top: 3px solid ${secondaryColor};
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
        gap: ${35 * scaleFactor}px;
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

      .icon {
        font-size: ${20 * scaleFactor}px;
        color: ${secondaryColor};
      }

      .phone-number {
        font-size: ${phoneFontSize}px;
        font-weight: 900;
        color: ${primaryColor};
      }

      /* Footer / Marketing Section - SOLID COLOR */
      .app-section {
        background: ${primaryColor};
        border-radius: 10px;
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
        border-radius: 10px;
        padding: ${8 * scaleFactor}px;
      }

      .app-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .app-name {
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .app-right {
        display: flex;
        gap: ${12 * scaleFactor}px;
      }

      .store-badge {
        display: flex;
        align-items: center;
        gap: ${8 * scaleFactor}px;
        background: rgba(13,17,23,0.3);
        padding: ${10 * scaleFactor}px ${16 * scaleFactor}px;
        border-radius: 8px;
        border: 1px solid rgba(13,17,23,0.5);
      }

      .store-icon {
        width: ${24 * scaleFactor}px;
        height: ${24 * scaleFactor}px;
        background: white;
        border-radius: 6px;
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
      <div class="accent-stripe"></div>
      
      <div class="megaphone-icon">
        <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/top-left1.png" alt="Megaphone" />
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

          ${
            formData.job_title
              ? `<div class="job-item">
                  <div class="job-title">
                    <span>${formData.job_title}</span>
                    <span class="vacancy-badge">${formData.vacancy} positions</span>
                  </div>
                  ${formData.experience ? `<div class="job-requirements">Experience: ${formData.experience} years of experience required for this role.</div>` : ''}
                </div>`
              : ""
          }

          ${
            formData.additional_jobs && formData.additional_jobs.length > 0
              ? formData.additional_jobs
                  .map(
                    (job) => `<div class="job-item">
                        <div class="job-title">
                          <span>${job.job_title}</span>
                          <span class="vacancy-badge">${job.vacancy} positions</span>
                        </div>
                        ${job.experience ? `<div class="job-requirements">Experience: ${job.experience}  years of experience required for this role.</div>` : ''}
                      </div>`
                  )
                  .join("")
              : ""
          }
        </div>

        <!-- Company Details Section -->
        <div class="company-section">
          ${
            formData.company_name
              ? `<div class="company-name">${formData.company_name}</div>`
              : ""
          }

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
