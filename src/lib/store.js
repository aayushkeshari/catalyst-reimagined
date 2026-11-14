import { writable, get } from 'svelte/store';
import { PROFILES } from './catalog.js';
import { createState, hydrateState } from './model.js';
const safeRead = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const safeWrite = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); return true; } catch { return false; } };
const prefix='catalyst.demo.v2.';
const initialId=safeRead('catalyst.demo.active');
export const profile=writable(PROFILES.find(p=>p.id===initialId)??PROFILES[0]);
export const data=writable(hydrateState(safeRead(prefix+get(profile).id),get(profile)));
export const theme=writable(safeRead('catalyst.demo.theme')==='dark'?'dark':'light');
export const storageUnavailable=writable(false);
export const toast=writable(null);
let toastTimer;
export function notify(message,options={}) { clearTimeout(toastTimer);toast.set({message,...options});toastTimer=setTimeout(()=>toast.set(null),options.action?15000:6500); }
export function updateData(next) { const p=get(profile); data.set(next); if(!safeWrite(prefix+p.id,next))storageUnavailable.set(true); }
export function changeProfile(id) { const p=PROFILES.find(x=>x.id===id);if(!p)return;profile.set(p);data.set(hydrateState(safeRead(prefix+id),p));safeWrite('catalyst.demo.active',id);notify(`Now exploring as ${p.name}.`); }
export function resetDemo() { const p=get(profile);updateData(createState(p));notify('This demo profile has been reset.'); }
export function setTerm(id) { updateData({...get(data),termId:id}); }
export function toggleTask(id) { const s=get(data);updateData({...s,completedTasks:s.completedTasks.includes(id)?s.completedTasks.filter(x=>x!==id):[...s.completedTasks,id]}); }
export function setTheme(value) { theme.set(value);safeWrite('catalyst.demo.theme',value); }
export function download(name,content,type='text/plain') { const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
