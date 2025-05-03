import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RootState } from "../../../store";
import { setExtraInputsOpen } from "../../../store/reducers/extraInputsOpenSlice.js";
import { Dispatch } from "@reduxjs/toolkit";

const iconProps = {
  size: 20,
  color: "#ffffff",
}

function OpenExtraInputsButton({ children }: { children: string }) {
  const dispatch: Dispatch = useDispatch();
  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);

  return (
    <Button onClick={() => dispatch(setExtraInputsOpen(!extraInputsOpen))}>
      <span>{children}</span>
      {extraInputsOpen
        ? <IoIosArrowDown {...iconProps} />
        : <IoIosArrowUp {...iconProps} />
      }
    </Button>
  );
}

export default OpenExtraInputsButton;