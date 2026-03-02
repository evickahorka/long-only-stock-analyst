export type FibSettings = { percentBuffer: number; atrMultiplier: number; include786?: boolean };
export function calcFibZones(low:number, high:number, atr:number, settings:FibSettings){
  const levels = [0.382,0.5,0.618, ...(settings.include786?[0.786]:[])];
  const buffer = Math.max(settings.atrMultiplier*atr, (settings.percentBuffer/100)*high);
  return levels.map((l)=>{ const p=high-(high-low)*l; return {level:l, price:p, zone:[p-buffer,p+buffer] as [number,number]};});
}
export function calcTpZones(low:number, high:number, atr:number, settings:FibSettings){
  const ext=[1.272,1.618,2.0]; const buffer=Math.max(settings.atrMultiplier*atr,(settings.percentBuffer/100)*high);
  return ext.map((e)=>{const p=low+(high-low)*e; return {level:e, price:p, zone:[p-buffer,p+buffer] as [number,number]};});
}
