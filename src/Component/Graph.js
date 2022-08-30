import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";
import React, { useEffect, useState } from "react";
import "../Assets/Container/Container.css";
import axios from "axios";
import { APIKEY } from "../APIKEY";
import { useSelector } from "react-redux";
import getSelectedPrefCodeReducer from "../Reducer/getSelectedPrefCodeReducer";

const Graph = ({ getLoading }) => {
  const [listPopulation, setListPopulation] = useState([]);
  const listPrefCode = useSelector((state) => state.getSelectedPrefCodeReducer);
  //   console.log(listPrefCode.listSelectedCode);
  //   console.log(listPrefCode.listSelectedName);

  const [loading, setLoading] = useState(false);
  const GetPopulationFromCode = async () => {
    const headers = {
      "X-API-KEY": APIKEY,
    };
    var new_array = [...listPopulation];
    // for (let i = 0; i < listPrefCode.listSelectedCode.length; i++) {
    //   await axios({
    //     method: "GET",
    //     url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${listPrefCode.listSelectedCode[i]}`,
    //     headers: headers,
    //   })
    //     .then((res) => {
    //       return res.data;
    //     })
    //     .then((data) => {
    //       // console.log(data.result.data[0].data);
    //       new_array.push(data.result.data[0].data);
    //       // array.push(data.result.data[0].data);
    //     })
    //     .catch((err) => console.log(err));
    // }
    if (listPrefCode.listSelectedCode.length > 0) {
      var before = new Date();
      // getTime(1000);
      setLoading(true);
      getLoading(true);
      await axios({
        method: "GET",
        url: `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${
          listPrefCode.listSelectedCode[
            listPrefCode.listSelectedCode.length - 1
          ]
        }`,
        headers: headers,
      })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          // console.log(data.result.data[0].data);
          new_array.push(data.result.data[0].data);
          // array.push(data.result.data[0].data);
          setListPopulation(new_array);
          getLoading(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));
      var after = new Date();
      var sum = after - before;
      //   console.log(sum);

      // console.log(new_array);
      // console.log(listPrefCode.listSelectedCode)
    }
  };
  useEffect(() => {
    GetPopulationFromCode();
  }, [listPrefCode.listSelectedCode]);

  const [data, setData] = useState([]);
  const [initial, setInitial] = useState([]);
  const InitData = () => {
    let new_data = [];
    for (let i = 0; i <= 17; i++) {
      new_data.push({
        year: 1960 + i * 5,
      });
    }
    setInitial(new_data);
    // console.log(new_data)
  };
  useEffect(() => {
    InitData();
  }, []);

  const CreateDataGraph = () => {
    let new_data = [...initial];
    let vari;
    // console.log(listPopulation[0]);
    for (let j = 0; j < listPrefCode.listSelectedCode.length; j++) {
      //   vari = "prefCode" + listPrefCode.listSelectedCode[j].toString();
      vari = listPrefCode.listSelectedName[j];
      for (let i = 0; i <= 17; i++) {
        new_data[i][vari] = listPopulation[j][i].value;
      }
    }
    // console.log(new_data);
    setData(new_data);
  };
  useEffect(() => {
    CreateDataGraph();
  }, [listPopulation]);
  const randomColor = () => {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    return randomColor;
  };

  const elementLine = listPrefCode.listSelectedName.map((item, index) => {
    return (
      <Line
        key={index}
        type="monotone"
        dataKey={item}
        stroke={randomColor()}
        activeDot={{ r: 8 }}
      />
    );
  });
  const CustomizedLabelB = ({ kapi, metric, viewBox }) => {
    return (
      <p
        x={0}
        y={0}
        dx={-300}
        dy={40}
        textAnchor="start"
        width={180}
        transform="rotate(-90)"
        // If I uncomment the next line, then the rotation stops working.
        // scaleToFit={true}
      >
        Population(millions)
      </p>
    );
  };
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);
  //   const conditionResponsiveForChart = () => {
  //     var Width = 0;
  //     if (windowDimenion.winWidth < 500) {
  //       Width = 300;
  //     } else if (windowDimenion.winWidth < 900 && windowDimenion.winWidth > 501) {
  //       Width = 500;
  //     } else if (
  //       windowDimenion.winWidth > 901 &&
  //       windowDimenion.winWidth < 1300
  //     ) {
  //       Width = 900;
  //     } else {
  //       Width = 1200;
  //     }
  //     return Width;
  //   };
  return (
    <section className="graph">
      <h1 className="graph__text">
        Line Chart Beween Population With Year In Japan
      </h1>
      <ResponsiveContainer width="95%" height={500} className="graph__chart">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" label={"Year"} height={80} />
          <YAxis width={200}>
            <Label
              style={{
                textAnchor: "middle",
                marginRight: 100,
                fill: "black",
              }}
              angle={270}
              value={"Population(millions)"}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          {elementLine}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default React.memo(Graph);
