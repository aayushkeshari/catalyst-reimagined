<script>
  import { tick } from 'svelte';
  import { data, profile, updateData, download, notify } from '../lib/store.js';
  import { academicRows, recordTerms, termLabel, termGrades, repeatedPairs, reportHTML, OFFICIAL } from '../lib/academics.js';
  import Icon from '../lib/components/Icon.svelte';
  let { view } = $props();
  let selectedTerm = $state('fall-2026');
  let shownTerm = $state('');
  let gradeHeading = $state(null);
  async function showGrades(){shownTerm=selectedTerm;await tick();gradeHeading?.focus();}
  let query = $state('');
  let historyTerm = $state('all');
  let historyStatus = $state('all');
  let policyRead = $state(false);
  let continueReplacement = $state(false);
  let reportType = $state('Enrollment Letter');
  let preview = $state(null);
  let reportsOpen = $state(false);
  let rows = $derived(academicRows($profile,$data));
  let terms = $derived(recordTerms($profile,$data));
  let grades = $derived(termGrades($profile,$data,shownTerm));
  let filtered = $derived(rows.filter(r=>(historyTerm==='all'||r.term===historyTerm)&&(historyStatus==='all'||r.status===historyStatus)&&`${r.code} ${r.title}`.toLowerCase().includes(query.toLowerCase())));
  let pairs = $derived(repeatedPairs($profile));
  let saved = $derived($data.academics.reports);
  function generate() {
    const type=view==='unofficial-record'?'Unofficial Record':reportType;
    if(type==='Degree Letter') return;
    const createdAt=new Date().toISOString();
    preview={id:`SAMPLE-${Date.now()}`,type,term:selectedTerm,createdAt};
    updateData({...$data,academics:{...$data.academics,reports:[preview,...saved].slice(0,20)}});
    notify('Your sample report is ready.');
  }
  function saveReport(report) {
    download(`catalyst-${report.id}.html`,reportHTML($profile,$data,report),'text/html');
    notify('Sample report downloaded. Open it in a browser to print or save as PDF.');
  }
  function exportHistory() {
    const quote=v=>`"${String(v).replaceAll('"','""')}"`;
    download('sample-course-history.csv',[['Term','Course','Title','Credits','Grade','Status'],...filtered.map(r=>[termLabel(r.term),r.code,r.title,r.credits,r.grade,r.status])].map(row=>row.map(quote).join(',')).join('\n'),'text/csv');
  }
</script>

