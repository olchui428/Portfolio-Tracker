import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  LineChart,
  Line,
  Area,
  Label,
  ResponsiveContainer,
} from "recharts";
import * as Service from "./Service";
const _ = require("lodash");

const BondAreaChart = ({ type, yaxis }) => {
  if (type === "bond") {
    return <Bond yaxis={yaxis}/>;
  }
};

export default BondAreaChart;

const Bond = ({yaxis}) => {
  console.log("yaxis>>", yaxis)
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    let res = await Service.call("get", "/api/bond/more");
    let grp = _.groupBy(res, "AftEvent");
    // console.log(grp);

    let grp2 = [];
    _.forOwn(grp, (value, key) => {
      const temp = value.reduce((obj, e) => {
        // console.log("obj", obj);
        obj["AftEvent"] = e.AftEvent;
        obj[e.Desk] = (obj[e.Desk] || 0) + parseFloat(yaxis === 'nv' ? e.NV : e.Positions);
        return obj;
      }, {});
      console.log("temp> ", temp);
      grp2.push(temp);
    });

    setData(grp2);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='AftEvent'>
          <Label
            value='Events'
            offset={-10}
            position='insideBottomRight'
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          />
        </XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='HK' stroke='#8884d8' />
        <Line type='monotone' dataKey='LON' stroke='#e69b8c' />
        <Line type='monotone' dataKey='NY' stroke='#ef9b20' />
        <Line type='monotone' dataKey='SG' stroke='#00bfa0' />
        <Line type='monotone' dataKey='SYD' stroke='#0d88e6' />
        <Line type='monotone' dataKey='TOK' stroke='#27aeef' />
      </LineChart>
    </ResponsiveContainer>
  );
};
