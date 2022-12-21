import React from 'react';
import { useContext } from 'react';
import jobContext from '../Context/jobcontext';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


import "../style.css";
import JobPage from './JobPage';


function ShowJobs(props) {
    const jobsCtx = useContext(jobContext);
    const jobsRdx = useSelector((state => (state.jobs.jobs)));
    const jobs = (jobsCtx.length > 0) ? jobsCtx : jobsRdx;
    const profile_logo = useSelector((state) => (state.profile.profile.logo));
    const logo = (props?.logo?.length > 0) ? props.logo : profile_logo;

    console.log(jobs)

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
