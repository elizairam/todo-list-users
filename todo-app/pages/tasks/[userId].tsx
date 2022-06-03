import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/UsersTasks.module.css";

export async function getStaticProps() {
  const data = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const users = await data.json();
  return {
    props: { users },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { userId: "1" } },
      { params: { userId: "2" } },
      { params: { userId: "3" } },
      { params: { userId: "4" } },
      { params: { userId: "5" } },
      { params: { userId: "6" } },
      { params: { userId: "7" } },
      { params: { userId: "8" } },
      { params: { userId: "9" } },
      { params: { userId: "10" } },
      // parametros rotas dinamicas para todos os 10 usuarios da API
    ],
    fallback: true,
  };
}

export default function UsersTasks() {
  const router = useRouter();
  const userId = router.query.userId;
  const [userTodos, setUserTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSelectedNewTask, setIsSelectedNewTask] = useState(false);
  const [formData, setFormData] = useState({
    userId: 0,
    title: "",
    completed: "false",
  });
  const [isCompleted, setIsCompleted] = useState("false");

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

  const changeHandlerToUpdate = (event: { target: { value: string } }) => {
    setIsCompleted(event.target.value);
  };

  const selectAddNewTask = () => setIsSelectedNewTask(!isSelectedNewTask);

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
    id: number | string,
    title: string,
    completed: string | boolean
  ) => {
    editMode();
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        title: title,
        completed: completed === "false" ? false : true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updateValues = userTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed === "false" ? false : true;
          }

          return todo;
        });

        setUserTodos((userTodos) => updateValues);
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
              <select
                name="completed"
                id="completed"
                onChange={changeHandler}
                defaultValue={formData.completed}
              >
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
                <td>{todo.title}</td>
                <td>
                  {!isEdit ? (
                    <>
                      {todo.completed ? (
                        <button type="button" className="btn btn-success">
                          Concluída
                        </button>
                      ) : (
                        <button type="button" className="btn btn-secondary">
                          Pendente
                        </button>
                      )}
                    </>
                  ) : (
                    <select
                      name="completed"
                      id="completed"
                      onChange={changeHandlerToUpdate}
                      defaultValue={todo.completed}
                    >
                      <option value="false">Pendente</option>
                      <option value="true">Concluída</option>
                    </select>
                  )}
                </td>
                <td>
                  {!isEdit ? (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={editMode}
                    >
                      Editar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => editTask(todo.id, todo.title, isCompleted)}
                    >
                      Salvar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
