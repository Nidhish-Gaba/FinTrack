export default function Card({ title, action, children }) {
  return (
    <div className="card">
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
