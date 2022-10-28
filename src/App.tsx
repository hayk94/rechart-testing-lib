import React, { useMemo, useState } from "react";
import "./App.css";
import MyChart, { IData } from "./MyChart";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  const [extraData, setExtraData] = useState<IData[] | void>();
  const handleClick = () => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setExtraData(data);
      });
  };

  const chartData = useMemo(() => {
    const chartData = [
      { key: 1, line: 100 },
      { key: 2, line: 200 },
      { key: 3, line: 300 },
      { key: 4, line: 400 },
    ];
    if (extraData) {
      const newData = chartData.map(({ key, line }) => {
        const extraItem = extraData?.find((item) => item.key === key);
        return { key, line, ...extraItem };
      });
      return newData;
    }

    return chartData;
  }, [extraData]);

  return (
    <div className="App">
      <button onClick={handleClick}>Refresh data</button>
      <MyChart data={chartData} showExtraLine={Boolean(extraData)} />
    </div>
  );
}

export default App;
