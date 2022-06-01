interface ITableData {
  id: number,
  name: string,
//   secondColumnName: string,
//   thirdColumnName: string
}

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  return {
    props: { users },
  };
  
}

export default function TableTodosList({ users }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Usuário</th>
          <th scope="col">Tarefas</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{users.map((user) => user.id)}</th>
          <td>{users.map((user) => user.name )}</td>
          <td>0</td>
          <td>
            <button type="button" className="btn btn-warning">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
