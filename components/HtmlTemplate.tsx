import { JobPostFormData, TemplateStyle, HtmlTemplate } from '@/constants/jobTemplates';
import { generateDefaultTemplateHtml } from './templates/DefaultTemplate';
import { generateCompactHeroTemplateHtml } from './templates/CompactHeroTemplate';

interface HtmlTemplateProps {
  formData: JobPostFormData;
  template: HtmlTemplate;
  templateStyle: TemplateStyle;
}

export default function generateHtmlTemplate({ formData, template, templateStyle }: HtmlTemplateProps): string {
  if (!formData || !template || !templateStyle) return '<h1>Loading...</h1>';

  switch (template.id) {
    case 'default-template':
      return generateDefaultTemplateHtml({ formData, templateStyle });
    case 'compact-hero':
      return generateCompactHeroTemplateHtml({ formData, templateStyle });
    default:
      return generateDefaultTemplateHtml({ formData, templateStyle }); // Fallback to default
  }
}
