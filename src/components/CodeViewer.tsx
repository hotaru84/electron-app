type Props = {
  title: string;
  code: string;
  language: string;
};

export const CodeViewer = ({ title, code }: Props) => (
  <div style={{ marginBottom: "1rem" }}>
    <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{title}</h2>
    <pre
      style={{
        background: "#2d2d2d",
        color: "#f8f8f2",
        padding: "1rem",
        borderRadius: "5px",
      }}
    >
      <code>{code}</code>
    </pre>
  </div>
);
