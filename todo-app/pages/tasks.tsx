interface ITableData {
  id: number;
  name: string;
  //   secondColumnName: string,
  //   thirdColumnName: string
}


export async function getStaticProps() {
  const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);
  const todos = await data.json();
  return {
    props: { todos },
  };
}

export default function TableTodosList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Usuário</th>
          {/* <th scope="col">Tarefas</th> */}
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.userId}>
            <th scope="row">{todo.title}</th>
            <td>{todo.complete}</td>
            {/* <td>0</td> */}
            <td>
              <button type="button" className="btn btn-warning">
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
