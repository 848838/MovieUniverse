export function Loader() {
  return (
    <div className="loader-wrap">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export function ErrorMsg({ message }) {
  return (
    <div className="error-wrap">
      <p>⚠️ {message || "Something went wrong."}</p>
    </div>
  );
}
