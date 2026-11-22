import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
import{join as e}from'node:path';
// One char per opcode byte 0..83. charCode-48 packs imm*16+pops*4+push;
// 'r' (66) marks a byte with no opcode.
const S="0Aq46:;?rrrrrrrr999999959995999r999rrrrrrrrrrrrrPTTP0rrrrrrrrrrr58rrrrrrrrrrrrrr4414";
function R(p,q){
const n=p.length,D=[],C=[],M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,h=0,l=0,i=0,x=0,t=0;
const f=v=>[o.slice(0,l),v];
for(;;){
if(t==1e6)return f(10);
if(x<0||x>=n)return f(9);
const k=p[x],y=S.charCodeAt(k)-48;
if(y!=y||y>65)return f(5);
const m=y>>4;
const w=(y>>2)&3,v=y&3;
if(x+m>=n)return f(9);
t++;
const z=x+1+m;
if(s<w)return f(2);
if(s-w+v>256)return f(3);
x=z;
if(k>15&&k<35&&k-23&&k-27){
const B=D[s-1],A=D[s-2];let r;
switch(k){
case 16:r=A+B|0;break;
case 17:r=A-B|0;break;
case 18:r=Math.imul(A,B);break;
case 19:if(!B)return f(4);r=A==(1<<31)&&B==-1?A:A/B|0;break;
case 20:if(!B)return f(4);r=B==-1?0:A%B|0;break;
case 21:if(!B)return f(4);r=(A>>>0)/(B>>>0)|0;break;
case 22:if(!B)return f(4);r=(A>>>0)%(B>>>0)|0;break;
case 24:r=A&B;break;
case 25:r=A|B;break;
case 26:r=A^B;break;
case 28:r=A<<(B&31);break;
case 29:r=A>>(B&31);break;
case 30:r=A>>>(B&31)|0;break;
case 32:r=A==B?1:0;break;
case 33:r=A<B?1:0;break;
default:r=(A>>>0)<(B>>>0)?1:0;
}
s-=2;D[s++]=r;
}else switch(k){
case 0:return f(0);
case 1:D[s++]=(p[z-1]<<24)>>24;break;
case 2:D[s++]=p[z-4]|p[z-3]<<8|p[z-2]<<16|p[z-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const T=D[s-1];D[s-1]=D[s-2];D[s-2]=T;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const T=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=T;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const G=(p[z-2]|p[z-1]<<8)<<16>>16,T=k==48?0:D[--s];
if(k==48||(k==49)==(T==0))x=z+G;
break;}
case 51:if(h==64)return f(7);C[h++]=z;x=p[z-2]|p[z-1]<<8;break;
case 52:if(!h)return f(8);x=C[--h];break;
case 64:{const A=D[s-1];if(A&~255)return f(6);D[s-1]=M[A];break;}
case 65:{const A=D[s-1],V=D[s-2];if(A&~255)return f(6);s-=2;M[A]=V;break;}
case 80:{const W=""+D[s-1];if(l+W.length>65536)return f(11);s--;o.set(Buffer.from(W),l);l+=W.length;break;}
case 81:if(l==65536)return f(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return f(D[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of b(I).sort()){
const r=R(c(e(I,id,'program.bin')),c(e(I,id,'input.bin')));
a(e(O,id),{recursive:true});
d(e(O,id,'stdout.bin'),r[0]);
d(e(O,id,'exit.txt'),r[1]+'\n');
}
