import { Link } from "react-router-dom";
interface MenuProps {
  imgUrl: string;
  menu: string;
  link: string;
}
const MenuCard = ({ imgUrl, menu, link }: MenuProps) => {
  return (
    <div className="flex flex-col justify-center items-center border-neutral-100 border-solid	border-2 w-80">
      <img src={imgUrl} alt="" className="rounded-md w-full" />
      <h3 className="text-2xl">{menu}</h3>
      <Link to={"/menu"} className="text-orange-600 uppercase">
        {link}
      </Link>
    </div>
  );
};

export default MenuCard;
