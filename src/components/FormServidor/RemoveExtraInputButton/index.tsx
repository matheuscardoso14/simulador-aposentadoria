import { useDispatch } from "react-redux";
import Button from "../../Button";
import { FaTrash } from "react-icons/fa";
import { removeExtraInput } from "../../../store/reducers/extraInputs";

const iconProps = {
  size: 16,
  color: "#ffffff",
}

function RemoveExtraInputButton({ children }: { children: string }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(removeExtraInput())}>
      {children}
      <FaTrash {...iconProps} />
    </Button>
  )
}

export default RemoveExtraInputButton;