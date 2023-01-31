import { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
    const [query, setQuery] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form className="SearchForm" onSubmit={onSubmit}>
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
            ></button>
        </form>
    );
}

export default SearchForm;
