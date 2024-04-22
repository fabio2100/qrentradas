import { sql } from "@vercel/postgres"
import {useSearchParams} from 'next/navigation'

export default async function handler(req,res){

    let html;
    console.log(req.url)
    const valueUrl = req.url;
    console.log(valueUrl.search('id='))
    if(!valueUrl.search('id=')){
        html = '`<h1 style="background-color: orange">Numero incorrecto</h1>`'
        return res.status(200).send(html)
    }
    const id = valueUrl.split('id=')[1]
    const {rows} = await sql`SELECT validado FROM qrentradas WHERE id=${id}`;
    
    if(rows.length==0){
        html = `<h1 style="background-color: orange">Numero incorrecto</h1>`;
        return res.status(200).send(html)
    }
    if(rows[0].validado){
        html = `<h1 style="background-color: red;">YA INGRESO</h1>`
    }else{
        sql`UPDATE qrentradas SET validado=true WHERE id=${id}`
        html = `<h1 style="background-color: green;">VALIDADO</h1>`
    }

    // Envía la respuesta con el contenido HTML
    res.status(200).send(html);
}