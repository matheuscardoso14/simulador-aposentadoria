import { ReactNode } from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: ReactNode
}

function Title({ type, children }: TitleProps) {
  const Heading = type;

  return (
    <Heading className={styles.title}>
      {children}
    </Heading>
  );
}

export default Title;