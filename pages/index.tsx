import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  return {
    props: { users },
  };
}

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>📝lista de tarefas</title>
        <meta
          name="description"
          content="Consumindo a API JSONPlaceholder para listar tarefas por usuários"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>lista de tarefas_</h1>
        <Image
          src={"/cardboard.png"}
          alt="painel de cartões e avisos"
          width={300}
          height={300}
        />

        <p className={styles.description}>
          Consumindo API{" "}
          <a
            className={styles.links}
            href="https://jsonplaceholder.typicode.com/"
          >
            JSONPlaceholder
          </a>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Usuário</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>
                  <Link href={`/tasks/${user.id}`}>
                    <button type="button" className="btn btn-primary">
                      Tarefas
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/elizairam"
          target="_blank"
          rel="noopener noreferrer"
        >
        {"feito por  elizabet_ © 2022"}
        </a>
      </footer>
    </div>
  );
}
