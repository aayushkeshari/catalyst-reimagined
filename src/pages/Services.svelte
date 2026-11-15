<script>
  import { onMount } from 'svelte';
  import { ACADEMIC_GROUPS, OFFICIAL } from '../lib/academics.js';
  import { SERVICES } from '../lib/catalog.js';
  import Icon from '../lib/components/Icon.svelte';
  let {params=new URLSearchParams()}=$props();
  let query=$state('');let selected=$state('all');
  onMount(()=>{selected=({Records:'records',records:'records',Graduation:'graduation',Planning:'planning',Advising:'advising',advising:'advising',Support:'support'}[params.get('category')]??'all');});
  let extras=$derived(SERVICES.filter(s=>s.category==='Support'||s.id==='advising'||s.id==='registrar'));
  let groups=$derived(ACADEMIC_GROUPS.map(g=>({...g,items:g.items.filter(p=>`${p.label} ${p.description}`.toLowerCase().includes(query.toLowerCase()))})).filter(g=>g.items.length&&(selected==='all'||selected===g.id||(selected==='planning'&&['classes','calendars','progress'].includes(g.id))||(selected==='advising'&&g.id==='progress'))).map(g=>selected==='advising'?{...g,items:g.items.filter(p=>p.id==='bearcat-network')}:g).filter(g=>g.items.length));
  let support=$derived(['all','advising','support'].includes(selected)?extras.filter(s=>(selected!=='advising'||s.id==='advising')&&`${s.title} ${s.description}`.toLowerCase().includes(query.toLowerCase())):[]);
  let count=$derived(groups.reduce((n,g)=>n+g.items.length,0)+support.length);
</script>
<div class="page-heading"><div><p class="eyebrow">My Academics directory</p><h1>Academic services</h1><p>The same sections as Catalyst, with a clearer path to every task.</p></div><a class="button secondary" href="#/academics">My Academics overview <Icon name="arrow" size={16}/></a></div>
<div class="search-box service-search"><Icon name="search"/><input type="search" aria-label="Find a student service" placeholder="Grades, transcripts, graduation, transfer credit…" bind:value={query}/></div>
<div class="category-chips" aria-label="Academic service section"><button class:active={selected==='all'} aria-pressed={selected==='all'} onclick={()=>selected='all'}>All sections</button>{#each ACADEMIC_GROUPS as g}<button class:active={selected===g.id} aria-pressed={selected===g.id} onclick={()=>selected=g.id}>{g.label}</button>{/each}<button class:active={selected==='support'} aria-pressed={selected==='support'} onclick={()=>selected='support'}>Support</button></div>
<div class="results-meta" role="status"><span>{count} services</span><span>Official services are clearly marked before opening externally</span></div>
{#each groups as group}<section class="panel padded service-section"><div class="section-heading"><div><span class="eyebrow">My Academics</span><h2>{group.label}</h2></div><span class="tile-icon"><Icon name={group.icon}/></span></div><div class="service-directory-grid">{#each group.items as item}<a href={item.href} class="service-directory-item"><span><strong>{item.label}</strong><small>{item.description}</small></span><Icon name="arrow" size={17}/></a>{/each}</div></section>{/each}
{#if support.length}<section class="panel padded service-section"><div class="section-heading"><h2>Advising & support</h2><Icon name="people"/></div><div class="service-directory-grid">{#each support as s}<a class="service-directory-item" href={s.href} target={s.external?'_blank':undefined} rel={s.external?'noreferrer':undefined}><span><strong>{s.title}</strong><small>{s.description}{s.external?' · Official UC website':''}</small></span><Icon name={s.external?'external':'arrow'} size={17}/></a>{/each}</div></section>{/if}
{#if !count}<section class="panel empty-state"><Icon name="search" size={30}/><h2>No services match yet.</h2><p>Try a broader search or show all sections.</p><button class="button secondary" onclick={()=>{query='';selected='all';}}>Clear filters</button></section>{/if}
