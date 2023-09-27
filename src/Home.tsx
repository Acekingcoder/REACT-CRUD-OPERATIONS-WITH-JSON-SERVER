import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]) as any[];

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: any) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          // Refresh the data after deletion
          axios
            .get("http://localhost:3000/users")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="mb-4">List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <Link to="/create" className="btn btn-success mb-3">
          Add User
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d: any, index: number) => (
              <tr key={d.id}>
                <td>{index + 1}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link to={`/read/${d.id}`} className="btn btn-info me-2">
                    Read
                  </Link>
                  <Link to={`/update/${d.id}`} className="btn btn-primary me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
