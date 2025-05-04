import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RootState } from "../../../store";
import { setExtraInputsOpen } from "../../../store/reducers/extraInputsOpenSlice.js";
import { useMemo } from "react";

const iconProps = {
  size: 20,
  color: "#ffffff",
};

function OpenExtraInputsButton({ children }: { children: string }) {
  const dispatch = useDispatch();
  const extraInputsOpen: boolean = useSelector((state: RootState): boolean => state.extraInputsOpen);

  const memoizedIcon = useMemo(() => {
    return extraInputsOpen ? <IoIosArrowDown {...iconProps} /> : <IoIosArrowUp {...iconProps} />;
  }, [extraInputsOpen]);

  return (
    <Button onClick={() => dispatch(setExtraInputsOpen(!extraInputsOpen))}>
      <span>{children}</span>
      {memoizedIcon}
    </Button>
  );
}

export default OpenExtraInputsButton;