export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  topics: string[];
}

export interface GitHubError {
  message: string;
  documentation_url?: string;
}
