// GitHub Pages is static hosting. This catalogue uses sample records until an API backend is configured.
const comics=[
 {id:1,title:'The Last Guardian',category:'Superhero',price:499,issue:'#01',color:'#d94e45',description:'A new protector rises when the city needs one most.'},
 {id:2,title:'Mystic Realms',category:'Fantasy',price:650,issue:'#12',color:'#7658c9',description:'Ancient magic awakens beyond the silver mountains.'},
 {id:3,title:'Beyond Orbit',category:'Sci-Fi',price:399,issue:'#04',color:'#287d91',description:'A deep-space signal changes everything.'},
 {id:4,title:'Shadow Strike',category:'Adventure',price:550,issue:'#08',color:'#d58b35',description:'One mission. No second chances.'},
 {id:5,title:'Neon Defenders',category:'Superhero',price:799,issue:'#21',color:'#287c68',description:'The future belongs to those who stand together.'},
 {id:6,title:'Dragonbound',category:'Fantasy',price:899,issue:'#03',color:'#a64d78',description:'A forgotten legend returns in fire and flight.'}
];
const grid=document.querySelector('#comic-grid'),search=document.querySelector('#search'),category=document.querySelector('#category'),sort=document.querySelector('#sort');
function render(){let rows=comics.filter(c=>(c.title+' '+c.description).toLowerCase().includes(search.value.toLowerCase())&&(category.value==='all'||c.category===category.value));if(sort.value==='low')rows.sort((a,b)=>a.price-b.price);if(sort.value==='high')rows.sort((a,b)=>b.price-a.price);if(sort.value==='title')rows.sort((a,b)=>a.title.localeCompare(b.title));document.querySelector('#comic-count').textContent=rows.length;if(!rows.length){grid.innerHTML='<div class="empty">No comics match your search. Try another title or category.</div>';return}grid.innerHTML=rows.map(c=>`<article class="comic"><div class="cover" style="background:linear-gradient(145deg,${c.color},#171923)"><small>COMICVERSE · ${c.category.toUpperCase()}</small><b>${c.title.replace(' ','<br>')}</b><span class="issue">ISSUE ${c.issue}</span></div><div class="comic-info"><h3>${c.title}</h3><p>${c.description}</p><div class="comic-bottom"><span class="price">₹${c.price.toLocaleString('en-IN')}</span><span class="tag">${c.category}</span></div></div></article>`).join('')}
[search,category,sort].forEach(el=>el.addEventListener('input',render));render();
