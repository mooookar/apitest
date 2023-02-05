import { createContext, useRef, useState } from 'react';
import Logo from './components/Logo';
import Pagination from './components/Pagination';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import {
    repositoriesBaseURL,
    resultsPerPageOptions,
    throttleDelay,
} from './constants';
import './App.css';
import { ContextType } from './components/types';

export const AppContext = createContext(null as unknown as ContextType);

function App() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentRepos, setCurrentRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(
        resultsPerPageOptions[0]
    );
    const [totalResults, setTotalResults] = useState(0);
    const [errorMessage, setErrorMesssage] = useState('');
    const lastFetchTime = useRef(0);

    const getData = async (page: number) => {
        if (
            lastFetchTime &&
            Date.now() - lastFetchTime.current < throttleDelay
        ) {
            return;
        }
        lastFetchTime.current = Date.now();

        setLoading(true);
        let response = await fetch(
            repositoriesBaseURL +
                '?q=' +
                encodeURIComponent(query) +
                '&per_page=' +
                resultsPerPage +
                '&page=' +
                page,
            {
                headers: {
                    Accept: 'application/vnd.github.text-match+json',
                },
            }
        );

        let data = await response.json();
        setLoading(false);

        if (data.message) {
            setErrorMesssage(data.message);
            return;
        }

        setErrorMesssage('');
        setTotalResults(data.total_count);
        setCurrentRepos(
            data.items.map((item: { [key: string]: any }) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                link: item.html_url,
                owner_logo: item.owner.avatar_url,
                owner_url: item.owner.html_url,
                owner_name: item.owner.login,
                updated_at: item.updated_at,
                language: item.language || 'not specified',
                stars: item.stargazers_count,
            }))
        );
    };

    return (
        <div className="App">
            <header className="App-header">
                <Logo />
            </header>
            <main>
                <AppContext.Provider
                    value={{
                        query,
                        currentRepos,
                        currentPage,
                        resultsPerPage,
                        totalResults,
                        lastFetchTime,
                        loading,
                        setQuery,
                        getData,
                        setCurrentPage,
                        setResultsPerPage,
                        setLoading,
                    }}
                >
                    <SearchForm />
                    {errorMessage ? (
                        <center>{errorMessage}</center>
                    ) : (
                        <SearchResults />
                    )}
                    {currentRepos.length && !loading && !errorMessage ? (
                        <Pagination />
                    ) : null}
                </AppContext.Provider>
            </main>
        </div>
    );
}

export default App;
