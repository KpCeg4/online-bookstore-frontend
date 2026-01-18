export default function CategoryCard({ category, onClick }) {
  return (
    <div
      className="card p-5 text-center bg-blue"
      style={{ height: "180px", cursor: "pointer" }}
      onClick={onClick}
    >
      <h4>{category.name}</h4>
    </div>
  );
}
