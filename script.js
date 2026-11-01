const grid=document.querySelector('#project-grid'),filtersEl=document.querySelector('#filters'),home=document.querySelector('#home-view'),detail=document.querySelector('#detail-view');
const filters=['全部',...new Set(projects.map(p=>p.category))];
function renderProjects(filter='全部'){
  filtersEl.innerHTML=filters.map(f=>`<button type="button" class="filter ${f===filter?'active':''}" data-filter="${f}" aria-pressed="${f===filter}">${f}</button>`).join('');
  grid.innerHTML=projects.filter(p=>filter==='全部'||p.category===filter).map(p=>`<a class="project-card" href="#project/${p.slug}"><div class="project-image"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="image-arrow" aria-hidden="true">↗</span></div><div class="project-meta"><span>${p.category}</span><span>${p.status}</span></div><div class="project-title"><h3>${p.title}</h3><span aria-hidden="true">↗</span></div><p>${p.summary}</p></a>`).join('');
}
document.querySelector('#article-list').innerHTML=articles.map(a=>`<a class="article-row" href="#article/${a.slug}"><span class="date">${a.category}</span><div><span class="label">${a.status}</span><h3>${a.title}</h3><p>${a.excerpt}</p></div><span class="row-arrow" aria-hidden="true">↗</span></a>`).join('');
filtersEl.addEventListener('click',e=>{const button=e.target.closest('[data-filter]');if(button)renderProjects(button.dataset.filter)});
function route(){
  const [type,slug]=decodeURIComponent(location.hash.slice(1)).split('/'),project=type==='project';
  const item=project?projects.find(p=>p.slug===slug):type==='article'?articles.find(a=>a.slug===slug):null;
  if(!item){home.hidden=false;detail.hidden=true;document.title='王艺的个人博客';if(type==='project'||type==='article')location.replace('#home');return}
  home.hidden=true;detail.hidden=false;
  detail.innerHTML=`<article class="detail wrap"><a class="back" href="#${project?'projects':'writing'}">← 返回${project?'项目':'知识记录'}</a><div class="detail-head"><span class="label">${item.category} / ${item.status}</span><h1>${item.title}<span class="lime">.</span></h1><p>${project?item.summary:item.excerpt}</p></div>${project?`<div class="detail-image"><img src="${item.image}" alt="${item.alt}"></div>`:''}<div class="detail-body">${item.body.map(p=>`<p>${p}</p>`).join('')}</div><a class="next" href="#${project?'projects':'writing'}">浏览更多${project?'项目':'知识记录'} <span>↗</span></a></article>`;
  document.title=`${item.title} / 王艺的个人博客`;window.scrollTo(0,0);
}
renderProjects();addEventListener('hashchange',route);route();
