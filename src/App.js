import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);
  //const [reset, setReset] = useState(() => () => setSeconds(0));
  const [sessionLength, setSessionLength] = useState(25);
  const [reduceSession, setReduceSession] = useState(false);
  const [increaseSession, setIncreaseSession] = useState(false);

  const [breakLength, setBreakLength] = useState(5);
  const [reduceBreak, setReduceBreak] = useState(false);
  const [increaseBreak, setIncreaseBreak] = useState(false);

  const [minutes, setMinutes] = useState(sessionLength);
  const [blockType, setBlockType] = useState("Session");
  let qRef = useRef();

  useEffect(() => {
    var myVar = null;
    if (active) {
      myVar = setInterval(myTimer, 1000);
    } else if (active == false) {
      clearInterval(myVar);
    }
    return () => clearInterval(myVar);
  });

  useEffect(() => {
    if (minutes == 0 && seconds == 0) {
      qRef.current.play();
      qRef.current.currentTime = 0;
    }
  });
  /*
  function myTimer() {
    let date = new Date();
    let sec = date.getSeconds();

    let min = date.getMinutes();
    setSeconds(addZero(sec));
    setMinutes(min);
    let bebo = date.getDate();
    setDateTest(bebo);
  }  */

  function myTimer() {
    if (seconds > 0) {
      setSeconds(seconds => seconds - 1);
    } else if (seconds == 0 && minutes != 0) {
      setSeconds(59);
      setMinutes(minutes => minutes - 1);
    } else if (minutes == 0 && seconds == 0 && blockType == "Session") {
      setMinutes(breakLength);
      setSeconds(0);
      setBlockType("Break");
    } else if (minutes == 0 && seconds == 0 && blockType == "Break") {
      setMinutes(sessionLength);
      setBlockType("Session");
    }
  }

  function resetting() {
    setActive(false);
    setSeconds(0);
    // setMinutes(25);
    setSessionLength(25);
    setMinutes(25);
    setBreakLength(5);
  }

  useEffect(() => {
    if (
      reduceSession &&
      blockType == "Session" &&
      active == false &&
      sessionLength > 1
    ) {
      setSessionLength(sessionLength => sessionLength - 1);
      setMinutes(sessionLength - 1);
      setReduceSession(false);
      setSeconds(0);
    } else if (
      reduceSession &&
      blockType == "Session" &&
      active == true &&
      sessionLength > 1
    ) {
      setReduceSession(false);
    } else if (reduceSession && blockType == "Break" && sessionLength > 1) {
      setSessionLength(sessionLength => sessionLength - 1);
      setReduceSession(false);
    } else if (reduceSession && sessionLength <= 1) {
      setReduceSession(false);
    }

    if (
      increaseSession &&
      blockType == "Session" &&
      active == false &&
      sessionLength < 60
    ) {
      setSessionLength(sessionLength => sessionLength + 1);
      setMinutes(sessionLength + 1);
      setSeconds(0);
      setIncreaseSession(false);
    } else if (
      increaseSession &&
      blockType == "Session" &&
      active == true &&
      sessionLength < 60
    ) {
      setIncreaseSession(false);
    } else if (increaseSession && blockType == "Break" && sessionLength < 60) {
      setSessionLength(sessionLength => sessionLength + 1);
      setIncreaseSession(false);
    } else if (increaseSession && sessionLength >= 60) {
      setIncreaseSession(false);
    }
  });

  useEffect(() => {
    if (
      reduceBreak &&
      blockType == "Break" &&
      active == true &&
      breakLength > 1
    ) {
      //setBreakLength(breakLength => breakLength - 1);
      setReduceBreak(false);
    } else if (
      reduceBreak &&
      blockType == "Break" &&
      active == false &&
      breakLength > 1
    ) {
      setBreakLength(breakLength => breakLength - 1);
      setMinutes(minutes => minutes - 1);
      setSeconds(0);
      setReduceBreak(false);
    } else if (reduceBreak && blockType == "Session" && breakLength > 1) {
      setBreakLength(breakLength => breakLength - 1);
      setReduceBreak(false);
    } else if (reduceBreak && breakLength <= 1) {
      setReduceBreak(false);
    }

    if (
      increaseBreak &&
      blockType == "Break" &&
      active == true &&
      breakLength < 60
    ) {
      //setBreakLength(breakLength => breakLength + 1);
      //setMinutes(breakLength);
      setIncreaseBreak(false);
    } else if (
      increaseBreak &&
      blockType == "Break" &&
      active == false &&
      breakLength < 60
    ) {
      setBreakLength(breakLength => breakLength + 1);
      setMinutes(breakLength + 1);
      setSeconds(0);
      setIncreaseBreak(false);
    } else if (increaseBreak && blockType == "Session" && breakLength < 60) {
      setBreakLength(breakLength => breakLength + 1);
      setIncreaseBreak(false);
    } else if (breakLength >= 60) {
      setIncreaseBreak(false);
    }
  });

  function handleFinish() {
    if (minutes == 0 && seconds == 0 && blockType == "Session") {
    }
  }
  //setSeconds(countDownSecs(seconds));

  /*
  function countDownSecs(secs) {
    secs--;
    setSeconds(secs);
  }
*/
  // setting variable and calling function
  /*
  function addZero(elem) {
    if (elem < 10) {
      return `0${elem}`;
    } else {
      return elem;
    }
  }
*/
  return (
    <div className="App">
      <div id="break-label">Break Length</div>
      <button
        id="break-decrement"
        onClick={active == false ? () => setReduceBreak(true) : null}
      >
        down
      </button>
      <div id="break-length">{breakLength}</div>
      <button
        id="break-increment"
        onClick={active == false ? () => setIncreaseBreak(true) : null}
      >
        up
      </button>
      <div id="session-label">Session Length</div>
      <button
        id="session-decrement"
        onClick={active == false ? () => setReduceSession(true) : null}
      >
        down
      </button>
      <div id="session-length">{sessionLength}</div>
      <button
        id="session-increment"
        onClick={active == false ? () => setIncreaseSession(true) : null}
      >
        up
      </button>
      <span></span>
      <button
        id="start_stop"
        onClick={() => {
          setActive(active => !active);
        }}
      >
        pause
      </button>
      <button id="reset" onClick={() => resetting()}>
        reset
      </button>
      <div id="timer-label">{blockType}</div>
      <div id="time-left">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <audio
        src="https://freecodecampassets.s3.us-east-2.amazonaws.com/Clock+Sounds/37720__still-frames__om.mp3"
        type="audio/ogg"
        className="clip"
        id="beep"
        ref={qRef}
        title="Ohm"
      ></audio>
    </div>
  );
}

export default App;
