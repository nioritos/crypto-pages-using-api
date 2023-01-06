import "../css/Pagination.css";

const Pagination = ({ pages, totalPages, onLeftClick, onRightClick }) => {
  return (
    <div className="pagination-container">
      <button onClick={onLeftClick} className="left-click-button">
        ◀
      </button>
      <h4>
        <strong>
          {pages + 1} de {totalPages}
        </strong>
      </h4>
      <button onClick={onRightClick} className="right-click-button">
        ▶
      </button>
    </div>
  );
};

export default Pagination;
