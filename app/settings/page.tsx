import { prisma } from "@/lib/prisma";
export default async function Settings(){ const s=await prisma.setting.findUnique({where:{id:1}}); return <div className="card"><h1>Settings</h1><pre>{JSON.stringify(s,null,2)}</pre></div>; }
