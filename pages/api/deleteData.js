import { sql } from "@vercel/postgres"


export default async function handler(req,res){
    await sql`UPDATE qrentradas SET validado=false,created_at=null`
    return res.status(200).json({msg:"Datos borrados correctamente"})
}