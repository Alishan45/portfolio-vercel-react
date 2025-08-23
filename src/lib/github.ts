export interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch('https://api.github.com/users/Alishan45/repos', {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }

    const repos = await response.json();
    return repos
      .sort((a: GitHubRepo, b: GitHubRepo) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 6);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};
