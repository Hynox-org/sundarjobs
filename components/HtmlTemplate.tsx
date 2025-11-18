import {
  JobPostFormData,
  HtmlTemplate,
} from "@/constants/jobTemplates";
import { generateTemplate1Html } from "./templates/Template1";
import { generateTemplate2Html } from "./templates/Template2";
import { generateTemplate3Html } from "./templates/Template3";
import { generateTemplate4Html } from "./templates/Template4";
import { generateTemplate5Html } from "./templates/Template5";
import { generateTemplate6Html } from "./templates/Template6";
import { generateTemplate7Html } from "./templates/Template7";
interface HtmlTemplateProps {
  formData: JobPostFormData;
  template: HtmlTemplate;
}

export default function generateHtmlTemplate({
  formData,
  template,
}: HtmlTemplateProps): string {
  if (!formData || !template) return "<h1>Loading...</h1>";

  // Use a single default style for all templates
  const defaultStyle = {
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    primaryColor: "#2563EB",
    secondaryColor: "#60A5FA",
    fontFamily: "Arial, sans-serif",
  };

  switch (template.id) {
    case "template-1":
      return generateTemplate1Html({ formData, ...defaultStyle });
    case "template-2":
      return generateTemplate2Html({ formData, ...defaultStyle });
    case "template-3":
      return generateTemplate3Html({ formData, ...defaultStyle });
    case "template-4":
      return generateTemplate4Html({ formData, ...defaultStyle });
    case "template-5":
      return generateTemplate5Html({ formData, ...defaultStyle });
    case "template-6":
      return generateTemplate6Html({ formData, ...defaultStyle });
    case "template-7":
      return generateTemplate7Html({ formData, ...defaultStyle });
    default:
      return generateTemplate1Html({ formData, ...defaultStyle });
  }
}
