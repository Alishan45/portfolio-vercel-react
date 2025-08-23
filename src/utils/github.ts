import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  topics: string[];
  updatedAt: string;
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });

    return data.map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      stars: repo.stargazers_count || 0,
      language: repo.language || 'Unknown',
      url: repo.html_url,
      topics: repo.topics || [],
      updatedAt: repo.updated_at || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};
