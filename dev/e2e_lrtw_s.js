window.__e2e=[];(async function(){
 const L=m=>window.__e2e.push(m);
 try{
 const page=await (await fetch(window.__PAGEURL)).text();
 const lm=page.match(/var LRTW_SRC = (\[[\s\S]*?\])\.join\("\\n"\);/); const LRTW=(0,eval)(lm[1]).join("\n");
 const um=page.match(/var UNPACK_SRC = (".*?");\n/s); const UNP=(0,eval)(um[1]);
 const base='https://cdn.jsdelivr.net/gh/koreanolleh/designgym-ar@m-and2/v1/pk_lrt_s.part';
 const parts=[]; for(let i=0;i<4;i++){ parts.push(await (await fetch(base+i)).arrayBuffer()); } L('parts '+parts.map(p=>p.byteLength).join(','));
 const model=await new Promise((res,rej)=>{ const w=new Worker(URL.createObjectURL(new Blob([UNP],{type:'text/javascript'}))); w.onmessage=e=>{ if(e.data.p!=null) return; w.terminate(); e.data.err?rej(new Error(e.data.err)):res(new Uint8Array(e.data.out)); }; w.postMessage({parts},parts); });
 L('model '+model.byteLength);
 const w=new Worker(URL.createObjectURL(new Blob([LRTW],{type:'text/javascript'})));
 const t0=performance.now();
 w.onmessage=e=>{ const m=e.data; if(m.type==='ready'){ L('ready '+Math.round(performance.now()-t0)+'ms'); const W=266,H=364,rgba=new Uint8ClampedArray(W*H*4); for(let i=0;i<rgba.length;i++) rgba[i]=(i*37)%255; w.postMessage({type:'run',rgba,w:W,h:H},[rgba.buffer]); }
   else if(m.type==='depth'){ let s=0; for(let i=0;i<m.d.length;i+=101) s+=m.d[i]; L('depth n='+m.d.length+' ms='+Math.round(m.ms)+' sample='+s.toFixed(2)); }
   else L(JSON.stringify(m).slice(0,160)); };
 w.onerror=e=>L('onerror '+e.message);
 w.postMessage({type:'init',cdn:'https://cdn.jsdelivr.net/npm/@litertjs/core@2.6.0/',buf:model.buffer},[model.buffer]);
 }catch(e){ L('ERR '+e.message); }
})();
