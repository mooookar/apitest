import { useContext } from 'react';
import { AppContext } from '../../App';
import { languages, resultsPerPageOptions } from '../../constants';
import './SearchForm.css';

function SearchForm() {
    const { getData, setCurrentPage, setResultsPerPage, query, setQuery } =
        useContext(AppContext);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        getData(1);
    };

    const handleStars = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery((prev: string) => {
            if (e.target.value < '1') {
                e.target.value = '0';
            }

            const next =
                prev.replace(/\sstars:\w*/, '') +
                (e.target.value > '0' ? ' stars:' + e.target.value : '');
            return next;
        });
    };

    const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuery((prev: string) => {
            const next =
                prev.replace(/\slanguage:\w*/, '') +
                ' language:' +
                e.target.value;
            return next;
        });
    };

    const handleResultsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setResultsPerPage(+e.target.value);
    };

    return (
        <form className="SearchForm" onSubmit={onSubmit}>
            <div className="SearchForm-query">
                <input
                    className="SearchForm-queryInput"
                    type="text"
                    value={query}
                    onChange={onChange}
                    placeholder="Start typing here..."
                    autoFocus
                />
                <button
                    className="SearchForm-submitButton"
                    type="submit"
                    value="Search"
                    disabled={query === ''}
                >
                    &#128269;
                </button>
            </div>
            <hr />
            <div className="SearchForm-options">
                <label>
                    Language
                    <select onChange={handleLanguage} defaultValue={'1'}>
                        <option disabled value={'1'}>
                            -- select an option --
                        </option>
                        {languages.map((lang) => (
                            <option key={lang}>{lang}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Stars
                    <input type="number" onChange={handleStars} />
                </label>
                <label>
                    Results per page
                    <select onChange={handleResultsPerPage}>
                        {resultsPerPageOptions.map((opt) => (
                            <option key={opt}>{opt}</option>
                        ))}
                    </select>
                </label>
            </div>
        </form>
    );
}

export default SearchForm;
