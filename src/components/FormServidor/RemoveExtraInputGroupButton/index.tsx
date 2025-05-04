import { useDispatch } from "react-redux";
import Button from "../../Button";
import { FaTrash } from "react-icons/fa";
import { removeOrgaoAdicional } from "../../../store/reducers/servidorDataSlice";
import { useMemo } from "react";

const iconProps = {
  size: 16,
  color: "#ffffff",
};

function RemoveExtraInputGroupButton({ children, inputId }: { children: string, inputId: string }) {
  const dispatch = useDispatch();

  const memoizedIcon = useMemo(() => <FaTrash {...iconProps} />, []);

  return (
    <Button onClick={() => dispatch(removeOrgaoAdicional(inputId))}>
      {children}
      {memoizedIcon}
    </Button>
  );
}

export default RemoveExtraInputGroupButton;