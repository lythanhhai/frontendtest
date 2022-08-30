import React, { useEffect, useState } from "react";
import "../Assets/Container/Container.css";
import ListPrefecture from "./ListPrefecture";
import Graph from "./Graph";
import axios from "axios";
import { APIKEY } from "../APIKEY";

const Container = () => {
  const [listPrefecture, setListPrefecture] = useState([]);
  
  const GetListPrefecture = () => {
    const headers = {
      "X-API-KEY": APIKEY,
    };
    const entry = "prefectures";
    // axios
    //   .get(`https://opendata.resas-portal.go.jp/api/v1/${entry}`, { headers })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    axios({
      method: "GET",
      url: `https://opendata.resas-portal.go.jp/api/v1/${entry}`,
      headers: headers,
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log(data);
        setListPrefecture(data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    GetListPrefecture();
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const getLoading = (correct) => {
    setIsLoading(correct)
  };

  return (
    <section className={"container"}>
        <>
          <h1 className="container__title">
            Total Population of Prefecture and Chart
          </h1>
          <ListPrefecture listPrefecture={listPrefecture} isLoading={isLoading}/>
          <Graph getLoading={getLoading} />
        </>
    </section>
  );
};

export default React.memo(Container);