{#if view==='grades'}
  {#if !shownTerm}<section class="panel padded">
    <div class="section-heading"><div><h2>Select a term</h2><p class="muted small">Undergraduate · University of Cincinnati</p></div><Icon name="calendar"/></div>
    <fieldset class="term-picker"><legend class="sr-only">Grade report term</legend>
      {#each terms as term}<label class:selected={selectedTerm===term}><input type="radio" name="grade-term" value={term} bind:group={selectedTerm}/><span><strong>{termLabel(term)}</strong><small>Undergraduate</small></span><span class="muted small">University of Cincinnati</span></label>{/each}
    </fieldset>
    <button class="button primary spaced" onclick={showGrades}>Continue <Icon name="arrow" size={16}/></button>
  </section>{/if}
  {#if shownTerm}<section class="panel padded spaced" aria-live="polite"><div class="section-heading"><div><h2 tabindex="-1" bind:this={gradeHeading}>{termLabel(shownTerm)} grades</h2><p class="muted small">{grades.earned} earned credits · Term GPA: {grades.gpa??'Not available'}</p></div><div class="button-row"><span class="badge neutral">Sample record</span><button class="button secondary" onclick={()=>shownTerm=''}>Change term</button></div></div>
    {#if grades.rows.length}<div class="table-scroll"><table class="academic-table"><thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th>Status</th></tr></thead><tbody>{#each grades.rows as r}<tr><td><strong>{r.code}</strong><small>{r.title}</small></td><td>{r.credits}</td><td>{r.grade}</td><td><span class="badge" class:success={r.status==='Graded'} class:neutral={r.status!=='Graded'}>{r.status}</span></td></tr>{/each}</tbody></table></div>{:else}<div class="empty-state"><h3>No grades available for this term.</h3><p>Future enrollment and planned classes do not have final grades.</p></div>{/if}
    <p class="fine-print">IP means in progress. A dash means a final grade is not available. Term GPA is calculated from graded sample coursework; it is separate from the profile’s presentation GPA.</p>
  </section>{/if}
{:else if view==='milestones'}
  <section class="panel empty-state"><span class="empty-icon"><Icon name="check" size={28}/></span><h2>No current milestone information found.</h2><p>This sample academic record has no recorded milestones. Personal tasks and graduation requirements are available separately.</p><div class="button-row"><a class="button secondary" href="#/tasks">Tasks & reminders</a><a class="button primary" href="#/academics/degree-audit">View degree requirements</a></div></section>
{:else if view==='course-history'}
  <div class="academic-controls"><div class="search-box"><Icon name="search"/><input type="search" aria-label="Search course history" placeholder="Course code or title" bind:value={query}/></div><label>Term<select bind:value={historyTerm}><option value="all">All terms</option>{#each terms as term}<option value={term}>{termLabel(term)}</option>{/each}</select></label><label>Status<select bind:value={historyStatus}><option value="all">All coursework</option><option>Graded</option><option>In progress</option><option>Enrolled</option></select></label><button class="button secondary" onclick={exportHistory}><Icon name="download" size={16}/>Export CSV</button></div>
  <section class="panel padded"><div class="section-heading"><h2>Your coursework</h2><span role="status" class="muted small">{filtered.length} records</span></div>
    {#if filtered.length}<div class="table-scroll"><table class="academic-table"><thead><tr><th>Term</th><th>Course</th><th>Credits</th><th>Grade</th><th>Status</th></tr></thead><tbody>{#each filtered as r}<tr><td>{termLabel(r.term)}</td><td><strong>{r.code}</strong><small>{r.title}</small></td><td>{r.credits}</td><td>{r.grade}</td><td>{r.status}</td></tr>{/each}</tbody></table></div>{:else}<div class="empty-state"><h3>No courses match these filters.</h3><button class="button secondary" onclick={()=>{query='';historyTerm='all';historyStatus='all';}}>Clear filters</button></div>{/if}
  </section>
{:else if view==='grade-replacement'}
  <section class="panel padded academic-copy"><h2>Grade Replacement Affirmation</h2><p>Review the university’s policy before pairing repeated course attempts. Both attempts remain in the record; an approved replacement changes how the GPA is calculated.</p><p>Eligibility, exclusions, course limits, and the effect of a lower repeat grade must be checked with the Registrar. This prototype does not submit a replacement or modify your grades.</p><a class="text-link" href={OFFICIAL.replacement} target="_blank" rel="noreferrer">Read the UC Grade Replacement Policy <Icon name="external" size={15}/></a><label class="checkbox-label spaced"><input type="checkbox" bind:checked={policyRead}/>I have reviewed the policy and want to check this sample record.</label><button class="button primary spaced" disabled={!policyRead} onclick={()=>continueReplacement=true}>Continue <Icon name="arrow" size={16}/></button></section>
  {#if continueReplacement}<section class="panel padded spaced" aria-live="polite"><h2>Repeated course attempts</h2>{#if pairs.length}{#each pairs as pair}<div class="detail-section"><div><strong>{pair.code}</strong><p class="muted small">{termLabel(pair.original.term)} · {pair.original.grade} → {termLabel(pair.repeated.term)} · {pair.repeated.grade}</p><p class="small">Potential pair · Registrar review required</p></div></div>{/each}{:else}<div class="empty-state"><h3>No completed repeat pairs in this sample record.</h3><p>A grade-replacement request requires a qualifying original and repeat attempt. An unrelated course cannot be substituted.</p></div>{/if}<a href={OFFICIAL.catalyst} target="_blank" rel="noreferrer" class="button secondary">Open official Catalyst <Icon name="external" size={15}/></a></section>{/if}
{:else if view==='unofficial-record'||view==='enrollment-letter'}
  <section class="panel padded"><h2>{view==='unofficial-record'?'Request a sample report':'Choose your letter'}</h2><div class="report-form academic-controls spaced"><label>Academic Institution<select><option>University of Cincinnati</option></select></label><label>Report Type<select value={view==='unofficial-record'?'Unofficial Record':reportType} onchange={e=>reportType=e.currentTarget.value}>{#if view==='unofficial-record'}<option>Unofficial Record</option>{:else}<option>Enrollment Letter</option><option>Degree Letter</option>{/if}</select></label>{#if view==='enrollment-letter'}<label>Term<select bind:value={selectedTerm}><option value="fall-2026">Fall 2026</option><option value="spring-2027">Spring 2027</option></select></label>{/if}<button class="button primary" disabled={view==='enrollment-letter'&&reportType==='Degree Letter'} onclick={generate}>View Report <Icon name="file" size={16}/></button></div>
  {#if view==='enrollment-letter'&&reportType==='Degree Letter'}<p role="status" class="warning-text spaced">No degree has been awarded in this sample record. An official degree letter requires a conferred degree.</p>{/if}
  <p class="fine-print">Reports use the active sample profile and are not official transcripts or certifications. Download a report to print it or save it as a PDF.</p>{#if view==='enrollment-letter'}<a class="text-link spaced" href={OFFICIAL.verification} target="_blank" rel="noreferrer">Official enrollment / degree verification <Icon name="external" size={15}/></a>{/if}</section>
  {#if preview}<section class="panel padded spaced report-preview" aria-live="polite"><div class="section-heading"><div><span class="eyebrow">Sample · not an official document</span><h2>{preview.type}</h2><p class="muted small">{$profile.name} · {new Date(preview.createdAt).toLocaleString()}</p></div><button class="button secondary" onclick={()=>saveReport(preview)}><Icon name="download" size={16}/>Download / print</button></div>
    {#if preview.type==='Unofficial Record'}<div class="table-scroll"><table class="academic-table"><thead><tr><th>Term</th><th>Course</th><th>Credits</th><th>Grade</th></tr></thead><tbody>{#each rows as r}<tr><td>{termLabel(r.term)}</td><td><strong>{r.code}</strong><small>{r.title}</small></td><td>{r.credits}</td><td>{r.grade}</td></tr>{/each}</tbody></table></div>{:else}<p>{$profile.name} has {($data.enrolledByTerm[preview.term]??[]).reduce((n,c)=>n+c.credits,0)} credits in the sample {termLabel(preview.term)} schedule.</p><ul class="academic-list">{#each $data.enrolledByTerm[preview.term]??[] as c}<li>{c.code} — {c.title} · {c.credits} credits</li>{/each}</ul>{/if}</section>{/if}
  <section class="panel padded spaced"><button class="text-link" aria-expanded={reportsOpen} onclick={()=>reportsOpen=!reportsOpen}>View All Requested Reports ({saved.length}) <Icon name="down" size={16}/></button>{#if reportsOpen}<p class="fine-print">Saved requests reopen against the current sample record.</p>{#each saved as r}<div class="detail-section"><div><strong>{r.type}</strong><p class="muted small">{new Date(r.createdAt).toLocaleString()} · {r.id}</p></div><button class="button secondary" onclick={()=>preview=r}>View Report</button></div>{:else}<p class="muted spaced">No sample reports requested yet.</p>{/each}{/if}</section>
{/if}
