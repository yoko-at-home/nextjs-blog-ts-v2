import styles from "../styles/Button.module.css";
import cc from "classcat";
import { DOMAttributes, ReactNode, VFC } from "react";

type Props = {
  variant?: "outline" | "contained";
  children: ReactNode;
  className?: string;
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
};

export const Button: VFC<Props> = (props) => {
  const classes = cc([
    styles.button,
    {
      [styles.outline]: props.variant === "outline",
      [styles.contained]: props.variant === "contained",
    },
    props.className,
  ]);
  return (
    <div className={styles.root}>
      <button className={classes} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};
// Propsのデフォルト値
Button.defaultProps = {
  variant: "contained",
};
