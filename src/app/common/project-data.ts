export interface ProjectData {
  project_id: number;
  project_name: string;
  project_description: string;
  images: string ;
  url: string;
  language_framework: string;
  isTabSelected?: boolean;
  play_store_link?: string;
  app_store_link?: string;
}
