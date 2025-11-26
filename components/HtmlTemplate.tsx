import {
  HtmlTemplate,
  JobPostFormData,
} from "@/constants/jobTemplates";
import { generateTemplate1Html } from "./templates/Template1";
import { generateTemplate10Html } from "./templates/Template10";
import { generateTemplate11Html } from "./templates/Template11";
import { generateTemplate12Html } from "./templates/Template12";
import { generateTemplate13Html } from "./templates/Template13";
import { generateTemplate14Html } from "./templates/Template14";
import { generateTemplate15Html } from "./templates/Template15";
import { generateTemplate16Html } from "./templates/Template16";
import { generateTemplate17Html } from "./templates/Template17";
import { generateTemplate18Html } from "./templates/Template18";
import { generateTemplate19Html } from "./templates/Template19";
import { generateTemplate2Html } from "./templates/Template2";
import { generateTemplate20Html } from "./templates/Template20";
import { generateTemplate3Html } from "./templates/Template3";
import { generateTemplate4Html } from "./templates/Template4";
import { generateTemplate5Html } from "./templates/Template5";
import { generateTemplate6Html } from "./templates/Template6";
import { generateTemplate7Html } from "./templates/Template7";
import { generateTemplate8Html } from "./templates/Template8";
import { generateTemplate9Html } from "./templates/Template9";
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
      case "template-8":
      return generateTemplate8Html({ formData, ...defaultStyle });
      case "template-9":
      return generateTemplate9Html({ formData, ...defaultStyle });
      case "template-10":
      return generateTemplate10Html({ formData, ...defaultStyle });
      case "template-11":
      return generateTemplate11Html({ formData, ...defaultStyle });
      case "template-12":
      return generateTemplate12Html({ formData, ...defaultStyle });
      case "template-13":
      return generateTemplate13Html({ formData, ...defaultStyle });
      case "template-14":
      return generateTemplate14Html({ formData, ...defaultStyle });
      case "template-15":
      return generateTemplate15Html({ formData, ...defaultStyle });
      case "template-16":
      return generateTemplate16Html({ formData, ...defaultStyle });
      case "template-17":
      return generateTemplate17Html({ formData, ...defaultStyle });
      case "template-18":
      return generateTemplate18Html({ formData, ...defaultStyle });
      case "template-19":
      return generateTemplate19Html({ formData, ...defaultStyle });
      case "template-20":
      return generateTemplate20Html({ formData, ...defaultStyle });
    default:
      return generateTemplate1Html({ formData, ...defaultStyle });
  }
}
