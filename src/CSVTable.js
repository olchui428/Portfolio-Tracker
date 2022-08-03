import { lazy, useState } from "react";
import Papa from "papaparse";
import { Space, Table, Tag, Layout, Button, Upload, message } from "antd";

const CSVTable = ({ data, setData, columns, setColumns, sort }) => {
  if (sort === "pos") {
    return <PositionLevelTable data={data} setData={setData} />;
  } else if (sort === "bond") {
    return <BondLevelTable data={data} setData={setData} />;
  } else if (sort === "currency") {
    return <CurrencyLevelTable data={data} setData={setData} />;
  } else {
    return (
      <General
        data={data}
        setData={setData}
        columns={columns}
        setColumns={setColumns}
      />
    );
  }
};

const General = ({ data, setData, columns, setColumns }) => {
  const onUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setData(results.data);
          let temp = [];
          let col = results.meta["fields"];
          col.forEach((e) => {
            temp.push({ title: e, dataIndex: e });
          });
          setColumns(temp);
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Table columns={columns} dataSource={data} />
      <input
        type='file'
        accept='.csv,.xlsx,.xls'
        onChange={(e) => {
          onUpload(e);
        }}
        style={{ }}
      />
    </div>
  );
};

const PositionLevelTable = ({ data, setData }) => {
  const columns = [
    {
      title: "Desk",
      dataIndex: "Desk",
    },
    {
      title: "Trader",
      dataIndex: "Trader",
    },
    {
      title: "Book",
      dataIndex: "Book",
    },
    {
      title: "Positions",
      dataIndex: "Positions",
      sorter: (a, b) => a.Positions - b.Positions,
    },
    {
      title: "NV",
      dataIndex: "NV",
      sorter: (a, b) => a.NV - b.NV,
    },
  ];

  const onUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setData(results.data);
          let temp = [];
          let col = results.meta["fields"];
          col.forEach((e) => {
            temp.push({ title: e, dataIndex: e });
          });
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Table columns={columns} dataSource={data} />
      <input
        type='file'
        accept='.csv,.xlsx,.xls'
        onChange={(e) => {
          onUpload(e);
        }}
        style={{ marginTop: "10rem" }}
      />
    </div>
  );
};

const BondLevelTable = ({ data, setData }) => {
  const columns = [
    {
      title: "Desk",
      dataIndex: "Desk",
    },
    {
      title: "Trader",
      dataIndex: "Trader",
    },
    {
      title: "Book",
      dataIndex: "Book",
    },
    {
      title: "BondID",
      dataIndex: "BondID",
    },
    {
      title: "Positions",
      dataIndex: "Positions",
      sorter: (a, b) => a.Positions - b.Positions,
    },
    {
      title: "NV",
      dataIndex: "NV",
      sorter: (a, b) => a.NV - b.NV,
    },
  ];

  const onUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setData(results.data);
          let temp = [];
          let col = results.meta["fields"];
          col.forEach((e) => {
            temp.push({ title: e, dataIndex: e });
          });
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Table columns={columns} dataSource={data} />
      <input
        type='file'
        accept='.csv,.xlsx,.xls'
        onChange={(e) => {
          onUpload(e);
        }}
        style={{ marginTop: "10rem" }}
      />
    </div>
  );
};

const CurrencyLevelTable = ({ data, setData }) => {
  const columns = [
    {
      title: "Desk",
      dataIndex: "Desk",
    },
    {
      title: "Currency",
      dataIndex: "Currency",
    },
    {
      title: "Positions",
      dataIndex: "Positions",
      sorter: (a, b) => a.Positions - b.Positions,
    },
    {
      title: "NV",
      dataIndex: "NV",
      sorter: (a, b) => a.NV - b.NV,
    },
  ];

  const onUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          setData(results.data);
          let temp = [];
          let col = results.meta["fields"];
          col.forEach((e) => {
            temp.push({ title: e, dataIndex: e });
          });
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Table columns={columns} dataSource={data} />
      <input
        type='file'
        accept='.csv,.xlsx,.xls'
        onChange={(e) => {
          onUpload(e);
        }}
        style={{ marginTop: "10rem" }}
      />
    </div>
  );
};

export default CSVTable;
