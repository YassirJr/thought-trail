import React, { useState, useEffect } from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";


function Pagination({ values, setPagination }) {
    const [currentPage, setCurrentPage] = useState(1);
    const paginationData = () => {
        const data = values;
        const startIndex = (currentPage - 1) * 2;
        const endIndex = startIndex + 2;
        setPagination(data.slice(startIndex, endIndex));
    };

    const next = () => {
        setCurrentPage(currentPage + 1);
    };
    const prev = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        paginationData();
    }, [currentPage, values]);

    return (
        Math.ceil(values.length / 2) > 1 && (
            <div className="flex items-end justify-center py-10 transition ">
                <div className="flex items-center justify-center gap-5 p-2 ">
                    <button
                        className="flex items-center justify-center  gap-2 dark:text-gray-400 text-gray-800  hover:text-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={prev}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeftIcon strokeWidth={1} className='w-6 h-6' />
                    </button>
                    <p className="p-2 dark:text-gray-200 rounded bg-[#129F5E] text-white ">
                        {currentPage}/{Math.ceil(values.length / 2)}
                    </p>

                    <button
                        className="flex items-center justify-center  gap-2 dark:text-gray-400 text-gray-800   hover:text-green-500 disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={next}
                        disabled={currentPage === Math.ceil(values.length / 2)}
                    >
                        <ArrowRightIcon strokeWidth={1} className='w-6 h-6' />
                    </button>
                </div>
            </div>
        )
    );
}

export default Pagination;
