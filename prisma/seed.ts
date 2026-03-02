import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
  await prisma.watchlistItem.createMany({data:[{ticker:"AAPL"},{ticker:"MSFT"},{ticker:"NVDA"}],skipDuplicates:true});
  await prisma.setting.upsert({where:{id:1},create:{id:1},update:{}});
}
main().finally(()=>prisma.$disconnect());
