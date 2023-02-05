import { useContext, useMemo } from 'react';
import { AppContext } from '../../App';
import { paginationRange } from '../../constants';
import './Pagination.css';

function Pagination() {
    const {
        getData,
        currentPage,
        setCurrentPage,
        resultsPerPage,
        totalResults,
    } = useContext(AppContext);

    const pagesTotal = useMemo(
        () => Math.ceil(totalResults / resultsPerPage),
        [totalResults, resultsPerPage]
    );

    const renderPages = useMemo(() => {
        let pagesArray = [];

        for (
            let i = currentPage - paginationRange;
            i < currentPage + paginationRange;
            i++
        ) {
            pagesArray.push(i);
        }

        return pagesArray.filter((num) => num > 0);
    }, [currentPage, paginationRange]);

    const infoString = useMemo(() => {
        const from = resultsPerPage * (currentPage - 1) + 1;
        const to = resultsPerPage * currentPage;

        return 'Showing results ' + from + '-' + to + ' of ' + totalResults;
    }, [resultsPerPage, currentPage, totalResults]);

    const handlePrev = () => {
        const smartCurrentPage = currentPage <= 1 ? 1 : currentPage - 1;
        setCurrentPage(smartCurrentPage);
        getData(smartCurrentPage);
    };
    const handleNext = () => {
        const smartNextPage =
            currentPage >= pagesTotal ? pagesTotal : currentPage + 1;
        setCurrentPage(smartNextPage);
        getData(smartNextPage);
    };

    const pageChange = (e: React.SyntheticEvent) => {
        if (e.target instanceof HTMLButtonElement) {
            setCurrentPage(Number(e.target.textContent));
            getData(Number(e.target.textContent));
        }
    };

    return (
        <div className="Pagination">
            <div className="Pagination-info">{infoString}</div>
            <div className="Pagination-main">
                <button onClick={handlePrev} type="button">
                    Prev
                </button>
                <div onClick={pageChange}>
                    {renderPages.map((num) => {
                        return num !== currentPage ? (
                            <button
                                key={num}
                                className="pageLink"
                                type="button"
                            >
                                {num}
                            </button>
                        ) : (
                            <span key={num} className="currentPage">
                                {num}
                            </span>
                        );
                    })}
                </div>
                <button onClick={handleNext} type="button">
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;
