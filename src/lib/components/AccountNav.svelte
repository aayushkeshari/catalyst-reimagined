<script>
import {FINANCE_GROUPS,PROFILE_PAGES} from '../student-account.js';import Icon from './Icon.svelte';
let {route,area,ongo=()=>{}}=$props();
</script>
<nav class="academic-nav" aria-label={area==='finances'?'My Finances sections':'My Profile sections'}>
{#if area==='finances'}{#each FINANCE_GROUPS as group}<details class="academic-nav-group" open={group.items.some(x=>x.href===`#/${route}`)}><summary><Icon name={group.icon} size={17}/><span>{group.label}</span><Icon name="down" size={13}/></summary><div class="academic-nav-items">{#each group.items as item}<a href={item.href} class:active={item.href===`#/${route}`} aria-current={item.href===`#/${route}`?'page':undefined} onclick={ongo}>{item.label}</a>{/each}</div></details>{/each}
{:else}<div class="academic-nav-items profile-nav-items">{#each PROFILE_PAGES as item}<a href={item.href} class:active={item.href===`#/${route}`||(route==='profile'&&item.id==='personal')} aria-current={item.href===`#/${route}`||(route==='profile'&&item.id==='personal')?'page':undefined} onclick={ongo}>{item.label}</a>{/each}</div>{/if}
</nav>
