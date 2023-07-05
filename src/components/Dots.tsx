import React, { useEffect, useState } from "react";
import Dot from "./Dot";
import "./Dots.css";

interface Props {
  elapsedTime: number;
}

const Dots: React.FC<Props> = ({ elapsedTime }) => {
  const [mode, setMode] = useState("weeks");
  const [rows, setRows] = useState(52);
  const [cols, setCols] = useState(90);
  const [lifeDots, setLifeDots] = useState(0);
  const grid = [];
  const [defaultDots, setDefaultDots] = useState({
    earlyYears: 0,
    elementarySchool: 0,
    middleSchool: 0,
    highSchool: 0,
    college: 0,
    career: 0,
    retirement: 0,
  });

  useEffect(() => {
    if (mode === "weeks") {
      setRows(52);
      setCols(90);
      setLifeDots(elapsedTime / 604800);
      setDefaultDots({
        earlyYears: 252,
        elementarySchool: 260,
        middleSchool: 156,
        highSchool: 260,
        college: 260,
        career: 1560,
        retirement: 1932,
      });
    } else if (mode === "months") {
      setRows(36);
      setCols(30);
      setLifeDots(elapsedTime / 2592000);
      setDefaultDots({
        earlyYears: 58,
        elementarySchool: 60,
        middleSchool: 36,
        highSchool: 60,
        college: 60,
        career: 360,
        retirement: 446,
      });
    } else if (mode === "years") {
      setRows(10);
      setCols(9);
      setLifeDots(elapsedTime / 31536000);
      setDefaultDots({
        earlyYears: 5,
        elementarySchool: 5,
        middleSchool: 3,
        highSchool: 5,
        college: 5,
        career: 30,
        retirement: 37,
      });
    }
  }, [mode, elapsedTime]);

  for (let i = 0; i < rows * cols; i++) {
    grid.push(
      <Dot
        key={i}
        width={rows}
        colored={i < lifeDots}
        earlyYears={i < defaultDots.earlyYears}
        elementarySchool={
          i >= defaultDots.earlyYears &&
          i < defaultDots.earlyYears + defaultDots.elementarySchool
        }
        middleSchool={
          i >= defaultDots.earlyYears + defaultDots.elementarySchool &&
          i <
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool
        }
        highSchool={
          i >=
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool &&
          i <
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool
        }
        college={
          i >=
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool &&
          i <
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool +
              defaultDots.college
        }
        career={
          i >=
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool +
              defaultDots.college &&
          i <
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool +
              defaultDots.college +
              defaultDots.career
        }
        retirement={
          i >=
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool +
              defaultDots.college +
              defaultDots.career &&
          i <
            defaultDots.earlyYears +
              defaultDots.elementarySchool +
              defaultDots.middleSchool +
              defaultDots.highSchool +
              defaultDots.college +
              defaultDots.career +
              defaultDots.retirement
        }
        circle={mode === "years"}
      />
    );
  }

  return (
    <div className="grid-container">
      <label htmlFor="mode">Your life in</label>
      <select
        name="mode"
        id="mode"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
        <option value="years">Years</option>
      </select>

      <div className="grid">{grid}</div>
    </div>
  );
};

export default Dots;
