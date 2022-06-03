import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/UsersTasks.module.css";
import Button from "../../components/button";
import Select from "../../components/select";
import Input from "../../components/input";
import Link from "../../node_modules/next/link";

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
      .then(() => {
        const updateValues = userTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed === "false" ? false : true;
          }

          return todo;
        });

        setUserTodos(() => updateValues);
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
        <Button text="Adicionar Tarefa" type="info" click={selectAddNewTask} />

        {isSelectedNewTask ? (
          <>
            <div className="input-group mb-3" style={{ margin: 20 }}>
              <Input
                name="title"
                value={formData.title}
                change={changeHandler}
              />
              <Select
                change={changeHandler}
                defaultValue={"Pendente"}
                firstOption={"Pendente"}
                secondOption={"Concluída"}
              />
            </div>
            <Button text="Salvar" type="primary" click={submitNewTask} />
          </>
        ) : (
          <div style={{ margin: 20 }}>
            {!isEdit ? (
              <Button click={editMode} text="Editar" type="warning" />
            ) : (
              <Button
                click={editMode}
                text="Cancelar edição"
                type="secondary"
              />
            )}
          </div>
        )}
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
                        <Button text="Concluída" type="success" />
                      ) : (
                        <Button text="Pendente" type="secondary" />
                      )}
                    </>
                  ) : (
                    <Select
                      change={changeHandlerToUpdate}
                      defaultValue={todo.completed}
                      firstOption={"Pendente"}
                      secondOption={"Concluída"}
                    />
                  )}
                </td>
                <td>
                  {!isEdit ? null : (
                    <Button
                      click={() => editTask(todo.id, todo.title, isCompleted)}
                      text="Salvar"
                      type="warning"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Link href={`/`}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ margin: 20 }}
        >
          Voltar
        </button>
      </Link>
    </div>
  );
}
