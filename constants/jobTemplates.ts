export interface JobPostFormData {
  id?: string;
  title: string;
  job_title: string;
  vacancy: number;
  // job_type: string;
  category: string;
  experience: string;
  // salary: string;
  // job_description: string;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  // application_deadline: string;
  // additional_info: string;
  additional_jobs?: AdditionalJob[]; // <-- add this line
  is_draft?: boolean;
  template_id?: string;
  poster_url?: string;
}
export interface AdditionalJob {
  job_title: string;
  vacancy: number;
  experience: string;
}
export interface HtmlTemplate {
  id: string;
  name: string;
}

export const HTML_TEMPLATES: HtmlTemplate[] = [
  {
    id: "template-1",
    name: "Template 1",
  },
  {
    id: "template-2",
    name: "Template 2",
  },
  {
    id: "template-3",
    name: "Template 3",
  },
  {
    id: "template-4",
    name: "Template 4",
  },
  {
    id: "template-5",
    name: "Template 5",
  },
  {
    id: "template-6",
    name: "Template 6",
  },
  {
    id: "template-7",
    name: "Template 7",
  },
  {
    id: "template-8",
    name: "Template 8",
  },
  {
    id: "template-9",
    name: "Template 9",
  },
  {
    id: "template-10",
    name: "Template 10",
  },
  {
    id: "template-11",
    name: "Template 11",
  },
  {
    id: "template-12",
    name: "Template 12",
  },
  {
    id: "template-13",
    name: "Template 13",
  },
  {
    id: "template-14",
    name: "Template 14",
  },
  {
    id: "template-15",
    name: "Template 15",
  },
  {
    id: "template-16",
    name: "Template 16",
  },
  {
    id: "template-17",
    name: "Template 17",
  },
  {
    id: "template-18",
    name: "Template 18",
  },
  {
    id: "template-19",
    name: "Template 19",
  },
  {
    id: "template-20",
    name: "Template 20",
  }
];
