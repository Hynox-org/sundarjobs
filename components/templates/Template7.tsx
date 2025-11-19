import { JobPostFormData } from "@/constants/jobTemplates";

export function generateTemplate7Html({ formData }: { formData: JobPostFormData }): string {
  if (!formData) return '<h1>Loading...</h1>';

  // Clean yellow and white color palette
  const backgroundColor = '#FFFFFF';        // Pure white background
  const primaryColor = '#FDB813';           // Rich golden yellow
  const secondaryColor = '#FFF8DC';         // Cornsilk light yellow
  const accentColor = '#FFB300';            // Amber yellow
  const textColor = '#2C2C2C';              // Dark charcoal
  const fontFamily = "'Poppins', sans-serif";

  // Calculate counts and scaling
  const mainJobCount = formData.job_title ? 1 : 0;
  const additionalJobCount = formData.additional_jobs?.length || 0;
  const totalJobs = mainJobCount + additionalJobCount;
  const scaleFactor =
    totalJobs <= 1 ? 1 : totalJobs >= 6 ? 0.6 : 1 - (totalJobs - 1) * 0.08;

  // Compact sized fonts
  const jobTitleFontSize = (30 * scaleFactor).toFixed(2);
  const jobReqFontSize = (13 * scaleFactor).toFixed(2);
  const nosFontSize = (17 * scaleFactor).toFixed(2);
  const companyNameFontSize = (34 * scaleFactor).toFixed(2);
  const contactFontSize = (15 * scaleFactor).toFixed(2);
  const phoneFontSize = (22 * scaleFactor).toFixed(2);
  const footerFontSize = (18 * scaleFactor).toFixed(2);

  // Compact margins and gaps
  const marginHeader = 40 - (totalJobs - 1) * 5 > 18 ? 40 - (totalJobs - 1) * 5 : 18;
  const marginJobSection = 30 - (totalJobs - 1) * 4 > 15 ? 30 - (totalJobs - 1) * 4 : 15;
  const gapBetweenJobs = 10 * scaleFactor;
  const gapFooterToContact = 18 * scaleFactor;
  const contactHeight = 40 * scaleFactor;

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
        .we-are-hiring {
          color: ${textColor} !important;
          page-break-inside: avoid !important;
        }
        .we-are {
          color: ${primaryColor} !important;
        }
        .job-item {
          background-color: ${secondaryColor} !important;
          border-color: ${primaryColor} !important;
          color: ${textColor} !important;
          page-break-inside: avoid !important;
        }
        .company-section {
          background-color: ${secondaryColor} !important;
          border-color: ${primaryColor} !important;
          page-break-inside: avoid !important;
          color: ${textColor} !important;
        }
        .app-section {
          background-color: ${primaryColor} !important;
          color: ${textColor} !important;
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
        background: #F5F5F5;
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
        padding: 25px 35px;
        justify-content: space-between;
        height: 100vh;
        border: 3px solid ${primaryColor};
      }

      /* Megaphone Icon */
      .megaphone-icon {
        position: absolute;
        bottom: 25px;
        left: 30px;
        width: 100px;
        height: 75px;
        z-index: 10;
        opacity: 0.9;
      }

      .megaphone-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: none;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
      }

      /* Header Section */
      .header-section {
        text-align: center;
        margin-bottom: ${marginHeader}px;
      }

      .we-are-hiring {
        font-family: ${fontFamily};
        font-weight: 900;
        font-size: 54px;
        color: ${primaryColor};
        text-transform: uppercase;
        letter-spacing: 3px;
        line-height: 1;
      }

      .we-are-hiring .we-are {
        color: ${accentColor};
      }

      .we-are-hiring .title {
        font-size: 22px;
        font-weight: 600;
        margin-top: 12px;
        color: ${textColor};
        max-width: 550px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.3;
      }

      /* Job Positions Section */
      .job-positions-section {
        margin-bottom: ${marginJobSection}px;
      }

      .section-title {
        font-size: 18px;
        font-weight: 700;
        color: ${accentColor};
        text-transform: uppercase;
        margin-bottom: 15px;
        letter-spacing: 2px;
        border-bottom: 2px solid ${primaryColor};
        padding-bottom: 6px;
        display: inline-block;
      }

      .job-item {
        background-color: ${secondaryColor};
        border: 2px solid ${primaryColor};
        border-radius: 8px;
        padding: ${15 * scaleFactor}px ${22 * scaleFactor}px;
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
        width: 5px;
        background: ${primaryColor};
        border-radius: 8px 0 0 8px;
      }

      .job-item:nth-child(even)::before {
        background: ${accentColor};
      }

      .job-title {
        font-size: ${jobTitleFontSize}px;
        font-weight: 800;
        color: ${textColor};
        text-transform: uppercase;
        margin-bottom: ${8 * scaleFactor}px;
        letter-spacing: 1px;
        line-height: 1.2;
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
        border-radius: 15px;
        font-weight: 700;
        text-transform: lowercase;
        letter-spacing: 0;
      }

      .job-requirements {
        font-size: ${jobReqFontSize}px;
        font-weight: 500;
        color: ${textColor};
        line-height: 1.6;
        opacity: 0.8;
      }

      /* Company Info Section */
      .company-section {
        background-color: ${secondaryColor};
        border-top: 3px solid ${primaryColor};
        border-bottom: 3px solid ${primaryColor};
        padding: ${15 * scaleFactor}px ${20 * scaleFactor}px;
        margin-bottom: ${gapFooterToContact}px;
        min-height: ${contactHeight}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${12 * scaleFactor}px;
        color: ${textColor};
        border-radius: 8px;
      }

      .company-name {
        font-size: ${companyNameFontSize}px;
        font-weight: 900;
        color: black;
        text-transform: uppercase;
        margin-bottom: ${10 * scaleFactor}px;
        letter-spacing: 2px;
      }

      .contact-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${25 * scaleFactor}px;
        flex-wrap: wrap;
        width: 100%;
      }

      .contact-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: ${contactFontSize}px;
        font-weight: 600;
        color: ${textColor};
        text-align: center;
      }

      .contact-label {
        font-size: 10px;
        font-weight: 700;
        color: ${primaryColor};
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
        background-color: ${primaryColor};
        border-radius: 8px;
        padding: ${14 * scaleFactor}px ${22 * scaleFactor}px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${15 * scaleFactor}px;
        flex-wrap: wrap;
        font-size: ${footerFontSize}px;
        color: ${textColor};
      }

      .app-left {
        display: flex;
        align-items: center;
        gap: ${12 * scaleFactor}px;
      }

      .app-logo {
        width: ${42 * scaleFactor}px;
        height: ${42 * scaleFactor}px;
        background: ${backgroundColor};
        border-radius: 8px;
        padding: ${6 * scaleFactor}px;
      }

      .app-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .app-name {
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: ${textColor};
        font-size: ${footerFontSize}px;
      }

      .app-right {
        display: flex;
        gap: ${10 * scaleFactor}px;
      }

      .store-badge {
        display: flex;
        align-items: center;
        gap: ${6 * scaleFactor}px;
        background: rgba(255,255,255,0.3);
        padding: ${8 * scaleFactor}px ${12 * scaleFactor}px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.5);
      }

      .store-icon {
        width: ${22 * scaleFactor}px;
        height: ${22 * scaleFactor}px;
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
        color: ${textColor};
        text-transform: uppercase;
        font-size: ${11 * scaleFactor}px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="megaphone-icon">
        <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/top-left1.png" alt="Megaphone" />
      </div>
      
      <div class="main-content">
        <div class="header-section">
          <div class="we-are-hiring">
            <span class="we-are">WE ARE</span><br>HIRING!
            ${formData.title ? `<div class="title">${formData.title}</div>` : ''}
          </div>
        </div>
        
        <div class="job-positions-section">
          <div class="section-title">JOB POSITION :</div>
          
          ${formData.job_title ? `<div class="job-item">
            <div class="job-title">
              <span>${formData.job_title}</span>
              <span class="vacancy-badge">${formData.vacancy} positions</span>
            </div>
            ${formData.experience ? `<div class="job-requirements">Experience: ${formData.experience}</div>` : ''}
          </div>` : ''}
          
          ${formData.additional_jobs && formData.additional_jobs.length > 0 ? formData.additional_jobs.map(job => `<div class="job-item">
            <div class="job-title">
              <span>${job.job_title}</span>
              <span class="vacancy-badge">${job.vacancy} positions</span>
            </div>
            ${job.experience ? `<div class="job-requirements">Experience: ${job.experience}</div>` : ''}
          </div>`).join('') : ''}
        </div>
        
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
