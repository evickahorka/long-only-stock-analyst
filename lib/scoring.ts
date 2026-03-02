export function fundamentalsScore(data: Record<string, number | null>) {
  const weights: Record<string, number> = { revenueYoY:15,revenue3Y:10,epsYoY:15,eps3Y:10,marginsTrend:10,fcf:10,leverage:10,roe:10,roic:5,dividend:5 };
  let weighted=0,total=0; const components: Record<string,{value:number|null,weight:number,contrib:number}> = {};
  for (const [k,w] of Object.entries(weights)) { const v=data[k] ?? null; if(v!==null){weighted += Math.max(0,Math.min(100,v))*w; total+=w;} components[k]={value:v,weight:w,contrib:v===null?0:(Math.max(0,Math.min(100,v))*w/100)}; }
  const score = total? Math.round(weighted/total):0;
  return { score, components, state: score>=70?"POS":score>=50?"NEU":"NEG" };
}
export function sentimentScore(segment:number|null, company:number|null){
  const score = company===null ? (segment ?? 0) : Math.round((segment ?? 50)*0.4 + company*0.6);
  const state = company===null?"unknown":score>=60?"POS":score>=40?"NEU":"NEG";
  return {score,state};
}
