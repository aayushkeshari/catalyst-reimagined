<script>
  import { data,profile,updateData,notify,download } from '../lib/store.js';
  import { graduationDraft, OFFICIAL } from '../lib/academics.js';
  import { academicSummary } from '../lib/model.js';
  import Icon from '../lib/components/Icon.svelte';
  import Modal from '../lib/components/Modal.svelte';
  let { view }=$props();
  let draft=$derived($data.academics.graduationDraft);
  let summary=$derived(academicSummary($profile,$data));
  let name=$state($data.academics.graduationDraft?.name??$profile.name);
  let term=$state($data.academics.graduationDraft?.term??$profile.graduation);
  let ceremony=$state($data.academics.graduationDraft?.ceremony??false);
  let reviewed=$state(false);
  let errors=$state([]);
  let pending=$state(null);
  function review(){const result=graduationDraft({name,term,ceremony,reviewed});errors=result.errors??[];if(result.ok)pending=result.draft;}
  function save(){updateData({...$data,academics:{...$data.academics,graduationDraft:pending}});pending=null;notify('Graduation draft saved locally. No application was submitted to UC.');}
</script>
{#if view==='apply-graduate'}
  <div class="academic-resource-layout"><section class="panel padded academic-copy"><h2>Prepare your application</h2><p>Confirm your program and graduation term, then review the information you want to use. This saves a browser-local draft; the official application is completed through UC.</p>
    <dl class="academic-definition"><div><dt>Academic career</dt><dd>Undergraduate</dd></div><div><dt>Degree program</dt><dd>{$profile.plan.program.degree} · {$profile.major}</dd></div><div><dt>College</dt><dd>{$profile.college}</dd></div></dl>
    <form class="academic-form" onsubmit={e=>{e.preventDefault();review();}}><label>Diploma name to review<input autocomplete="off" bind:value={name} maxlength="100"/></label><label>Graduation term<select bind:value={term}>{#each [...new Set([$profile.graduation,...['Spring','Summer','Fall'].map(season=>`${season} ${$profile.graduation.split(' ')[1]}`)])] as t}<option>{t}</option>{/each}</select></label><label class="checkbox-label"><input type="checkbox" bind:checked={ceremony}/>I plan to attend commencement.</label><label class="checkbox-label"><input type="checkbox" bind:checked={reviewed}/>I reviewed the sample program and understand this saves a local draft.</label>{#if errors.length}<div class="notice warning-notice" role="alert"><ul>{#each errors as error}<li>{error}</li>{/each}</ul></div>{/if}<button class="button primary" type="submit">Review application draft <Icon name="arrow" size={16}/></button></form>
  </section><aside class="panel padded academic-copy"><h3>Before you apply</h3><p>Review your remaining requirements with your advisor and check UC’s application deadline.</p><p><strong>{Math.max(0,summary.minimum-summary.earned)} credits</strong> are not yet earned in this sample plan. Saving a draft does not certify degree completion.</p><a class="academic-related" href="#/academics/degree-audit">Review degree audit <Icon name="arrow" size={16}/></a><a class="academic-related" href="#/academics/graduation-deadlines">Application deadlines <Icon name="arrow" size={16}/></a><a class="button secondary spaced" href={OFFICIAL.graduation} target="_blank" rel="noreferrer">Official application instructions <Icon name="external" size={15}/></a></aside></div>
  {#if draft}<div class="notice spaced" role="status"><Icon name="check"/><p>Local draft saved for {draft.term}. <a class="text-link" href="#/academics/graduation-status">View graduation status <Icon name="arrow" size={15}/></a></p></div>{/if}
{:else}
  <section class="panel padded academic-copy"><div class="section-heading"><div><span class="eyebrow">{$profile.plan.program.degree}</span><h2>{$profile.major}</h2></div><span class="badge neutral">Degree not conferred</span></div>
    <ol class="academic-timeline"><li class:complete={!!draft}><strong>{draft?'Local application draft saved':'Prepare your graduation application'}</strong><p>{draft?`${draft.term} · saved ${new Date(draft.savedAt).toLocaleString()}`:'No graduation application draft is saved for this sample profile.'}</p></li><li><strong>Official application submission</strong><p>Not connected. Check the official Catalyst status for an application received by UC.</p></li><li><strong>Degree certification</strong><p>Not awarded in the sample record. Completed requirements require university review.</p></li><li><strong>Diploma availability</strong><p>No electronic diploma has been issued in this prototype.</p></li></ol>
    {#if draft}<dl class="academic-definition"><div><dt>Diploma name draft</dt><dd>{draft.name}</dd></div><div><dt>Graduation term</dt><dd>{draft.term}</dd></div><div><dt>Ceremony preference</dt><dd>{draft.ceremony?'Plans to attend':'Not selected'}</dd></div></dl><div class="button-row"><a class="button secondary" href="#/academics/apply-graduate">Edit local draft</a><button class="button secondary" onclick={()=>download('graduation-draft.json',JSON.stringify({notice:'Local sample draft — not submitted to UC',...draft},null,2),'application/json')}><Icon name="download" size={16}/>Download draft</button></div>{:else}<a class="button primary" href="#/academics/apply-graduate">Prepare a draft <Icon name="arrow" size={16}/></a>{/if}
    <a class="text-link spaced" href={OFFICIAL.catalyst} target="_blank" rel="noreferrer">Check official graduation status <Icon name="external" size={15}/></a>
  </section>
{/if}
{#if pending}<Modal title="Review your graduation draft" onclose={()=>pending=null}><dl class="academic-definition"><div><dt>Name</dt><dd>{pending.name}</dd></div><div><dt>Term</dt><dd>{pending.term}</dd></div><div><dt>Commencement</dt><dd>{pending.ceremony?'Plans to attend':'Not selected'}</dd></div></dl><p class="muted">This saves a draft only. No application fee is collected and no graduation application is submitted to UC.</p><div class="modal-actions"><button class="button secondary" onclick={()=>pending=null}>Back to edit</button><button class="button primary" onclick={save}>Save application draft</button></div></Modal>{/if}
