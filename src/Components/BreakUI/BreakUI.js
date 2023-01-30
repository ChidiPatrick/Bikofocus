import React from "react";
import styles from "./BreakUI.module.scss";
import { userTimer, useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";

import Tones from "../audioFiles/AudioFiles";
import {
  showStartBtn,
  hideStartBtn,
  showPauseBtn,
  hidePauseBtn,
  showStopBtn,
  hideStopBtn,
  showContinueBtn,
  hideContinueBtn,
  resetState,
  breakEnd,
  breakStart,
} from "../FrontPage/FrontPageSlice";
import UIFx from "uifx";
const BreakUI = ({ expiryTimestamp }) => {
  const dispatch = useDispatch();
  const breakAlarm = useSelector(state => state.tones.breakAlarm)
  const breakEndBell = new UIFx(Tones[breakAlarm], { volume: 0.4, throttleMs: 100 });
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire: () => {
      onExpiry();
    },
  });
  const getDate = () => {
    const time = new Date();
    return time.setSeconds(time.getSeconds() + 5);
  };
  const onExpiry = () => {
    getDate();
    dispatch(breakEnd());
    breakEndBell.play();
  };
  const skipBreak = () => {
    dispatch(breakEnd());
  };
  return (
    <div>
      <div className={styles.BreakTimerWrapper}>
        <div className={styles.BreakTimer}>
          <span>{minutes}</span> : <span>{seconds}</span>
        </div>
        <button className={styles.SkipBreakBtn} onClick={skipBreak}>
          Skip The Break
        </button>
      </div>
    </div>
  );
};
export default BreakUI;
