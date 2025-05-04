import { useDispatch } from "react-redux";
import Button from "../../Button";
import { IoIosAdd } from "react-icons/io";
import { addOrgaoAdicional } from "../../../store/reducers/servidorDataSlice";
import { generateId } from "../../../utils";
import { useMemo } from "react";

const iconProps = {
  size: 24,
  color: "#ffffff",
};

function AddExtraInputGroupButton({ children }: { children: string }) {
  const dispatch = useDispatch();

  const memoizedIcon = useMemo(() => <IoIosAdd {...iconProps} />, []);

  return (
    <Button onClick={() => dispatch(addOrgaoAdicional(generateId()))}>
      <span>{children}</span>
      {memoizedIcon}
    </Button>
  );
}

export default AddExtraInputGroupButton;