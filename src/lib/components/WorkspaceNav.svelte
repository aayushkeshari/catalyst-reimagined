<script>
import {data} from '../store.js';import {TASKS} from '../catalog.js';
import WorkspaceSectionNav from './WorkspaceSectionNav.svelte';import {WORKSPACE_ROOTS,TOOL_ITEMS} from '../workspace-directory.js';
import AcademicNav from './AcademicNav.svelte';import AccountNav from './AccountNav.svelte';import Icon from './Icon.svelte';
let {route,params,mobile=false,ongo=()=>{}}=$props();
const roots=[{id:'',label:'Home',icon:'home'},{id:'academics',label:'My Academics',icon:'book'},{id:'finances',label:'My Finances',icon:'wallet'},{id:'profile',label:'My Profile',icon:'people'},...WORKSPACE_ROOTS,{id:'services',label:'Academic services',icon:'grid'}];
const serviceSections=[['Records','Records & transcripts'],['Planning','Planning & calendars'],['Advising','Advising'],['Graduation','Graduation'],['Support','Support']];
let activeRoot=$derived(['classes','progress'].includes(route)?'academics':route.split('/')[0]);
let expanded=$state({});let lastLocation;
// Reveal the current page's parent after navigation; manual toggles stay put while browsing the page.
$effect(()=>{const location=route+'?'+params.toString();if(location===lastLocation)return;lastLocation=location;if(activeRoot)expanded={...expanded,[activeRoot]:true};});
function toggle(id){expanded={...expanded,[id]:!expanded[id]};}
</script>
{#each roots as n}
  <nav class:mobile-navigation={mobile} class="workspace-root-nav" aria-label={`${n.label} navigation`}>
    {#if n.id}
      <div class="workspace-root-row" class:active={route===n.id}>
        <a href={`#/${n.id}`} class:active={route===n.id} aria-current={route===n.id?'page':undefined} onclick={ongo}>
          <Icon name={n.icon} size={19}/><span class="workspace-root-label">{n.label}</span>
          {#if n.id==='tasks'&&$data.preferences.reminders}<span class="nav-count">{Math.max(0,TASKS.length-$data.completedTasks.length)} reminders</span>{/if}
          {#if route===n.id}<span class="nav-active-dot"></span>{/if}
        </a>
        <button class="workspace-root-toggle" class:expanded={expanded[n.id]} aria-label={`${expanded[n.id]?'Collapse':'Expand'} ${n.label} sections`} aria-expanded={!!expanded[n.id]} aria-controls={`${mobile?'mobile':'desktop'}-${n.id}-sections`} onclick={()=>toggle(n.id)}><Icon name="down" size={15}/></button>
      </div>
    {:else}<a href="#/" class:active={route===''} aria-current={route===''?'page':undefined} onclick={ongo}><Icon name="home" size={19}/>Home{#if route===''}<span class="nav-active-dot"></span>{/if}</a>{/if}
  </nav>
  {#if n.id}
    <div class="workspace-root-children" id={`${mobile?'mobile':'desktop'}-${n.id}-sections`} hidden={!expanded[n.id]}>
      {#if n.id==='academics'}<AcademicNav {route} {params} {ongo}/>
      {:else if ['finances','profile'].includes(n.id)}<AccountNav {route} area={n.id} {ongo}/>
      {:else if ['tasks','admissions','quick-links'].includes(n.id)}<WorkspaceSectionNav area={n.id} {route} {ongo}/>
      {:else if n.id==='tools'}<nav class="academic-nav" aria-label="Other Tools sections"><div class="academic-nav-items">{#each TOOL_ITEMS as tool}<a href={tool.href} class:active={tool.href===`#/${route}`} aria-current={tool.href===`#/${route}`?'page':undefined} onclick={ongo}>{tool.label}</a>{/each}</div></nav>
      {:else if n.id==='services'}<nav class="academic-nav" aria-label="Academic services sections"><div class="academic-nav-items">{#each serviceSections as [category,label]}<a href={`#/services?category=${category}`} class:active={route==='services'&&params.get('category')===category} aria-current={route==='services'&&params.get('category')===category?'page':undefined} onclick={ongo}>{label}</a>{/each}</div></nav>{/if}
    </div>
  {/if}
{/each}
