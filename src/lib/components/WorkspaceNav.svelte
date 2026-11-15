<script>
import AcademicNav from './AcademicNav.svelte';import AccountNav from './AccountNav.svelte';import Icon from './Icon.svelte';
let {route,params,mobile=false,ongo=()=>{}}=$props();
const roots=[{id:'',label:'Home',icon:'home'},{id:'academics',label:'My Academics',icon:'book'},{id:'finances',label:'My Finances',icon:'wallet'},{id:'profile',label:'My Profile',icon:'people'},{id:'services',label:'Academic services',icon:'grid'}];
let academic=$derived(route==='academics'||route.startsWith('academics/')||['classes','progress'].includes(route));
</script>
{#each roots as n}<nav class:mobile-navigation={mobile} aria-label={`${n.label} navigation`}><a href={`#/${n.id}`} class:active={route===n.id} aria-current={route===n.id?'page':undefined} onclick={ongo}><Icon name={n.icon} size={19}/>{n.label}{#if route===n.id}<span class="nav-active-dot"></span>{/if}</a></nav>{#if n.id==='academics'&&academic}<AcademicNav {route} {params} {ongo}/>{:else if ['finances','profile'].includes(n.id)&&(route===n.id||route.startsWith(n.id+'/'))}<AccountNav {route} area={n.id} {ongo}/>{/if}{/each}
