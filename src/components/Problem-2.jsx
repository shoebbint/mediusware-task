import { useState } from "react";
import contact from "../data/data";
import  "./styles/style.css";
import { useEffect } from "react";

const Problem2 = () => {

  const [items, setItems] = useState(contact);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("modal-A");
  const [selectedRow, setSelectedRow] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://contact.mediusware.com/api/contacts/?format=json");
        const data = await response.json();
        setItems(data.results);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchData();
  }, []);
  const openDetailsModal = (row) => {
    setSelectedRow(row);
    document.getElementById("detailsModal").classList.add("show");
    document.getElementById("detailsModal").style.display = "block";
    document.body.classList.add("modal-open");
  };
  const closeModal = () => {
    setSelectedRow(null);
    document.getElementById("detailsModal").classList.remove("show");
    document.getElementById("detailsModal").style.display = "none";
    document.body.classList.remove("modal-open");
  };
  const modalA = () => {
    setTitle("modal-A");
  };

  const modalB = () => {
    setTitle("modal-B");
  };
  //console.log(search);

  const filterItem = (cate) => {
    const updateItems = contact.filter((item) => item.country.name === cate);
    setItems(updateItems);
  };

  const handleChecked = (e) => {
    if (e.target.checked) {
      const check = contact.filter((item) => item.id % 2 === 0);
      setItems(check);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        {/* Button section */}
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline btn-a"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="button"
            onClick={modalA}

          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline btn-b"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="button"
            onClick={modalB}
          >
            US Contacts
          </button>
        </div>

        {/* modal section */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {title}
                </h1>
                <button
                  type="button"
                  className="btn btn-c"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
              <div className="modal-body">
                <div className="button-sec">
                  <button
                    className="btn btn-a "
                    onClick={() => setItems(contact)}
                  >
                    All Contact
                  </button>
                  <button
                    className="btn btn-b"
                    onClick={() => filterItem("United States")}
                  >
                    US Contact
                  </button>
                </div>
                <div className="search-filter">
                  <input
                    type="text"
                    placeholder="search contact..."
                    className="ps-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="table-sec">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Phone</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items
                        .filter((item) => {
                          return search.toLocaleLowerCase() === ""
                            ? item
                            : item.phone.toLocaleLowerCase().includes(search);
                        })
                        .map(({ id, phone, country }) => {
                          return (
                            <tr key={id}
                            onClick={() =>
                              openDetailsModal({ id, phone, country })
                            }>
                              <th> {id} </th>
                              <td>{phone}</td>
                              <td> {country.name} </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="checkbox"
                  onChange={handleChecked}
                  onClick={() => setItems(contact)}
                />
                <label htmlFor="">Only even</label>
                <button
                  type="button"
                  className="btn btn-c"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
                {/* Details Modal */}
                {selectedRow && (
          <div
            className="modal fade"
            id="detailsModal"
            tabIndex="-1"
            aria-labelledby="detailsModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="detailsModalLabel">
                    Details Modal
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>ID: {selectedRow.id}</p>
                  <p>Phone: {selectedRow.phone}</p>
                  <p>Country: {selectedRow.country.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
