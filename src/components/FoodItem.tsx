interface Props {
  iconSrc?: string;
  title: string;
  date?: Date;
}

function FoodItem({ iconSrc, title, date }: Props) {
  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-1">
          {iconSrc && <img src={iconSrc} alt="Icon" className="img-fluid" />}
        </div>
        <div className="col">{title}</div>
        <div className="col">{date?.toLocaleDateString()}</div>
      </div>
    </li>
  );
}

export default FoodItem;
