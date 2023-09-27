import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Update = () => {
  const { id } = useParams<{ id: string }>();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (e: any) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/users/${id}`, values)
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
            <h2 className="text-left">Update User</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={values?.name}
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
                  value={values?.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={values?.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                />
              </Form.Group>

              <div className="d-flex justify-content-start mt-3">
                <Button variant="primary" type="button" as={Link as any} to="/">
                  Back
                </Button>

                <Button variant="success" type="submit" className="ml-2">
                  Update
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Update;
