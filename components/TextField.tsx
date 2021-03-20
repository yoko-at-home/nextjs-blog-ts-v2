import { DOMAttributes, VFC } from "react";
import styles from "../styles/TextField.module.css";

type CommonType = {
  variant?: "outline" | "contained";
  title?: string;
  placeholder?: string;
  className?: string;
  value?: string;
};

type textareaType = CommonType & {
  multiline?: boolean;
  rows?: number;
  onChange?: DOMAttributes<HTMLTextAreaElement>["onChange"];
};
type inputType = CommonType & {
  onChange?: DOMAttributes<HTMLInputElement>["onChange"];
};

// props の型がinput型かtextarea型かを判断する関数を定義する。
// props に multiline を持っている場合は true
const istTextarea = (
  props: textareaType | inputType
): props is textareaType => {
  return "multiline" in props;
};

export const TextField: VFC<textareaType | inputType> = (props) => {
  return (
    <div className={styles.root}>
      {props.title && <span className={styles.title}>{props.title} : </span>}
      {istTextarea(props) ? (
        <textarea
          className={styles.text}
          rows={props.rows}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      ) : (
        <input
          type="text"
          className={styles.text}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};
