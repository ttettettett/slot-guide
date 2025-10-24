export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Slot Guide</h1>
      <p style={{ maxWidth: "32rem", lineHeight: 1.6 }}>
        This is the minimal Next.js setup. Start building your application by
        editing <code>apps/web/src/app/page.tsx</code>.
      </p>
    </main>
  );
}
