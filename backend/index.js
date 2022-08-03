const express = require("express");
const app = express();
const csvtojson = require("csvtojson");
const fs = require("fs");
const _ = require("lodash");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/bond/more", async (req, res) => {
  const data = _.times(6, (i) => {
    const csv = csvtojson().fromFile(
      __dirname.replace(
        "backend",
        `backend/output_more/bond_level_portfolio_${(i + 1)*5}00.csv`
      )
    );
    return csv;
  });
  const finalData = await Promise.all(data);
  res.send(finalData.flat());
});

app.get("/api/data", (request, response) => {
  response.json("");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
