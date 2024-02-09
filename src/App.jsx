import { useEffect, useState } from "react";
import employeeData from "./EmpData";

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [newId, setId] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setData(employeeData);
  }, []);

  const handelEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    // console.log(dt);
    if (dt != undefined) {
      setId(id);
      setFirstName(dt[0].firstname);
      setLastName(dt[0].lastname);
      setAge(dt[0].age);
      setUpdate(true);
    }
  };

  const handelDelete = (id) => {
    if (id > 0) {
      if (window.confirm("you want to delete the data")) {
        const dt = data.filter((item) => item.id != id);

        setData(dt);
      }
    }
  };

  const handelSave = (e) => {
    let fieldValue = "";
    if (firstName === "") {
      fieldValue += "firstname is required";
    }

    if (lastName === "") {
      fieldValue += "lastname is required";
    }
    if (age <= 0) {
      fieldValue += "age is required";
    }
    if (fieldValue !== "") {
      e.preventDefault();
      const dt = [...data];
      const newObj = {
        id: dt.length > 0 ? dt[dt.length - 1].id + 1 : 1,
        firstname: firstName,
        lastname: lastName,
        age: age,
      };
      dt.push(newObj);
      setData(dt);
    } else {
      alert(fieldValue);
    }
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    const Index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(newId);

    const dt = [...data];
    dt[Index].age = age;
    dt[Index].firstname = firstName;

    dt[Index].lastname = lastName;

    setData(dt);
    handelClear();
  };

  const handelClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setUpdate(false);
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center my-4 underline text-info">Employee List</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "76%",
          marginBottom: "10px",
        }}>
        <div>
          <label htmlFor="" style={{ marginRight: "10px" }}>
            Firstname :{" "}
            <input
              type="text"
              name="firstname"
              placeholder="enter your firstname"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="" style={{ marginRight: "10px" }}>
            lastname :{" "}
            <input
              type="text"
              name="lastname"
              placeholder="enter your lastname"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label htmlFor="" style={{ marginRight: "10px" }}>
            Age :
            <input
              type="text"
              name="age"
              placeholder="enter your age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
            />
          </label>
        </div>
        <div>
          {update === false ? (
            <button
              className="btn  btn-primary mr-1"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                handelSave(e);
              }}>
              save
            </button>
          ) : (
            <button
              className="btn  btn-primary mr-1"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                handelUpdate(e);
              }}>
              update
            </button>
          )}
          {/* <button
            className="btn  btn-primary mr-1"
            style={{ marginRight: "10px" }}
            onClick={() => {
              handelSave();
            }}>
            save
          </button>
          <button
            className="btn  btn-primary mr-1"
            style={{ marginRight: "10px" }}
            onClick={() => {
              handelUpdate();
            }}>
            update
          </button> */}

          <button
            className="btn btn-danger"
            onClick={() => {
              handelClear();
            }}>
            clear
          </button>
        </div>
      </div>
      <table className="table table-hover ">
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Id</td>
            <td>Firstname</td>
            <td>Lastname</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn  btn-primary mr-1"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      handelEdit(item.id);
                    }}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handelDelete(item.id);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
