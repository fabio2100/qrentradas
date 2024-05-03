import Image from "next/image";
import styles from "./page.module.css";
import { sql } from "@vercel/postgres";

export default async function Home() {

  const users = await sql`SELECT * FROM qrentradas ORDER BY validado DESC,id`;
  const userMap = users.rows.map(user=>{
    let date;
    let hora,minutos,segundos;
    if(user.created_at != null){
      date = new Date(user.created_at);
      hora = date.getHours()-3;
      hora = hora < 10 ? `0${hora}` : hora
      minutos = date.getMinutes();
      minutos = minutos < 10 ? `0${minutos}` : minutos
      segundos = date.getSeconds();
      segundos = segundos < 10 ? `0${segundos}` : segundos
    }else{
      date = false
    }
    return <li key={user.id}>
      DNI: {user.id} {user.validado ? 'INGRESÓ' : 'NO'} {date && (`${hora}:${minutos}:${segundos}`)}
    </li>
  })

  return (
    <main className={styles.main}>
      <ul>{userMap}</ul>
    </main>
  );
}
