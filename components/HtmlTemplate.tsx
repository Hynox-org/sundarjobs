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
import { generateTemplate21Html } from "./templates/Template21";
import { generateTemplate22Html } from "./templates/Template22";
import { generateTemplate23Html } from "./templates/Template23";
import { generateTemplate24Html } from "./templates/Template24";
import { generateTemplate25Html } from "./templates/Template25";
import { generateTemplate26Html } from "./templates/Template26";
import { generateTemplate27Html } from "./templates/Template27";
import { generateTemplate28Html } from "./templates/Template28";
import { generateTemplate29Html } from "./templates/Template29";
import { generateTemplate3Html } from "./templates/Template3";
import { generateTemplate30Html } from "./templates/Template30";
import { generateTemplate31Html } from "./templates/template31";
import { generateTemplate32Html } from "./templates/Template32";
import { generateTemplate33Html } from "./templates/Template33";
import { generateTemplate34Html } from "./templates/Template34";
import { generateTemplate35Html } from "./templates/Template35";
import { generateTemplate36Html } from "./templates/Template36";
import { generateTemplate37Html } from "./templates/Template37";
import { generateTemplate38Html } from "./templates/Template38";
import { generateTemplate39Html } from "./templates/Template39";
import { generateTemplate4Html } from "./templates/Template4";
import { generateTemplate40Html } from "./templates/Template40";
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
    case "template-21":
      return generateTemplate21Html({ formData, ...defaultStyle });
    case "template-22":
      return generateTemplate22Html({ formData, ...defaultStyle });
    case "template-23":
      return generateTemplate23Html({ formData, ...defaultStyle });
    case "template-24":
      return generateTemplate24Html({ formData, ...defaultStyle });
    case "template-25":
      return generateTemplate25Html({ formData, ...defaultStyle });
    case "template-26":
      return generateTemplate26Html({ formData, ...defaultStyle });
    case "template-27":
      return generateTemplate27Html({ formData, ...defaultStyle });
    case "template-28":
      return generateTemplate28Html({ formData, ...defaultStyle });
    case "template-29":
      return generateTemplate29Html({ formData, ...defaultStyle });
    case "template-30":
      return generateTemplate30Html({ formData, ...defaultStyle });
    case "template-31":
      return generateTemplate31Html({ formData, ...defaultStyle });
    case "template-32":
      return generateTemplate32Html({ formData, ...defaultStyle });
    case "template-33":
      return generateTemplate33Html({ formData, ...defaultStyle });
    case "template-34":
      return generateTemplate34Html({ formData, ...defaultStyle });
    case "template-35":
      return generateTemplate35Html({ formData, ...defaultStyle });
    case "template-36":
      return generateTemplate36Html({ formData, ...defaultStyle });
    case "template-37":
      return generateTemplate37Html({ formData, ...defaultStyle });
    case "template-38":
      return generateTemplate38Html({ formData, ...defaultStyle });
    case "template-39":
      return generateTemplate39Html({ formData, ...defaultStyle });
    case "template-40":
      return generateTemplate40Html({ formData, ...defaultStyle });
    default:
      return generateTemplate1Html({ formData, ...defaultStyle });
  }
}
