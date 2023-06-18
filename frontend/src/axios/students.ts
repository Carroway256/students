import axios from "axios";
export interface IStudent {
  name: string;
  surname: string;
  role: string;
  id?: number;
}
export const addStudent = (student: IStudent) => {
  const { name, surname, role } = student;
  axios
    .post(
        "http://localhost:3001/students",
      {
        name,
        surname,
        role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const fetchStudents = async () => {
  return axios.get("http://localhost:3001/students");
};
export const createTable=()=>{
  return axios.get("http://localhost:3001/createStudendsTable");
}