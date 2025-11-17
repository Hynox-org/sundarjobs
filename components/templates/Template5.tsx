import { JobPostFormData } from '@/constants/jobTemplates';

export function generateTemplate5Html({ formData, backgroundColor, textColor, primaryColor, secondaryColor, fontFamily }: { formData: JobPostFormData; backgroundColor: string; textColor: string; primaryColor: string; secondaryColor: string; fontFamily: string; }): string {
  if (!formData) return '<h1>Loading...</h1>';

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

          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0;
            background: #f5f5f5;
          }

          body {
            font-family: 'Poppins', sans-serif;
          }

          .container {
            width: 210mm;
            max-height: 297mm;
            min-height: auto;
            background: ${backgroundColor || '#FFFFFF'};
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }

          /* Megaphone Icon */
          .megaphone-icon {
            position: absolute;
            top: 30px;
            left: 40px;
            width: 200px;
            height: 150px;
            z-index: 10;
          }

          .megaphone-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          /* Main Content */
          .main-content {
            position: relative;
            z-index: 5;
            padding: 40px 50px;
          }

          /* Section 1: Header */
          .header-section {
            text-align: center;
            margin-bottom: 35px;
            padding-top: 10px;
          }

          .we-are-hiring {
            font-size: 70px;
            font-weight: 900;
            color: ${textColor || '#1F1F1F'};
            text-transform: uppercase;
            letter-spacing: 5px;
            line-height: 1;
          }

          .we-are {
            color: ${primaryColor || '#FFD700'};
          }

          /* Section 2: Job Positions */
          .job-positions-section {
            margin-bottom: 35px;
          }

          .section-title {
            font-size: 26px;
            font-weight: 700;
            color: ${primaryColor || '#FFD700'};
            text-transform: uppercase;
            margin-bottom: 20px;
            letter-spacing: 2px;
            border-bottom: 3px solid ${primaryColor || '#FFD700'};
            padding-bottom: 10px;
            display: inline-block;
          }

          .job-item {
            background: ${primaryColor || '#FFD700'}15;
            border: 2px solid ${primaryColor || '#FFD700'};
            border-left: 8px solid ${primaryColor || '#FFD700'};
            border-radius: 10px;
            padding: 25px 30px;
            margin-bottom: 15px;
          }

          .job-title {
            font-size: 46px;
            font-weight: 900;
            color: ${textColor || '#1F1F1F'};
            text-transform: uppercase;
            margin-bottom: 12px;
            letter-spacing: 2px;
            line-height: 1.1;
          }

          .job-requirements {
            font-size: 15px;
            font-weight: 500;
            color: ${textColor || '#1F1F1F'};
            line-height: 1.7;
            opacity: 0.85;
          }

          /* Section 3: Company Info */
          .company-section {
            background: ${primaryColor || '#FFD700'}10;
            border-top: 3px solid ${primaryColor || '#FFD700'};
            border-bottom: 3px solid ${primaryColor || '#FFD700'};
            padding: 25px 30px;
            margin-bottom: 0;
          }

          .company-name {
            font-size: 42px;
            font-weight: 900;
            color: ${primaryColor || '#FFD700'};
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 20px;
            letter-spacing: 3px;
          }

          .contact-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }

          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
            color: ${textColor || '#1F1F1F'};
          }

          .icon {
            font-size: 22px;
          }

          .phone-number {
            font-size: 28px;
            font-weight: 900;
            color: ${primaryColor || '#FFD700'};
          }

          /* Section 4: App Download */
          .app-section {
            background: ${textColor || '#1F1F1F'};
            border-radius: 10px;
            padding: 18px 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }

          .app-left {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .app-logo {
            width: 55px;
            height: 55px;
            background: #FFFFFF;
            border-radius: 10px;
            padding: 8px;
          }

          .app-logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .app-name {
            font-size: 22px;
            font-weight: 900;
            color: #FFFFFF;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .app-right {
            display: flex;
            gap: 12px;
          }

          .store-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.15);
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .store-icon {
            width: 28px;
            height: 28px;
            background: #FFFFFF;
            border-radius: 5px;
            padding: 4px;
          }

          .store-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .store-text {
            font-size: 11px;
            font-weight: 700;
            color: #FFFFFF;
            text-transform: uppercase;
          }

          @media print {
            html, body {
              background: white;
            }
            .container {
              box-shadow: none;
              max-height: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="megaphone-icon">
            <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/top-left1.png" alt="Megaphone">
          </div>

          <div class="main-content">
            
            <!-- Section 1: Header -->
            <div class="header-section">
              <div class="we-are-hiring">
                <span class="we-are">WE ARE</span><br>HIRING!
              </div>
            </div>

            <!-- Section 2: Job Positions -->
            <div class="job-positions-section">
              <div class="section-title">JOB POSITION :</div>
              
              ${formData.job_title ? `
              <div class="job-item">
                <div class="job-title">${formData.job_title}<span> - (${formData.vacancy})</span></div>
                <div class="job-requirements">
                  ${formData.experience ? `Must have ${formData.experience} years of experience. ` : ''}
                  ${formData.salary ? `Salary: ${formData.salary}. ` : ''}
                  ${formData.job_type ? `Job Type: ${formData.job_type}. ` : ''}
                  ${formData.application_deadline ? `Apply before: ${formData.application_deadline}.` : ''}
                </div>
              </div>
              ` : ''}
            </div>

            <!-- Section 3: Company Info -->
            <div class="company-section">
              ${formData.company_name ? `
              <div class="company-name">${formData.company_name}</div>
              ` : ''}

              <div class="contact-row">
                ${formData.company_address ? `
                <div class="contact-item">
                  <span class="icon">📍</span>
                  <span>${formData.company_address}</span>
                </div>
                ` : ''}
                
                ${formData.company_phone ? `
                <div class="contact-item">
                  <span class="icon">📞</span>
                  <span class="phone-number">${formData.company_phone}</span>
                </div>
                ` : ''}
                
                ${formData.company_email ? `
                <div class="contact-item">
                  <span class="icon">📧</span>
                  <span>${formData.company_email}</span>
                </div>
                ` : ''}
              </div>

              <!-- Section 4: App Download -->
              <div class="app-section">
                <div class="app-left">
                  <div class="app-logo">
                    <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/logo.png" alt="Logo">
                  </div>
                  <div class="app-name">SUNDAR JOBS APP</div>
                </div>

                <div class="app-right">
                  <div class="store-badge">
                    <div class="store-icon">
                      <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/playstore-icon.png" alt="Play Store">
                    </div>
                    <div class="store-text">Android</div>
                  </div>

                  <div class="store-badge">
                    <div class="store-icon">
                      <img src="https://qjplvfufjesoejmbkwaf.supabase.co/storage/v1/object/public/sundarjobs/poster-assets/appstore-icon.png" alt="App Store">
                    </div>
                    <div class="store-text">iPhone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
