import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {

const {rows, fields} =  await client.sql`SELECT invoices.amount, customers.name
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
WHERE invoices.amount = 666;`;

return {rows, fields};

}

export async function GET() {
    try {
        const invoices = await listInvoices();
        console.log(invoices);
        return Response.json({invoices});
    } catch (error) {
        return Response.json({message: error});
    }
}