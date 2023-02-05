import { MutableRefObject } from 'react';

export interface SearchResultType {
    id: number;
    name: string;
    description: string;
    link: string;
    owner_logo: string;
    owner_name: string;
    owner_url: string;
    updated_at: string;
    language: string;
    stars: number;
}

export interface ContextType {
    query: string;
    currentRepos: SearchResultType[];
    currentPage: number;
    resultsPerPage: number;
    totalResults: number;
    lastFetchTime: MutableRefObject<number>;
    loading: boolean;
    setQuery: (query: string | ((query: string) => string)) => void;
    getData: (pageNumber: number) => void;
    setCurrentPage: (page: number) => void;
    setResultsPerPage: (resultsPerPage: number) => void;
    setLoading: (loading: boolean) => void;
}
