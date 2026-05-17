export const CATEGORIES: Record<string, string> = {
  "desenvolvimento-web": "Desenvolvimento web",
  ia: "Inteligência Artificial",
  devops: "DevOps",
  mobile: "Mobile",
  seguranca: "Segurança",
};

export function getCategoryLabel(value: string): string {
  return CATEGORIES[value] ?? value;
}
