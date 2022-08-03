import { useState, useEffect } from "react";
import "./App.css";
import { Tabs, Space, Table, Tag, Layout, Button, Upload, message } from "antd";
import CSVTable from "./CSVTable";
import Chart from "./Chart";
import TabContent from "./TabContent";
import * as Service from "./Service";

const { TabPane } = Tabs;

function App() {
  const onClick = async () => {
    const res = await Service.call("get", "/api/bond/more");
    console.log("res", res);
  };

  const onChange = (e) => {
    console.log(e);
  };
  return (
    <div className='App'>
      <Layout style={{ padding: "4rem" }}>
        
        <h1>Portfolio Visualizer</h1>
        <Tabs defaultActiveKey='1' onChange={onChange}>
        <TabPane tab='Overview' key='6'>
            Overview
            <TabContent type='overview' />
          </TabPane>
          <TabPane tab='Exclusions' key='1'>
            Excluded Events as of Event 543
            <TabContent type='exclusion' />
          </TabPane>
          <TabPane tab='Cash Level' key='2'>
            Cash Available for each Desk as of Event 543
            <TabContent type='cash' />
          </TabPane>
          <TabPane tab='Position Level' key='3'>
            Net Value and Positions for each Book as of Event 543
            <TabContent type='position' />
          </TabPane>
          <TabPane tab='Bond Level' key='4'>
            <TabContent type='bond' />
          </TabPane>
          <TabPane tab='Currency Level' key='5'>
            Net Value and Positions for each Desk/Currency as of Event 543
            <TabContent type='currency' />
          </TabPane>
        </Tabs>
      </Layout>
    </div>
  );
}

export default App;
