import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
// import Link from "next/link";
import styles from "../styles/Home.module.css";
// import Users from "./users";

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();
  return {
    props: { users },
  };
}

export default function Home({ users }) {
  const [selectedUserId, setSelectedUserId] = useState(0)

  // function editTaskById(id: number) {
  //   setSelectedUserId(id)
  //   console.log(selectedUserId)
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>📝lista de tarefas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          lista de tarefas_
        </h1>
        <Image
          src={"/cardboard.png"}
          alt="painel de cartões"
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
        {/* <button type="button" className="btn btn-warning" onClick={() => console.log(selectedUserId)}>
                    Mostrar 
                  </button> */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Usuário</th>
              {/* <th scope="col">Tarefas</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                {/* <td>0</td> */}
                <td>
                {/* <Link href="/tasks"> */}
                  <button type="button" className="btn btn-warning" onClick={() => setSelectedUserId(user.id)}>
                    Editar
                  </button>
                {/* </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <Users /> */}

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}