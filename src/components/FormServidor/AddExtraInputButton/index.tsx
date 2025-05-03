import { useDispatch } from "react-redux";
import Button from "../../Button";
import { addExtraInput } from "../../../store/reducers/extraInputs";
import { Dispatch } from "@reduxjs/toolkit";
import { IoIosAdd } from "react-icons/io";

const iconProps = {
  size: 24,
  color: "#ffffff",
}

function AddExtraInputButton({ children }: { children: string }) {
  const dispatch: Dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(addExtraInput())}>
      <span>{children}</span>
      <IoIosAdd {...iconProps} />
    </Button>
  )
}

export default AddExtraInputButton;