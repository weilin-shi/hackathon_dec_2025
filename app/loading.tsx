const Loading = () => (
  <div className="loading-bar-container">
    <div
      style={{
        height: 8,
        width: 240,
        background: "#eee",
        position: "relative",
        overflow: "hidden",
        borderRadius: 999,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "40%",
          background: "#0070f3",
          animation: "loading-bar 1s infinite",
        }}
      />
    </div>
  </div>
);

export default Loading;
