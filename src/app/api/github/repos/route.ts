import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';
const CACHE_TIME = 60 * 60; // Cache for 1 hour

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const githubUsername = process.env.GITHUB_USERNAME?.trim();
    const githubToken = (process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN || '').replace(/\s+/g, '');

    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username not configured' },
        { status: 500 }
      );
    }

    const baseHeaders: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-vercel-react',
    };

    const url = `${GITHUB_API_URL}/users/${githubUsername}/repos?sort=updated&per_page=12`;

    let response = await fetch(url, {
      headers: githubToken
        ? { ...baseHeaders, Authorization: `Bearer ${githubToken}` }
        : baseHeaders,
      next: { revalidate: CACHE_TIME },
    });

    if (response.status === 401 || response.status === 403) {
      console.warn('GitHub auth failed, retrying without token for public repos.');
      response = await fetch(url, {
        headers: baseHeaders,
        next: { revalidate: CACHE_TIME },
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.message || response.statusText || 'Failed to fetch GitHub repositories';
      console.error('GitHub API error:', response.status, errorMessage, errorData);
      return NextResponse.json(
        { error: `GitHub API error: ${errorMessage}` },
        { status: response.status === 404 ? 404 : 500 }
      );
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected GitHub response format');
    }

    const filteredRepos = data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      updated_at: repo.updated_at,
      language: repo.language || 'Unknown',
      topics: Array.isArray(repo.topics) ? repo.topics : [],
    }));

    return NextResponse.json(filteredRepos, { status: 200 });
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return NextResponse.json(
      { error: 'Unable to load GitHub repositories at this time.' },
      { status: 500 }
    );
  }
}
