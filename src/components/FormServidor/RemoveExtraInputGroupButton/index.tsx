import { useDispatch } from "react-redux";
import Button from "../../Button";
import { FaTrash } from "react-icons/fa";
import { removeOrgaoAdicional } from "../../../store/reducers/servidorDataSlice";

const iconProps = {
  size: 16,
  color: "#ffffff",
}

function RemoveExtraInputGroupButton({ children, inputId }: { children: string, inputId: string }) {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(removeOrgaoAdicional(inputId))}>
      {children}
      <FaTrash {...iconProps} />
    </Button>
  )
}

export default RemoveExtraInputGroupButton;