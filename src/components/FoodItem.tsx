interface Props {
  iconSrc?: string;
  title: string;
  date?: Date;
}

function FoodItem({ iconSrc, title, date }: Props) {
  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-2">
          <button className="btn btn-default">
            {iconSrc && (
              <img
                src={iconSrc}
                alt="Icon"
                className="img-fluid img-thumbnail"
              />
            )}
            {!iconSrc && (
              <img
                src="generic-fooditem-1024x1024.png"
                alt="Icon"
                className="img-fluid img-thumbnail"
              />
            )}
          </button>
        </div>
        <div className="col">{title}</div>
        <div className="col">{date?.toLocaleDateString()}</div>
      </div>
    </li>
  );
}

export default FoodItem;
