<script>
  import { ACADEMIC_RESOURCES, ACADEMIC_PAGES } from '../lib/academics.js';
  import Icon from '../lib/components/Icon.svelte';
  let { view }=$props();
  let resource=$derived(ACADEMIC_RESOURCES[view]);
</script>
<div class="academic-resource-layout"><section class="panel padded academic-copy"><span class="tile-icon"><Icon name={view.includes('transcript')?'file':view.includes('calendar')?'calendar':'info'} size={24}/></span><h2>{resource.title}</h2><p>{resource.intro}</p><ol class="academic-steps">{#each resource.steps as step}<li>{step}</li>{/each}</ol><div class="button-row">{#each resource.links as link,i}<a class="button" class:primary={i===0} class:secondary={i!==0} href={link[1]} target="_blank" rel="noreferrer">{link[0]}<Icon name="external" size={15}/></a>{/each}</div><p class="fine-print">{resource.note}</p></section><aside class="panel padded academic-copy"><h3>Keep your place</h3><p>Official services open in a new tab. You can return here to continue planning.</p>{#each resource.related??['bearcat-network'] as id}{@const p=ACADEMIC_PAGES.find(p=>p.id===id)}<a class="academic-related" href={p.href}><span>{p.label}</span><Icon name="arrow" size={16}/></a>{/each}<a class="academic-related" href="#/academics"><span>Back to My Academics</span><Icon name="arrow" size={16}/></a></aside></div>
