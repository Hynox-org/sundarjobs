import { JobPostFormData } from "@/constants/jobTemplates";

export function generateTemplate5Html({
  formData,
  backgroundColor,
  textColor,
  primaryColor,
  secondaryColor,
  fontFamily,
}: {
  formData: JobPostFormData;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}): string {
  if (!formData) return "<h1>Loading...</h1>";

  // Compute total job count for scaling and spacing
  const mainJobCount = formData.job_title ? 1 : 0;
  const additionalJobCount = formData.additional_jobs?.length || 0;
  const totalJobs = mainJobCount + additionalJobCount;

  // Scale factor for font size (1 for 1 job, 0.65 for 6+ jobs)
  const scaleFactor =
    totalJobs <= 1 ? 1 : totalJobs >= 6 ? 0.65 : 1 - (totalJobs - 1) * 0.07;

  // Font sizes scaled
  const jobTitleFontSize = (32 * scaleFactor).toFixed(2);
  const jobReqFontSize = (13 * scaleFactor).toFixed(2);
  const nosFontSize = (18 * scaleFactor).toFixed(2);

  // Compact margins and gaps
  const marginHeader = 45 - (totalJobs - 1) * 5 > 18 ? 45 - (totalJobs - 1) * 5 : 18;
  const marginJobSection = 35 - (totalJobs - 1) * 4 > 15 ? 35 - (totalJobs - 1) * 4 : 15;
  const gapBetweenJobs = 10 * scaleFactor;
  const gapFooterToContact = 20 * scaleFactor;
  const contactHeight = 45 * scaleFactor;

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
        }
        .we-are-hiring {
          color: ${textColor} !important;
        }
        .we-are {
          color: ${primaryColor} !important;
        }
        .section-title {
          color: ${primaryColor} !important;
        }
        .job-item {
          background-color: ${primaryColor}33 !important;
          border-color: ${primaryColor} !important;
          color: ${textColor} !important;
        }
        .job-title {
          color: ${textColor} !important;
        }
        .job-requirements {
          color: ${textColor} !important;
        }
        .company-section {
          background-color: ${primaryColor}10 !important;
          border-top: 3px solid ${primaryColor} !important;
          border-bottom: 3px solid ${primaryColor} !important;
          color: ${textColor} !important;
        }
        .company-name {
          color: ${primaryColor} !important;
        }
        .contact-item {
          color: ${textColor} !important;
        }
        .app-section {
          background-color: ${textColor} !important;
          color: #FFFFFF !important;
          page-break-inside: avoid !important;
        }
        * {
          filter: none !important;
        }
      }

      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 0;
        background: ${backgroundColor};
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
        border: 1px solid ${primaryColor}33;
      }

      /* Megaphone Icon - smaller and less intrusive */
      .megaphone-icon {
        position: absolute;
        top: 20px;
        left: 25px;
        width: 120px;
        height: 90px;
        z-index: 10;
        opacity: 0.85;
      }

      .megaphone-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: none;
      }

      /* Main Content */
      .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;
        position: relative;
        z-index: 5;
      }

      /* Section 1: Header */
      .header-section {
        text-align: center;
        margin-bottom: ${marginHeader}px;
      }

      .we-are-hiring {
        font-size: 56px;
        font-weight: 900;
        color: ${textColor};
        text-transform: uppercase;
        letter-spacing: 3px;
        line-height: 1;
      }

      .we-are {
        color: ${primaryColor};
      }

      .we-are-hiring .title {
        font-size: 22px;
        font-weight: 600;
        color: ${textColor};
        max-width: 550px;
        margin: 10px auto 0;
        line-height: 1.2;
      }

      /* Section 2: Job Positions */
      .job-positions-section {
        margin-bottom: ${marginJobSection}px;
      }

      .section-title {
        font-size: 20px;
        font-weight: 700;
        color: ${primaryColor};
        text-transform: uppercase;
        margin-bottom: 12px;
        letter-spacing: 2px;
        border-bottom: 2px solid ${primaryColor};
        padding-bottom: 6px;
        display: inline-block;
      }

      .job-item {
        background: ${primaryColor}15;
        border: 2px solid ${primaryColor};
        border-left: 5px solid ${primaryColor};
        border-radius: 8px;
        padding: ${15 * scaleFactor}px ${20 * scaleFactor}px;
        margin-bottom: ${gapBetweenJobs}px;
        text-align: center;
      }

      .job-title {
        font-size: ${jobTitleFontSize}px;
        font-weight: 800;
        color: ${textColor};
        text-transform: uppercase;
        margin-bottom: ${8 * scaleFactor}px;
        letter-spacing: 1px;
        line-height: 1.1;
        display: inline-block;
      }

      .nos {
        font-size: ${nosFontSize}px;
        text-transform: lowercase;
        margin-left: 5px;
      }

      .job-requirements {
        font-size: ${jobReqFontSize}px;
        font-weight: 500;
        color: ${textColor};
        line-height: 1.5;
        opacity: 0.8;
        text-align: center;
        margin: 0 auto;
        max-width: 65%;
      }

      /* Section 3: Company Info */
      .company-section {
        background: ${primaryColor}10;
        border-top: 2px solid ${primaryColor};
        border-bottom: 2px solid ${primaryColor};
        padding: ${15 * scaleFactor}px 0;
        margin-bottom: ${gapFooterToContact}px;
        min-height: ${contactHeight}px;
      }

      .company-name {
        font-size: ${32 * scaleFactor}px;
        font-weight: 900;
        color: ${primaryColor};
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 2px;
        margin-bottom: ${10 * scaleFactor}px;
      }

      .contact-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }

      .contact-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 13px;
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
        font-size: 13px;
        font-weight: 600;
        color: ${textColor};
      }

      .phone-number {
        font-size: ${20 * scaleFactor}px;
        font-weight: 900;
        color: ${primaryColor};
      }

      /* Section 4: Footer / Marketing */
      .app-section {
        background: ${textColor};
        border-radius: 8px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        flex-wrap: wrap;
      }

      .app-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .app-logo {
        width: ${40 * scaleFactor}px;
        height: ${40 * scaleFactor}px;
        background: #FFFFFF;
        border-radius: 8px;
        padding: 6px;
      }

      .app-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .app-name {
        font-size: ${18 * scaleFactor}px;
        font-weight: 900;
        color: #FFFFFF;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .app-right {
        display: flex;
        gap: 10px;
      }

      .store-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.15);
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .store-icon {
        width: ${20 * scaleFactor}px;
        height: ${20 * scaleFactor}px;
        background: #FFFFFF;
        border-radius: 4px;
      }

      .store-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .store-text {
        font-size: ${10 * scaleFactor}px;
        font-weight: 700;
        color: #FFFFFF;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <div class="container">
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
          <div class="section-title">JOB POSITION :</div>

          ${formData.job_title ? `
            <div class="job-item">
              <div class="job-title">${formData.job_title}<span> - (${formData.vacancy})</span><span class="nos">nos</span></div>
              ${formData.experience ? `<div class="job-requirements">Experience: ${formData.experience}</div>` : ''}
            </div>
          ` : ''}

          ${
            formData.additional_jobs && formData.additional_jobs.length > 0
              ? formData.additional_jobs
                  .map(
                    (job) => `
            <div class="job-item">
              <div class="job-title">${job.job_title}<span> - (${job.vacancy})</span><span class="nos">nos</span></div>
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

        <!-- 4. Footer / Marketing Section -->
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
