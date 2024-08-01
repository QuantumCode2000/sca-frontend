const ViewMore = ({ titles, data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.keys(titles).map((key) => (
        <div key={key} className="flex flex-col">
          <span className="font-semibold text-gray-700">{titles[key]}</span>
          <span className="text-gray-800">{data[key]}</span>
        </div>
      ))}
    </div>
  );
};

export default ViewMore;
