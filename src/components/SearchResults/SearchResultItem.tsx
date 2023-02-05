import React from 'react';
import { SearchResultType } from '../types';
import './SearchResultItem.css';

const SearchResultItem: React.FC<{ item: SearchResultType }> = ({ item }) => {
    const {
        name,
        description,
        link,
        owner_logo,
        owner_name,
        owner_url,
        updated_at,
        language,
        stars,
    } = item;

    return (
        <div className="SearchResultItem">
            <div className="SearchResultItem-nameWrapper">
                <a href={owner_url}>
                    <img
                        className="SearchResultItem-ownerLogo"
                        src={owner_logo}
                        alt={owner_name}
                        width="32px"
                        title={owner_name}
                    />
                </a>
                <div className="SearchResultItem-info">
                    <a href={link} className="SearchResultItem-name">
                        {name}
                    </a>
                    <sup className="SearchResultItem-stars">{stars}</sup>
                    <p className="SearchResultItem-description">
                        {description}
                    </p>
                </div>
            </div>
            <div className="SearchResultItem-lowerInfo">
                <p className="SearchResultItem-language">
                    Language: <b>{language}</b>
                </p>
                <p className="SearchResultItem-date">
                    Last update:{' '}
                    <b>{new Date(updated_at).toLocaleDateString()}</b>
                </p>
            </div>
        </div>
    );
};

export default SearchResultItem;
