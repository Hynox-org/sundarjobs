import { JobPostFormData } from "@/constants/jobTemplates";

export function generateTemplate4Html({ formData }: { formData: JobPostFormData }): string {
  if (!formData) return '<h1>Loading...</h1>';

  // Light theme with vibrant accent colors
  const backgroundColor = '#FFFFFF';      // Pure white
  const primaryColor = '#FF6B35';         // Vibrant coral orange
  const secondaryColor = '#004E89';       // Deep blue
  const accentColor = '#FFC93C';          // Bright yellow
  const textColor = '#2D3142';            // Dark charcoal
  const lightGray = '#F7F9FC';            // Very light blue-gray
  const fontFamily = "'Poppins', sans-serif";

  // Calculate totals & scale factor
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
      }

      html, body {
        width: 100%;
        height: 100vh;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${lightGray};
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
        justify-content: center;
        height: 100vh;
        border: 1px solid #E5E7EB;
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
        top: 35px;
        left: 45px;
        width: 170px;
        height: 130px;
        z-index: 10;
        opacity: 0.95;
      }

      .megaphone-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: none;
      }

      /* Decorative colored blocks */
      .color-block-top {
        position: absolute;
        top: 0;
        right: 0;
        width: 220px;
        height: 12px;
        background: ${primaryColor};
        z-index: 1;
      }

      .color-block-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 280px;
        height: 12px;
        background: ${secondaryColor};
        z-index: 1;
      }

      /* Header Section */
      .header-section {
        text-align: center;
        margin-bottom: ${marginHeader}px;
        z-index: 2;
        position: relative;
      }

      .we-are-hiring {
        font-size: 64px;
        font-weight: 900;
        color: ${textColor};
        text-transform: uppercase;
        letter-spacing: 3px;
        line-height: 1.1;
      }

      .we-are {
        color: ${primaryColor};
      }

      .we-are-hiring .title {
        font-size: 26px;
        font-weight: 600;
        margin-top: 18px;
        color: ${textColor};
        line-height: 1.4;
        text-transform: none;
        letter-spacing: 0;
        opacity: 0.8;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
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
        background: ${secondaryColor};
        padding: 12px 20px;
        display: inline-block;
        border-radius: 6px;
      }

      .job-item {
        background: ${lightGray};
        border: 2px solid ${primaryColor};
        border-radius: 10px;
        padding: ${22 * scaleFactor}px ${28 * scaleFactor}px;
        margin-bottom: ${gapBetweenJobs}px;
        text-align: left;
        color: ${textColor};
        position: relative;
      }

      .job-item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 6px;
        background: ${primaryColor};
        border-radius: 10px 0 0 10px;
      }

      .job-item:nth-child(even)::before {
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
        background: ${accentColor};
        color: ${textColor};
        padding: 5px 14px;
        border-radius: 20px;
        font-weight: 700;
        text-transform: lowercase;
        letter-spacing: 0;
      }

      .job-requirements {
        font-size: ${jobReqFontSize}px;
        font-weight: 500;
        color: ${textColor};
        line-height: 1.7;
        opacity: 0.7;
      }

      /* Company Info Section */
      .company-section {
        background: ${lightGray};
        padding: ${22 * scaleFactor}px ${28 * scaleFactor}px;
        margin-bottom: ${gapFooterToContact}px;
        min-height: ${contactHeight}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${18 * scaleFactor}px;
        color: ${textColor};
        border-radius: 10px;
        border: 2px solid #E5E7EB;
        border-top: 4px solid ${secondaryColor};
      }

      .company-name {
        font-size: ${companyNameFontSize}px;
        font-weight: 900;
        color: ${primaryColor};
        text-transform: uppercase;
        // margin-bottom: ${12 * scaleFactor}px;
        letter-spacing: 2px;
      }

      .contact-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${40 * scaleFactor}px;
        flex-wrap: wrap;
        width: 100%;
      }

      .contact-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${6 * scaleFactor}px;
        font-size: ${contactFontSize}px;
        font-weight: 600;
        color: ${textColor};
        text-align: center;
      }

      .contact-label {
        font-size: ${12 * scaleFactor}px;
        font-weight: 700;
        color: ${secondaryColor};
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .contact-value {
        font-size: ${contactFontSize}px;
        font-weight: 600;
        color: ${textColor};
      }

      .phone-number {
        font-size: ${phoneFontSize}px;
        font-weight: 900;
        color: ${primaryColor};
      }

      /* Footer / Marketing Section */
      .app-section {
        background: ${secondaryColor};
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
        background: ${backgroundColor};
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
        color: ${backgroundColor};
      }

      .app-right {
        display: flex;
        gap: ${12 * scaleFactor}px;
      }

      .store-badge {
        display: flex;
        align-items: center;
        gap: ${8 * scaleFactor}px;
        background: rgba(255,255,255,0.2);
        padding: ${10 * scaleFactor}px ${16 * scaleFactor}px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.3);
      }

      .store-icon {
        width: ${24 * scaleFactor}px;
        height: ${24 * scaleFactor}px;
        background: ${backgroundColor};
        border-radius: 6px;
        padding: ${4 * scaleFactor}px;
      }

      .store-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .store-text {
        font-weight: 700;
        color: ${backgroundColor};
        text-transform: uppercase;
        font-size: ${14 * scaleFactor}px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="color-block-top"></div>
      <div class="color-block-bottom"></div>
      
      <div class="megaphone-icon">
        <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/top-left1.png" alt="Megaphone" />
      </div>

      <div class="main-content">

        <!-- 1. Poster Title -->
        <div class="header-section">
          <div class="we-are-hiring">
            <span class="we-are">WE ARE</span><br>HIRING!
            ${formData.title ? `<div class="title">${formData.title}</div>` : ''}
          </div>
        </div>

        <!-- 2. Job Positions Section -->
        <div class="job-positions-section">
          <div class="section-title">OPEN POSITIONS</div>

          ${formData.job_title ? `
            <div class="job-item">
              <div class="job-title">
                <span>${formData.job_title}</span>
                <span class="vacancy-badge">${formData.vacancy} positions</span>
              </div>
              ${formData.experience ? `<div class="job-requirements">Experience: ${formData.experience}</div>` : ''}
            </div>
          ` : ''}

          ${formData.additional_jobs && formData.additional_jobs.length > 0
            ? formData.additional_jobs
                .map(
                  (job) => `
            <div class="job-item">
              <div class="job-title">
                <span>${job.job_title}</span>
                <span class="vacancy-badge">${job.vacancy} positions</span>
              </div>
              ${job.experience ? `<div class="job-requirements">Experience: ${job.experience}</div>` : ''}
            </div>
            `
                )
                .join('')
            : ''
          }
        </div>

        <!-- 3. Company Details Section -->
        <div class="company-section">
          ${formData.company_name ? `<div class="company-name">${formData.company_name}</div>` : ''}

          <div class="contact-row">
            ${formData.company_address ? `
              <div class="contact-item">
                <div class="contact-label">Address</div>
                <div class="contact-value">${formData.company_address}</div>
              </div>
            ` : ''}
            ${formData.company_phone ? `
              <div class="contact-item">
                <div class="contact-label">Phone</div>
                <div class="phone-number">${formData.company_phone}</div>
              </div>
            ` : ''}
            ${formData.company_email ? `
              <div class="contact-item">
                <div class="contact-label">Email</div>
                <div class="contact-value">${formData.company_email}</div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 4. Footer / Marketing -->
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
