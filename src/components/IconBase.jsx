import { ArrowUp, ArrowDown, Minus } from "react-feather";

export default function IconBase({ variant }) {
  const renderIcon = () => {
    switch (variant) {
      case "arrow_up":
        return <ArrowUp className="icon" size={14}></ArrowUp>;
      case "arrow_down":
        return <ArrowDown className="icon" size={14}></ArrowDown>;
      case "minus":
        return <Minus className="icon" size={14}></Minus>;
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
}
