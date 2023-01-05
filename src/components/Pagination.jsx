const Pagination = ({ pages, totalPages, onLeftClick, onRightClick }) => {
  return (
    <div>
      <button onClick={onLeftClick}>◀</button>
      <h4>
        <strong>
          {pages + 1} de {totalPages}
        </strong>
      </h4>
      <button onClick={onRightClick}>▶</button>
    </div>
  );
};

export default Pagination;
