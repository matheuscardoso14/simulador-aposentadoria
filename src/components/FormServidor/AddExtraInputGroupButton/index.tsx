import { useDispatch } from "react-redux";
import Button from "../../Button";
import { Dispatch } from "@reduxjs/toolkit";
import { IoIosAdd } from "react-icons/io";
import { addOrgaoAdicional } from "../../../store/reducers/servidorDataSlice";
import { generateId } from "../../../utils";

const iconProps = {
  size: 24,
  color: "#ffffff",
};

function AddExtraInputGroupButton({ children }: { children: string }) {
  const dispatch: Dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(addOrgaoAdicional(generateId()))}>
      <span>{children}</span>
      <IoIosAdd {...iconProps} />
    </Button>
  );
}

export default AddExtraInputGroupButton;