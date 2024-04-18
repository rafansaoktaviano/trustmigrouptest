const express = require("express");
const db = require("./config/config");
const cors = require("cors");

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


const PORT = 9000;

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  try {
    db.query(
      `SELECT k.karyawan,
            p.target_kpi,
            COUNT(CASE WHEN kpi_id = 1 AND  m.aktual <= m.deadline THEN 1 ELSE NULL  END) AS actual_sales,
            TRUNCATE(COUNT(CASE WHEN kpi_id = 1 AND m.aktual <= m.deadline THEN 1  END) / p.target_kpi * 100, 0) AS pencapaian_sales,
            TRUNCATE(COUNT(CASE WHEN kpi_id = 1 AND  m.aktual <= m.deadline THEN 1 ELSE NULL  END) / p.target_kpi * 100 / 2, 0 ) AS actual_bobot_sales,
            p.target_kpi, 
            COUNT(CASE WHEN kpi_id = 2 AND  m.aktual <= m.deadline THEN 1   END) AS actual_report,
            TRUNCATE(COUNT(CASE WHEN kpi_id = 2 AND m.aktual <= m.deadline THEN 1 END) / p.target_kpi * 100, 0) AS pencapaian_report,
            TRUNCATE(COUNT(CASE WHEN kpi_id = 2 AND  m.aktual <= m.deadline THEN 1 ELSE NULL  END) / p.target_kpi * 100 / 2, 0 )  AS actual_bobot_report,
            TRUNCATE(COUNT(CASE WHEN kpi_id = 2 AND  m.aktual <= m.deadline THEN 1 ELSE NULL  END) / p.target_kpi * 100 / 2, 0 ) +  TRUNCATE(COUNT(CASE WHEN kpi_id = 1 AND  m.aktual <= m.deadline THEN 1 ELSE NULL  END) / p.target_kpi * 100 / 2, 0 )   AS KPI
            FROM table_kpi_marketing m 
            JOIN  table_kpi_karyawan k  ON m.karyawan_id = k.id 
            JOIN table_kpi p ON m.kpi_id = p.id 
           GROUP BY   k.karyawan, p.target_kpi, p.bobot_kpi
           `,
      (err, rows) => {
        if (err) throw { message: "Error!", status: 400 };
        res.status(200).send({
          isError: false,
          data: rows,
        });
      }
    );
  } catch (error) {
    res.send(error);
  }
});

app.get("/jumlah_tasklist", (req, res) => {
  try {
    db.query(
      `SELECT 
      COUNT(CASE WHEN aktual <= deadline THEN 1 END  ) AS ontime,
      COUNT(CASE WHEN aktual > deadline THEN 1 END  ) AS late,
      COUNT(CASE WHEN aktual <= deadline THEN 1 END  ) / COUNT(tasklist) * 100 as percentage_ontime,
      COUNT(CASE WHEN aktual > deadline THEN 1 END  ) / COUNT(tasklist) * 100 as percentage_late 
     FROM TRUSMIGROUP.table_kpi_marketing;`,
      (err, rows) => {
        if (err) throw { message: "Error!", status: 400 };
        res.status(200).send({
          isError: false,
          data: rows,
        });
      }
    );
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, (err) => {
  console.log(`App running at ${PORT}`);
});
