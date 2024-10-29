// const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const startItem = (currentPage - 1) * 10 + 1;
//   const endItem = Math.min(currentPage * 10, totalItems);

//   return (
//     <div className="flex justify-between items-center mt-4">
//       <p className="text-sm leading-5 text-blue-700">
//         Viendo
//         <span className="font-medium mx-1">{startItem}</span>a
//         <span className="font-medium mx-1">{endItem}</span>
//         de
//         <span className="font-medium mx-1">{totalItems}</span>
//         resultados
//       </p>
//       <nav className="relative z-0 inline-flex shadow-sm">
//         <div>
//           <button
//             onClick={handlePreviousPage}
//             className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
//             aria-label="Previous"
//             disabled={currentPage === 1}
//           >
//             <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => onPageChange(index + 1)}
//             className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium ${
//               currentPage === index + 1 ? "text-blue-700" : "text-blue-600"
//             } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <div>
//           <button
//             onClick={handleNextPage}
//             className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
//             aria-label="Next"
//             disabled={currentPage === totalPages}
//           >
//             <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Pagination;

import React from "react";

const Pagination = ({ currentPage, totalPages, totalItems, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm leading-5 text-blue-700">
        Viendo
        <span className="font-medium mx-1">{startItem}</span>a
        <span className="font-medium mx-1">{endItem}</span>
        de
        <span className="font-medium mx-1">{totalItems}</span>
        resultados
      </p>
      <nav className="relative z-0 inline-flex shadow-sm">
        <div>
          <button
            onClick={handlePreviousPage}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "text-blue-600 hover:bg-gray-200"
              } focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              {pageNumber}
            </button>
          );
        })}
        <div>
          <button
            onClick={handleNextPage}
            className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
            aria-label="Next"
            disabled={currentPage === totalPages}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
