import React from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


import "../style.css";
import JobPage from './JobPage';
import {ContextProfile} from '../Context/Context';

function ShowJobs() {
    const {profile} = React.useContext(ContextProfile);
    const jobs = useSelector((state => (state.jobs.jobs)));
    const logo = profile?.profile?.logo;

    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

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
        <>
            <JobPage currentItems={currentItems} logo={logo} />
            <div className='app-page'>
                <ReactPaginate className='justify-content-center'
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
}

export default memo(ShowJobs);
