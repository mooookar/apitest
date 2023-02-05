import { useContext } from 'react';
import { AppContext } from '../../App';
import Loading from '../Loading';
import SearchResultItem from './SearchResultItem';
import './SearchResults.css';

function SearchResults() {
    const { currentRepos, loading } = useContext(AppContext);

    return (
        <div className="SearchResults">
            {loading ? (
                <Loading />
            ) : (
                currentRepos.map((item: any) => (
                    <SearchResultItem key={item.id} item={item} />
                ))
            )}
        </div>
    );
}

export default SearchResults;
