import { JobPostFormData, TemplateStyle } from '@/constants/jobTemplates';

export function generateDefaultTemplateHtml({ formData, templateStyle }: { formData: JobPostFormData; templateStyle: TemplateStyle }): string {
  if (!formData || !templateStyle) return '<h1>Loading...</h1>';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=Archivo+Black&family=Bebas+Neue&family=DM+Sans:wght@400;700&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Space Grotesk', sans-serif;
            background: ${templateStyle.backgroundColor};
            color: ${templateStyle.textColor};
            overflow-x: hidden;
            position: relative;
          }

          /* Chaotic Grid System */
          .poster-brutalist {
            width: 100vw;
            min-height: 100vh;
            position: relative;
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: repeat(10, minmax(100px, auto));
            gap: 0;
            padding: 0;
          }

          /* Deconstructed Mega Title - Rotated & Overlapping */
          .mega-hiring-block {
            grid-column: 1 / 13;
            grid-row: 1 / 4;
            background: ${templateStyle.primaryColor};
            position: relative;
            overflow: visible;
            border: 8px solid ${templateStyle.textColor};
            clip-path: polygon(0 0, 100% 0, 95% 100%, 0 100%);
          }

          .hiring-vertical {
            position: absolute;
            font-size: clamp(120px, 20vw, 280px);
            font-family: 'Archivo Black', sans-serif;
            font-weight: 900;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            letter-spacing: -8px;
            color: ${templateStyle.backgroundColor};
            text-transform: uppercase;
            top: -50px;
            left: 40px;
            z-index: 5;
            transform: rotate(-5deg);
            text-shadow: 
              8px 8px 0px ${templateStyle.secondaryColor},
              16px 16px 0px ${templateStyle.textColor};
          }

          .we-are-hiring {
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-size: clamp(32px, 6vw, 72px);
            font-family: 'Bebas Neue', sans-serif;
            color: ${templateStyle.backgroundColor};
            letter-spacing: 12px;
            transform: skewY(-3deg);
            z-index: 3;
          }

          /* Job Title - Aggressive Diagonal Cut */
          .job-title-slash {
            grid-column: 1 / 9;
            grid-row: 4 / 6;
            background: ${templateStyle.textColor};
            color: ${templateStyle.backgroundColor};
            padding: 40px;
            font-size: clamp(36px, 5vw, 68px);
            font-weight: 900;
            display: flex;
            align-items: center;
            position: relative;
            border: 6px solid ${templateStyle.primaryColor};
            transform: skewX(-8deg);
            margin-left: -20px;
            box-shadow: 20px 20px 0px ${templateStyle.primaryColor};
          }

          .job-title-text {
            transform: skewX(8deg);
            text-transform: uppercase;
            line-height: 1;
            letter-spacing: -2px;
          }

          /* Floating Company Badge - Overlapping Design */
          .company-float {
            grid-column: 8 / 13;
            grid-row: 4 / 6;
            background: ${templateStyle.secondaryColor};
            border: 6px solid ${templateStyle.textColor};
            padding: 30px;
            position: relative;
            z-index: 10;
            transform: rotate(2deg);
            margin-top: -40px;
          }

          .company-name {
            font-size: clamp(24px, 3vw, 42px);
            font-weight: 900;
            color: ${templateStyle.backgroundColor};
            text-transform: uppercase;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }

          .company-address {
            font-size: 14px;
            color: ${templateStyle.backgroundColor};
            opacity: 0.85;
            font-weight: 700;
          }

          /* Modular Detail Blocks - Puzzle Layout */
          .detail-puzzle {
            grid-column: 1 / 13;
            grid-row: 6 / 8;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 0;
            position: relative;
          }

          .puzzle-piece {
            border: 4px solid ${templateStyle.textColor};
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 140px;
            position: relative;
          }

          .puzzle-piece:nth-child(1) { 
            background: ${templateStyle.primaryColor}; 
            grid-column: span 2;
            transform: translateY(-15px);
          }
          .puzzle-piece:nth-child(2) { 
            background: ${templateStyle.secondaryColor}; 
            grid-column: span 1;
          }
          .puzzle-piece:nth-child(3) { 
            background: ${templateStyle.primaryColor}90; 
            grid-column: span 2;
            transform: translateY(15px);
          }
          .puzzle-piece:nth-child(4) { 
            background: ${templateStyle.textColor}; 
            color: ${templateStyle.backgroundColor};
            grid-column: span 1;
          }
          .puzzle-piece:nth-child(5) { 
            background: ${templateStyle.secondaryColor}CC; 
            grid-column: span 3;
            transform: translateY(-10px);
          }
          .puzzle-piece:nth-child(6) { 
            background: ${templateStyle.primaryColor}; 
            grid-column: span 3;
            transform: translateY(10px);
          }

          .puzzle-label {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 8px;
            opacity: 0.7;
          }

          .puzzle-value {
            font-size: clamp(18px, 2.5vw, 28px);
            font-weight: 900;
            line-height: 1.1;
            text-transform: uppercase;
          }

          /* Chaotic Description Section */
          .description-chaos {
            grid-column: 1 / 9;
            grid-row: 8 / 10;
            background: ${templateStyle.backgroundColor}dd;
            border: 6px solid ${templateStyle.primaryColor};
            padding: 40px;
            position: relative;
            margin: 20px 0 20px 40px;
          }

          .description-chaos::before {
            content: '//';
            position: absolute;
            top: -30px;
            left: -20px;
            font-size: 120px;
            font-weight: 900;
            color: ${templateStyle.primaryColor};
            opacity: 0.3;
            z-index: -1;
          }

          .desc-title {
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 900;
            text-transform: uppercase;
            color: ${templateStyle.primaryColor};
            margin-bottom: 20px;
            letter-spacing: -1px;
            position: relative;
          }

          .desc-title::after {
            content: '';
            width: 100px;
            height: 6px;
            background: ${templateStyle.secondaryColor};
            position: absolute;
            bottom: -10px;
            left: 0;
            transform: skewX(-20deg);
          }

          .desc-text {
            font-size: 16px;
            line-height: 1.7;
            color: ${templateStyle.textColor};
            font-weight: 400;
            margin-top: 30px;
          }

          /* Contact Brutalist Block */
          .contact-brutalist {
            grid-column: 9 / 13;
            grid-row: 8 / 10;
            background: ${templateStyle.primaryColor};
            border: 8px solid ${templateStyle.textColor};
            padding: 40px 30px;
            position: relative;
            transform: rotate(-1deg);
            margin: 20px 20px 20px 0;
          }

          .contact-stamp {
            font-size: 16px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 6px;
            color: ${templateStyle.backgroundColor};
            margin-bottom: 25px;
            writing-mode: vertical-rl;
            position: absolute;
            right: 10px;
            top: 20px;
            opacity: 0.5;
          }

          .contact-row {
            margin-bottom: 25px;
            border-left: 5px solid ${templateStyle.backgroundColor};
            padding-left: 15px;
          }

          .contact-row-label {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: ${templateStyle.backgroundColor};
            opacity: 0.8;
            margin-bottom: 6px;
          }

          .contact-row-value {
            font-size: 18px;
            font-weight: 900;
            color: ${templateStyle.backgroundColor};
            word-break: break-word;
          }

          /* Deadline Alarm Block */
          .deadline-alarm {
            grid-column: 1 / 13;
            grid-row: 10 / 11;
            background: ${templateStyle.textColor};
            color: ${templateStyle.backgroundColor};
            padding: 30px 40px;
            border-top: 8px solid ${templateStyle.primaryColor};
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }

          .deadline-alarm::before {
            content: '⚠';
            position: absolute;
            font-size: 180px;
            opacity: 0.08;
            right: 100px;
            top: 50%;
            transform: translateY(-50%);
          }

          .alarm-text {
            font-size: clamp(20px, 3vw, 36px);
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .alarm-date {
            font-size: clamp(28px, 4vw, 56px);
            font-weight: 900;
            color: ${templateStyle.primaryColor};
            letter-spacing: -2px;
          }

          /* Glitch Effect on Hover */
          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }

          .mega-hiring-block:hover .hiring-vertical {
            animation: glitch 0.3s infinite;
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .poster-brutalist {
              grid-template-columns: repeat(6, 1fr);
              grid-template-rows: auto;
            }

            .mega-hiring-block {
              grid-column: 1 / 7;
              grid-row: 1 / 3;
            }

            .job-title-slash {
              grid-column: 1 / 7;
              grid-row: 3 / 4;
              margin-left: 0;
              transform: skewX(0);
            }

            .company-float {
              grid-column: 1 / 7;
              grid-row: 4 / 5;
              margin-top: 0;
            }

            .detail-puzzle {
              grid-column: 1 / 7;
              grid-row: 5 / 7;
              grid-template-columns: repeat(2, 1fr);
            }

            .puzzle-piece {
              grid-column: span 1 !important;
              transform: translateY(0) !important;
            }

            .description-chaos {
              grid-column: 1 / 7;
              grid-row: 7 / 8;
              margin: 20px;
            }

            .contact-brutalist {
              grid-column: 1 / 7;
              grid-row: 8 / 9;
              margin: 20px;
              transform: rotate(0);
            }

            .deadline-alarm {
              grid-column: 1 / 7;
              grid-row: 9 / 10;
            }
          }
        </style>
      </head>
      <body>
        <div class="poster-brutalist">
          
          <!-- Deconstructed Mega Hiring Block -->
          <div class="mega-hiring-block">
            <div class="hiring-vertical">HIRING</div>
            <div class="we-are-hiring">NOW OPEN</div>
          </div>

          <!-- Diagonal Job Title -->
          <div class="job-title-slash">
            <div class="job-title-text">${formData.jobTitle}</div>
          </div>

          <!-- Floating Company Badge -->
          <div class="company-float">
            <div class="company-name">${formData.companyName}</div>
            <div class="company-address">${formData.companyAddress}</div>
          </div>

          <!-- Modular Puzzle Detail Blocks -->
          <div class="detail-puzzle">
            <div class="puzzle-piece">
              <div class="puzzle-label">Type</div>
              <div class="puzzle-value">${formData.jobType}</div>
            </div>
            
            <div class="puzzle-piece">
              <div class="puzzle-label">Vacancy</div>
              <div class="puzzle-value">${formData.vacancy}</div>
            </div>
            
            <div class="puzzle-piece">
              <div class="puzzle-label">Category</div>
              <div class="puzzle-value">${formData.category}</div>
            </div>
            
            <div class="puzzle-piece">
              <div class="puzzle-label">Experience</div>
              <div class="puzzle-value">${formData.experience}</div>
            </div>
            
            <div class="puzzle-piece">
              <div class="puzzle-label">Salary</div>
              <div class="puzzle-value">${formData.salary}</div>
            </div>
            
            <div class="puzzle-piece">
              <div class="puzzle-label">Location</div>
              <div class="puzzle-value">${formData.location}</div>
            </div>
          </div>

          <!-- Chaotic Description -->
          <div class="description-chaos">
            <h3 class="desc-title">The Role</h3>
            <div class="desc-text">${formData.jobDescription}</div>
            
            ${formData.additionalInfo ? `
              <h3 class="desc-title" style="margin-top: 35px;">More Info</h3>
              <div class="desc-text">${formData.additionalInfo}</div>
            ` : ''}
          </div>

          <!-- Brutalist Contact Block -->
          <div class="contact-brutalist">
            <div class="contact-stamp">APPLY</div>
            
            <div class="contact-row">
              <div class="contact-row-label">Email</div>
              <div class="contact-row-value">${formData.companyEmail}</div>
            </div>
            
            <div class="contact-row">
              <div class="contact-row-label">Phone</div>
              <div class="contact-row-value">${formData.companyPhone}</div>
            </div>
          </div>

          <!-- Deadline Alarm -->
          ${formData.applicationDeadline ? `
            <div class="deadline-alarm">
              <div class="alarm-text">Deadline:</div>
              <div class="alarm-date">${formData.applicationDeadline}</div>
            </div>
          ` : ''}

        </div>
      </body>
    </html>
  `;
}
