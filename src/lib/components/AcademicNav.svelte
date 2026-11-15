<script>
  import { ACADEMIC_GROUPS, academicGroup } from '../academics.js';
  import Icon from './Icon.svelte';
  let { route, params = new URLSearchParams(), ongo = () => {} } = $props();
  let activeGroup = $derived(academicGroup(route));
  function current(item) {
    if (route !== 'classes') return item.href.split('?')[0] === `#/${route}`;
    const tab = params.get('tab') ?? 'find';
    return item.id === (tab === 'schedule' ? 'schedule' : tab === 'cart' ? 'cart' : 'class-search');
  }
</script>

<nav class="academic-nav" aria-label="My Academics sections">
  {#each ACADEMIC_GROUPS as group}
    <details class="academic-nav-group" open={activeGroup === group.id}>
      <summary class:current-group={activeGroup === group.id}>
        <Icon name={group.icon} size={17}/><span>{group.label}</span><Icon name="down" size={13}/>
      </summary>
      <div class="academic-nav-items">
        {#each group.items as item}
          <a href={item.href} class:active={current(item)} aria-current={current(item) ? 'page' : undefined} onclick={ongo}>{item.label}</a>
        {/each}
      </div>
    </details>
  {/each}
</nav>
