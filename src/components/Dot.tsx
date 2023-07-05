import React from "react";
import "./Dot.css";

interface DotProps {
  width: number;
  colored: boolean;
  circle: boolean;
  earlyYears: boolean;
  elementarySchool: boolean;
  middleSchool: boolean;
  highSchool: boolean;
  college: boolean;
  career: boolean;
  retirement: boolean;
}

const Dot: React.FC<DotProps> = ({
  width,
  colored,
  circle,
  earlyYears,
  elementarySchool,
  middleSchool,
  highSchool,
  college,
  career,
  retirement,
}) => {
  function getClassName() {
    let className = "dot ";
    if (colored) {
      className += "colored ";
    }
    if (circle) {
      className += "circle ";
    }
    return className;
  }
  function getBackgroundName() {
    let className = "";
    if (earlyYears) {
      className += "early-years ";
    }
    if (elementarySchool) {
      className += "elementary-school ";
    }
    if (middleSchool) {
      className += "middle-school ";
    }
    if (highSchool) {
      className += "high-school ";
    }
    if (college) {
      className += "college ";
    }
    if (career) {
      className += "career ";
    }
    if (retirement) {
      className += "retirement";
    }
    return className;
  }

  return (
    <div
      className={getBackgroundName()}
      style={{ width: `calc(100% / ${width} - 4px)`, aspectRatio: "1 / 1" }}
    >
      <div className={getClassName()}></div>
    </div>
  );
};

export default Dot;
