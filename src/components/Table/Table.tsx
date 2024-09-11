import { useState } from "react";
import Rows from "./Rows";
import RowHeader from "./RowHeader";
import CustomFilter from "../CustomFilter/CustomFilter";
import Pagination from "./Pagination";

const Table = ({ header, body, renderCell }) => {
  const [selectedColumn, setSelectedColumn] = useState(Object.keys(header)[0]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headerValues = Object.values(header);
  const headerKeys = Object.keys(header);

  const handleFilterChange = (text) => {
    setFilterText(text);
    setCurrentPage(1);
  };

  const handleColumnChange = (column) => {
    setSelectedColumn(column);
    setCurrentPage(1);
  };

  // const filteredBody = body.filter((item) =>
  //   item[selectedColumn]
  //     .toString()
  //     .toLowerCase()
  //     .includes(filterText.toLowerCase()),
  // );
  const filteredBody = body.filter((item) => {
    const cellValue = item[selectedColumn];

    // Verifica si cellValue no es null o undefined
    if (cellValue !== undefined && cellValue !== null) {
      return cellValue
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());
    }

    // Si es undefined o null, no coincide con el filtro
    return false;
  });

  const totalPages = Math.ceil(filteredBody.length / itemsPerPage);
  const currentBody = filteredBody.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = headerKeys.map((key) => ({
    key: key,
    label: header[key],
  }));

  return (
    <div className="font-mono h-fit justify-center w-[90%]">
      <CustomFilter
        columns={columns}
        selectedColumn={selectedColumn}
        filterText={filterText}
        onColumnChange={handleColumnChange}
        onFilterChange={handleFilterChange}
      />
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-auto" style={{ maxHeight: "500px" }}>
          <table className="min-w-full table-auto">
            <thead>
              <RowHeader data={headerValues} />
            </thead>
            <tbody className="bg-white">
              <Rows
                data={{ body: currentBody, header: headerKeys }}
                renderCell={renderCell}
              />
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredBody.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Table;
