import React from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


import JobPage from './JobPage';
import { ContextProfile } from '../Context/Context';
import '../css/pagination.css'

function ShowJobs() {
    const { profile } = React.useContext(ContextProfile);
    const jobs = useSelector((state => (state.jobs.jobs)));
    const logo = profile?.profile?.logo;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 9;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(jobs.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(jobs.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, jobs]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % jobs.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='container-fluid'>
            <JobPage currentItems={currentItems} logo={logo} />
            <div className='container' style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: 20,
                paddingBottom: 20,
                boxSizing: 'border-box',
            }}>
                <ReactPaginate 
                    activeClassName={'item active '}
                    breakClassName={'item break-me '}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    disabledClassName={'disabled-page'}
                    marginPagesDisplayed={2}
                    nextClassName={"item next "}
                    nextLabel = {"next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    pageClassName={'item pagination-page '}
                    pageRangeDisplayed={2}
                    previousClassName={"item previous"}
                    previousLabel={"prev"}
                />
            </div>
        </div>
    );
}

export default memo(ShowJobs);
