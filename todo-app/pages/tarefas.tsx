// import { useState } from "react";
// import TableTodosList from "../components/table";

// interface ITask {
//   id: number,
//   userId?: number, 
//   title: string,
//   complete: boolean
// }

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await data.json();
  return {
    props: { todos },
  };
}

export default function Tasks({ todos }) {
// const [tasks, setTasks] = useState<ITask>({
//   id: 0,
//   title: "",
//   complete: false 
// })


  return (

    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.id} - {todo.title}
        </li>
      ))}
    </ul>
  );
}
