import { Link } from "react-router-dom";
import { ShipWheelIcon } from "lucide-react";

const StreamifyLogo = ({ to = "/", size = "text-xl" }) => {
  return (
    <Link to={to} className="flex items-center gap-2">
      <ShipWheelIcon className="size-8 text-blue-600" />
      <span
        className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${size}`}
      >
        Streamify
      </span>
    </Link>
  );
};

export default StreamifyLogo;
