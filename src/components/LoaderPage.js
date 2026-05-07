const LoaderPage = () => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">Loading…</span>
    </div>
  );
};

export default LoaderPage;
