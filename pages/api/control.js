import { sql } from "@vercel/postgres"

export default async function handler(req,res){

    let html;
    html = '<h1 style="background-color: black;color: white">Disabled</h1>'
    return res.status(200).send(html)
    const valueUrl = req.url;
    if(!valueUrl.search('id=')){
        html = '`<h1 style="background-color: orange">Numero incorrecto</h1><h2>No hay ningun numero</h2>`'
        return res.status(200).send(html)
    }
    const id = Math.sqrt(valueUrl.split('id=')[1]);
    if(!Number.isInteger(id)){
        html = `<div style="background-color: orange; width: 100%; height: 100%; padding-top: 100px; text-align: center;"><img src="/wrong.png"><h1>NUMERO INCORRECTO</h1></div>`;
        return res.status(200).send(html)
    }
    const {rows} = await sql`SELECT validado FROM qrentradas WHERE id=${id}`;
    
    if(rows.length==0){
        html = `<div style="background-color: orange; width: 100%; height: 100%; padding-top: 100px; text-align: center;"><img src="/wrong.png"><h1>NUMERO INCORRECTO</h1></div>`;
        return res.status(200).send(html)
    }
    if(rows[0].validado){
        html = `<div style="background-color: red; width: 100%; height: 100%; padding-top: 100px; text-align: center;"><img src="/wrong.png"><h1>YA INGRESO</h1></div>`
    }else{
        await sql`UPDATE qrentradas SET validado=true,created_at=NOW() WHERE id=${id}`
        html = `<div style="background-color: green; width: 100%; height: 100%; padding-top: 100px; text-align: center;"><img src="/cheque.png"><h1>INGRESO CORRECTO</h1></div>`
    }

    // Envía la respuesta con el contenido HTML
    res.status(200).send(html);
}