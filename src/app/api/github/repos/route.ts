import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';
const CACHE_TIME = 60 * 60; // Cache for 1 hour

export async function GET() {
  try {
    const githubUsername = process.env.GITHUB_USERNAME;
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubUsername) {
      return NextResponse.json(
        { error: 'GitHub username not configured' },
        { status: 500 }
      );
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }

    // Fetch all repositories by getting all pages
    let allRepos: any[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const response = await fetch(
        `${GITHUB_API_URL}/users/${githubUsername}/repos?sort=updated&per_page=100&page=${page}`,
        {
          headers,
          next: { revalidate: CACHE_TIME }
        }
      );
      
      if (!response.ok) {
        // If we already have some repos, return them instead of failing completely
        if (allRepos.length > 0) {
          break;
        }
        
        let errorMessage = 'Failed to fetch GitHub repositories';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (e) {
          // If we can't parse the error response, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        );
      }
      
      const repos = await response.json();
      
      // If we get fewer than 100 repos, we've reached the last page
      if (repos.length < 100) {
        hasMore = false;
      }
      
      allRepos = allRepos.concat(repos);
      page++;
    }
    
    return NextResponse.json(allRepos);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
