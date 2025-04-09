import { Link } from "react-router-dom";

const IssueItem = ({ item }) => {

  return (
    <div key={item} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-lg">Яма на дороге #{item}</h4>
        <p className="text-gray-600 text-sm mt-1">ул. Ленина, д. {10 + item}</p>
        <p className="text-gray-600 text-sm">Создано: 15.0{item}.2023</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        item % 3 === 0 
          ? "bg-green-100 text-green-800" 
          : item % 2 === 0 
            ? "bg-yellow-100 text-yellow-800" 
            : "bg-red-100 text-red-800"
      }`}>
        {item % 3 === 0 ? "Решено" : item % 2 === 0 ? "В работе" : "На модерации"}
      </span>
    </div>
    <Link 
      to={`/issues/${item}`} 
      className="inline-block mt-3 text-blue-500 hover:underline font-medium"
    >
      Подробнее →
    </Link>
  </div>
  )
};

export default IssueItem;