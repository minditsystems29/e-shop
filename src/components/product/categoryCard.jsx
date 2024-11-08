const CategoryCard = ({ category }) => {
    return (
      <div className="p-4 border border-gray-300 rounded-md shadow-md text-center">
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p className="text-sm text-gray-500">{category.description}</p>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          View {category.name}
        </button>
      </div>
    );
  };
  
  export default CategoryCard;
  