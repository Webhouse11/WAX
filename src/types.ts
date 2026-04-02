export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string[];
  imagePrompt: string;
  imagePlaceholder: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}
