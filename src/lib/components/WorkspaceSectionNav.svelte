<script>
import {ADMISSION_GROUPS,QUICK_ACTIONS,QUICK_GROUPS,VA_ITEM,TASK_NAV,SERVICE_INDICATORS,UNIVERSITY_TODOS} from '../workspace-directory.js';import Icon from './Icon.svelte';
let {area,route,ongo=()=>{}}=$props();
function current(p){return p.href===`#/${route}`||(area==='tasks'&&p.id===(route.includes('/todo-')?'to-do':route==='tasks'||route.includes('/indicator-')?'indicators':''));}
let flat=$derived(area==='tasks'?TASK_NAV:area==='quick-links'?QUICK_ACTIONS:[]);let groups=$derived(area==='admissions'?ADMISSION_GROUPS:area==='quick-links'?QUICK_GROUPS:[]);
</script>
<nav class="academic-nav" aria-label={`${area==='tasks'?'Tasks':area==='admissions'?'My Admissions':'Quick Links'} sections`}>
{#if flat.length}<div class="academic-nav-items profile-nav-items">{#each flat as p}<a href={p.href} class:active={current(p)} aria-current={current(p)?'page':undefined} onclick={ongo}>{p.label}{#if area==='tasks'&&p.id!=='reminders'}<span class="section-nav-count">{p.id==='indicators'?SERVICE_INDICATORS.length:UNIVERSITY_TODOS.length}</span>{/if}</a>{/each}</div>{/if}
{#each groups as group}<details class="academic-nav-group" open={group.items.some(p=>p.href===`#/${route}`)}><summary><Icon name={group.icon} size={17}/><span>{group.label}</span><Icon name="down" size={13}/></summary><div class="academic-nav-items">{#each group.items as p}<a href={p.href} class:active={p.href===`#/${route}`} aria-current={p.href===`#/${route}`?'page':undefined} onclick={ongo}>{p.label}</a>{/each}</div></details>{/each}
{#if area==='quick-links'}<div class="academic-nav-items"><a href={VA_ITEM.href} class:active={route==='quick-links/va-certification'} onclick={ongo}>{VA_ITEM.label}</a></div>{/if}
</nav>
