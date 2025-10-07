const { useState, useEffect, useRef } = React;

/******************* CONFIG Y UTILS *******************/
const REQUIRED_ACCURACY = 0.80;      
const CONFIDENCE_THRESHOLD = 0.45;   
const TEST_DURATION_SECONDS = 7;
const CAPTURE_INTERVAL_MS = 140;
const STORAGE_KEY = 'gestar_users_v3';

async function genSalt(){ const b=new Uint8Array(16); crypto.getRandomValues(b); return Array.from(b).map(x=>x.toString(16).padStart(2,'0')).join(''); }

async function hashPassword(password,saltHex){
  const enc=new TextEncoder(), pw=enc.encode(password);
  const salt=new Uint8Array(saltHex.match(/.{1,2}/g).map(h=>parseInt(h,16)));
  const key=await crypto.subtle.importKey('raw',pw,{name:'PBKDF2'},false,['deriveBits']);
  const derived=await crypto.subtle.deriveBits({name:'PBKDF2', salt, iterations:200000, hash:'SHA-256'}, key, 256);
  const hash=new Uint8Array(derived); return Array.from(hash).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function loadAllUsers(){ try{const raw=localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):{} }catch(e){return{}} }
function saveAllUsers(obj){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }

async function createUser(username,password){
  const all=loadAllUsers(); 
  if(!username||username.trim().length<3) throw new Error('Usuario mínimo 3 caracteres'); 
  if(all[username]) throw new Error('Usuario ya existe'); 
  if(!password||password.length<6) throw new Error('Contraseña mínima 6 caracteres');
  const salt=await genSalt(), hash=await hashPassword(password,salt);
  const profile={username,salt,hash,data:{xp:0,streak:0,badges:[],refs:{},progress:{}}};
  all[username]=profile; saveAllUsers(all); return profile;
}

async function verifyLogin(username,password){
  const all=loadAllUsers(); const p=all[username]; if(!p) throw new Error('Usuario no encontrado');
  const cand=await hashPassword(password,p.salt); if(cand!==p.hash) throw new Error('Contraseña incorrecta');
  p.data.lastLogin=new Date().toISOString(); saveAllUsers(all); return p;
}

function saveUserData(username,data){ const all=loadAllUsers(); if(!all[username]) return false; all[username].data=data; saveAllUsers(all); return true; }

// Funciones MediaPipe
function landmarksToVector(landmarks){
  if(!landmarks||landmarks.length===0) return null;
  const flat=[]; landmarks.forEach(p=>{ flat.push(p.x||p[0]); flat.push(p.y||p[1]); flat.push(p.z||p[2]||0); });
  const mean=flat.reduce((s,v)=>s+v,0)/flat.length; const centered=flat.map(v=>v-mean);
  const norm=Math.sqrt(centered.reduce((s,v)=>s+v*v,0))||1; return centered.map(v=>v/norm);
}

function cosineSim(a,b){ if(!a||!b||a.length!==b.length) return 0; let dot=0; for(let i=0;i<a.length;i++) dot+=a[i]*b[i]; return dot; }

/******************* APP PRINCIPAL *******************/
function App(){ /* TODO: copiar todo tu código React de index.html aquí */ }

/******************* RENDER *******************/
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
