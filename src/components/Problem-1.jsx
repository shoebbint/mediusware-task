import React, { useState } from "react";
import "bootstrap/js/dist/tab";

const Problem1 = () => {
  const [inputs, setInputs] = useState({
    name: "",
    status: "",
  });
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, inputs]);
    setInputs({
      name: "",
      status: "",
    });
  };

  const filterItem = () => {
    if (filter === "All") return tableData;
    else return tableData.filter((item) => item.status.toLowerCase() === filter.toLowerCase());
  };

  return (
    <div className="container">
      <h2 className="text-center m-5">PROBLEM-1</h2>
      {/* form section */}
      <form onSubmit={handleSubmit}>
        <div className="box">
          <div className="box-wrap">
            <div className="col-md-5 m-auto">
              <input
                className="form-control"
                placeholder="Name"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-5 m-auto">
              <input
                className="form-control"
                placeholder="status"
                name="status"
                value={inputs.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-3 ms-4 mt-2">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* category section */}
      <div className="category-sec">
        <button
          className={`btn ${filter.toLowerCase() === "all" ? "btn-primary" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`btn ${filter.toLowerCase() === "active" ? "btn-primary" : ""}`}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={`btn ${filter.toLowerCase() === "complete" ? "btn-primary" : ""}`}
          onClick={() => setFilter("Complete")}
        >
          Complete
        </button>
      </div>

      {/* table section */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filterItem().map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problem1;
