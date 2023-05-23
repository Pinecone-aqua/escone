import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PropsType {
  totalPages: number;
}

function Pagination({ totalPages }: PropsType) {
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    query.page ? Number(query.page) : 1
  );
  useEffect(() => {
    query.page && setCurrentPage(Number(query.page));
  }, [query.page]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPages);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  const onPageChange = (page: number) => {
    push({ query: { ...query, page: page } });
    setCurrentPage(page);
    // Perform actions to fetch data for the new page
  };

  return (
    <nav className="flex items-center justify-center mt-6">
      <ul className="flex">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-600 disabled:bg-gray-200 disabled:text-gray-400"
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 border-t border-b border-gray-300 bg-white ${
                currentPage === pageNumber
                  ? "text-blue-500"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-600"
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-600 disabled:bg-gray-200 disabled:text-gray-400"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
