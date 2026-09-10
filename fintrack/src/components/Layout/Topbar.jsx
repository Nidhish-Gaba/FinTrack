export default function Topbar({ eyebrow, title }) {
  return (
    <header className="topbar">
      <div>
        {eyebrow && <div className="topbar__eyebrow">{eyebrow}</div>}
        <h1 className="topbar__title">{title}</h1>
      </div>
    </header>
  );
}
