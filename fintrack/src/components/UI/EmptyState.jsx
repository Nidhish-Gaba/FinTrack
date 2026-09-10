export default function EmptyState({ icon = "📭", title, subtitle }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <p style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)" }}>
        {title}
      </p>
      {subtitle && <p style={{ marginTop: 4 }}>{subtitle}</p>}
    </div>
  );
}
