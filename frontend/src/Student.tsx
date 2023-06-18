import { IStudent } from "./axios/students";
import "./App.css"
function capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
export function Student(studentdata: IStudent) {
    const {name,surname,role,id} = studentdata
    return (<><div key={id}>{capitalizeFirstLetter(name)}</div><div>{capitalizeFirstLetter(surname)}</div><div>{role}</div></>)
}
