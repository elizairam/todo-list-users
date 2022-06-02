import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/UsersTasks.module.css";

export default function UsersTasks() {
  const router = useRouter();
  const userId = router.query.userId;
  const [userTodos, setUserTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSelectedNewTask, setIsSelectedNewTask] = useState(false);
  const [formData, setFormData] = useState({
    userId: 0,
    title: "",
    completed: "",
  });

  useEffect(() => {
    getTasksByUserId();
  }, []);

  const getTasksByUserId = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((data) => setUserTodos(data))
      .catch((error) => console.log(error));
  };

  const editMode = () => setIsEdit(!isEdit);

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const selectAddNewTask = () => setIsSelectedNewTask(!isSelectedNewTask);

  // const submitNewTask = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //  fetch("https://jsonplaceholder.typicode.com/todos", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userId: parseInt(userId),
  //       title: formData.title,
  //       completed: formData.completed === "false" ? false : true,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // };

  const submitNewTask = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: formData.title,
        completed: formData.completed === "false" ? false : true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setUserTodos((userTodos) => [...userTodos, data]);
      })
      .catch((error) => console.log(error));
  };

  const editTask = async (
    userId: number,
    id: number,
    title: string,
    completed: boolean
  ) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: userId,
        id: id,
        title: title,
        completed: completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const updatedUserTodo = userTodos.map((todo) => {
          if (todo.id === id) {
            todo.title = title;
            todo.completed = completed;
          }

          return userTodos;
        });

        setUserTodos((userTodos) => updatedUserTodo);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image
          src={"/pencil.png"}
          alt="lápis com borracha"
          width={150}
          height={50}
        />
        <h2 className={styles.description}>
          _ tarefas associadas ao usuário {userId}
        </h2>

        <button
          type="button"
          className="btn btn-info"
          onClick={selectAddNewTask}
        >
          Adicionar tarefa
        </button>
        {isSelectedNewTask ? (
          <>
            <div className="input-group mb-3" style={{ marginTop: 20 }}>
              <input
                type="text"
                className="form-control"
                aria-label="Text input with dropdown button"
                placeholder="Descreva aqui a tarefa..."
                name="title"
                value={formData.title}
                onChange={changeHandler}
              />
              <select name="completed" id="completed" onChange={changeHandler}>
                <option value="false" defaultChecked>
                  Pendente
                </option>
                <option value="true">Concluída</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitNewTask}
            >
              Salvar
            </button>
          </>
        ) : null}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tarefa</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {userTodos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  {!isEdit ? (
                    todo.title
                  ) : (
                    <input value={todo.title} style={{ width: "98%" }}></input>
                  )}
                </td>
                <td>
                  {todo.completed ? (
                    <button type="button" className="btn btn-success">
                      Concluída
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary">
                      Pendente
                    </button>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={editMode}
                  >
                    {!isEdit ? "Editar" : "Salvar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
