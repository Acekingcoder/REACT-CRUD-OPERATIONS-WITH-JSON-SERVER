import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-left">Add a New User</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  // value={user.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  // value={user.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  // value={user.phoneNumber}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-start mt-3">
                <Button variant="primary" type="button" as={Link as any} to="/">
                  Back
                </Button>
                <Button variant="success" type="submit" className="ml-2">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddUser;
