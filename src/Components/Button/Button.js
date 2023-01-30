import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
const button = (props) => {
  const { children } = props;

  return (
    <button className={styles.BtnPause} onClick={props.onClick}>
      {children}
    </button>
  );
};
export const ButtonStart = (props) => {
  return (
    <button className={classNames(styles.BtnStart)} onClick={props.onClick}>
      Start Focus
    </button>
  );
};
export const ButtonPause = (props) => {
  return (
    <button className={styles.BtnPause} onClick={props.onClick}>
      Pause
    </button>
  );
};
export const ButtonContinue = (props) => {
  return (
    <button className={styles.BtnContinue} onClick={props.onClick}>
      Continue
    </button>
  );
};
export const ButtonStop = (props) => {
  return (
    <button className={styles.BtnStop} onClick={props.onClick}>
      Stop
    </button>
  );
};
export default button;
