import React from 'react';
import './Pagination.scss';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const visiblePages = 3;
        const start = Math.max(1, currentPage - visiblePages);
        const end = Math.min(totalPages, currentPage + visiblePages);

        if (start > 1) pages.push(1);
        if (start > 2) pages.push('...');

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push('...');
        if (end < totalPages) pages.push(totalPages);

        return pages;
    };

    return (
        <div className="pagination">
            <button className="page-button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`page-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
