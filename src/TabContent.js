import { useState } from "react";
import { Tabs, Space, Table, Tag, Layout, Button, Upload, message } from "antd";
import CSVTable from "./CSVTable";
import Chart from "./Chart";
import LineChart from "./LineChart";
const { TabPane } = Tabs;

export default function TabContent({ type }) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  if (type === "overview") {
    return (
      <>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Positions' key='1'>
            Total Positions of all Bonds held by each Desk
            <div style={{ height: 300, margin: "2rem" }}>
              <LineChart type='bond' yaxis='pos' />
            </div>
          </TabPane>
          <TabPane tab='Net Value' key='2'>
            Total Net Value of all Bonds held by each Desk
            <div style={{ height: 300, margin: "2rem" }}>
              <LineChart type='bond' yaxis='nv' />
            </div>
          </TabPane>
        </Tabs>
      </>
    );
  }
  if (type === "exclusion") {
    return (
      <>
        <CSVTable
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
        />
      </>
    );
  }
  if (type === "cash") {
    return (
      <>
        {data.length ? (
          <div style={{ height: 300, margin: "2rem" }}>
            <Chart data={data} columns={columns} />
          </div>
        ) : null}
        <CSVTable
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
        />
      </>
    );
  }
  if (type === "position") {
    return (
      <>
        <CSVTable
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
          sort='pos'
        />
      </>
    );
  }
  if (type === "bond") {
    return (
      <>
        <CSVTable
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
          sort='bond'
        />
      </>
    );
  }
  if (type === "currency") {
    return (
      <>
        <CSVTable
          data={data}
          setData={setData}
          columns={columns}
          setColumns={setColumns}
          sort='currency'
        />
      </>
    );
  }
}
