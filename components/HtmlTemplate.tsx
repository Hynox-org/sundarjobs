import {
  JobPostFormData,
  TemplateStyle,
  HtmlTemplate,
} from "@/constants/jobTemplates";
import { generateTemplate1Html } from "./templates/Template1";
import { generateTemplate2Html } from "./templates/Template2";
import { generateTemplate3Html } from "./templates/Template3";
import { generateTemplate4Html } from "./templates/Template4";

interface HtmlTemplateProps {
  formData: JobPostFormData;
  template: HtmlTemplate;
  templateStyle: TemplateStyle;
}

export default function generateHtmlTemplate({
  formData,
  template,
  templateStyle,
}: HtmlTemplateProps): string {
  if (!formData || !template || !templateStyle) return "<h1>Loading...</h1>";

  switch (template.id) {
    case "template-1":
      return generateTemplate1Html({ formData, templateStyle });
    case "template-2":
      return generateTemplate2Html({ formData, templateStyle });
    case "template-3":
      return generateTemplate3Html({ formData, templateStyle });
    case "template-4":
      return generateTemplate4Html({ formData, templateStyle });
    default:
      return generateTemplate1Html({ formData, templateStyle }); // Fallback to default
  }
}
