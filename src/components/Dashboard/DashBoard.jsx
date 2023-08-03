import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "antd";

function DashBoard() {
  const [data, setData] = useState([]);
  const date = data.map((item) => {
    const isoDate = item.dob;
    const normalDate = new Date(isoDate);
    const year = normalDate.getFullYear();
    const month = normalDate.getMonth();
    const day = normalDate.getDate();
    const date = `${day}-${month}-${year}`;
    return date;
  });
  const userId = "64ae97f06bee0ace17cdc87e";
  const fetchData = async () => {
    const res = await axios.get(
      `http://43.205.182.249:4001/get/user?id=${userId}`
    );
    return res;
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Row>
      {data.map((item) => {
        return (
          <Col key={item.id}>
            <Card title="user details">
              <p>Name : {item.name}</p>
              <p>D.O.B : {date}</p>
              <p>gender : {item.gender}</p>
              <p>about : {item.about}</p>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default DashBoard;
