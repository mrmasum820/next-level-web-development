export interface INotes {
  title: string;
  content: string;
  category: "Personal" | "Business" | "Study" | "Other";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
}
