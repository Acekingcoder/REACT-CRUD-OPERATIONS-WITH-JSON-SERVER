import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Read: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col md={10} lg={10} xl={10}>
          {" "}
          {/* Adjusted width */}
          <Card className="shadow">
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : userData ? (
                <>
                  <h2 className="mb-4">User Details</h2>
                  <p>
                    <strong>Name:</strong> {userData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userData.phone}
                  </p>
                </>
              ) : (
                <div className="text-center">User not found.</div>
              )}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Link to={`/update/${id}`}>
                <Button variant="success">Edit</Button> {/* Green color */}
              </Link>
              <Link to="/" className="btn btn-primary">
                Back {/* Blue color */}
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Read;
