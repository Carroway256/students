import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  IStudent,
  addStudent,
  createTable,
  fetchStudents,
} from "./axios/students";

import { Student } from "./Student";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [newStudent, setNewStudent] = useState<IStudent>({
    name: "",
    surname: "",
    role: "",
  });
  const onSubmitStudnet = async(event: any) => {
    event.preventDefault();
    await addStudent(newStudent);
    await logStundets();
  };
  const logStundets = async () => {
    await fetchStudents().then((response) => {
      setStudents(response.data);
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form action="submit" onSubmit={onSubmitStudnet}>
          <div className="form-container">
            <div className="from-item">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={(event) =>
                  setNewStudent({ ...newStudent, name: event.target.value })
                }
              />
            </div>
            <div className="from-item">
              <label htmlFor="name">Surname</label>
              <input
                id="surname"
                type="text"
                name="surname"
                onChange={(event) =>
                  setNewStudent({ ...newStudent, surname: event.target.value })
                }
              />
            </div>
            <div className="from-item">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                onChange={(event) =>
                  setNewStudent({ ...newStudent, role: event.target.value })
                }
              />
            </div>{" "}
            <button type="submit">Submit Student</button>
          </div>
        </form>
        <div className="buttons-container">
          {" "}
          <button type="button" onClick={logStundets}>
            Fetch Students
          </button>
          <button type="button" onClick={createTable}>
            Create Table
          </button>
        </div>

        <div className="students-container">
          {students.length > 0 ? (
            <>
              <div>name</div>
              <div>surname</div>
              <div>role</div>
            </>
          ) : null}
          {students?.map((student) => {
            const { name, surname, role, id } = student;
            return (
              <Student id={id} name={name} surname={surname} role={role} />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
