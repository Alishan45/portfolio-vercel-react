export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
  topics: string[];
  updatedAt: string;
}

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = (process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN || '').replace(/\s+/g, '');

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const url = `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=6`;
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-vercel-react',
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    let response = await fetch(url, { headers });
    if (!response.ok) {
      console.warn('GitHub API fetch failed with auth, retrying public endpoint:', response.status);
      response = await fetch(url, { headers: { Accept: headers.Accept, 'User-Agent': headers['User-Agent'] } });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }

    const repos = await response.json();
    return Array.isArray(repos)
      ? repos
          .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || '',
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            url: repo.html_url,
            language: repo.language || 'Unknown',
            topics: repo.topics || [],
            updatedAt: repo.updated_at || new Date().toISOString(),
          }))
      : [];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};
