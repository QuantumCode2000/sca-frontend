const RowHeader = ({ data }) => {
  return (
    <>
      <tr className="text-xs font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
        <th className="px-2 py-2 w-[5px]">N</th>{" "}
        {data.map((item, index) => (
          <th key={index} className="px-2 py-2 w-[5px]">
            {item}
          </th>
        ))}
      </tr>
    </>
  );
};

export default RowHeader;
