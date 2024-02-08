

export const CommitSignpost = () => {
  return (
    <>
      <div className="stat-left">
        <ul>
          <li>
            <button>created at</button>
          </li>
          <li>
            <button>updated at</button>
          </li>
        </ul>
      </div>
      <div className="stat-separator first">
        <span>
          <span></span>
        </span>
      </div>
      <div className="stat-right">
        <div className="stat-popup">
          <div className="left">
            <p>01</p>
          </div>
          <div className="right">
            <p>thur</p>
            <h2>october 2024</h2>
            <h4>10:00</h4>
          </div>
        </div>
      </div>
    </>
  );
}