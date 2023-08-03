import React, { useState } from "react";
import { Form, Input, Row, Col, Select, Button, message } from "antd";
import "../Login/login.css";
import axios from "axios";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    try {
      const res = await axios.post("http://43.205.182.249:4001/login", {
        mobileNo: mobile,
        password: password,
        roles: role,
      });
      if (res.data) {
        message.success(
          "Logged in successfully, Redirecting to user dashboard"
        );
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (err) {
      message.error("login failed");
      console.log("error while login", err);
    }
    setLoading(false);
  };

  return (
    <div className="parent">
      <Row>
        <Col span={24} className="child">
          <h1>LogIn</h1>
          <Form onFinish={submitHandler} className="form_parent">
            <Form.Item
              rules={[{ required: true, message: "this field is required" }]}
            >
              <Input
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="number"
                className="form_input"
                placeholder="enter mobile number"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "this field is required" }]}
            >
              <Input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form_input"
                placeholder="enter password"
              />
            </Form.Item>
            <Form.Item label="select your role">
              <Select
                name="role"
                value={role}
                onChange={(value) => setRole(value)}
              >
                <Select.Option value="user">user</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="login_btn" htmlType="submit" loading={loading}>
                submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
