<script>
  import { data,profile } from '../lib/store.js';
  import { ACADEMIC_GROUPS, academicPage, ACADEMIC_RESOURCES, OFFICIAL } from '../lib/academics.js';
  import { academicSummary } from '../lib/model.js';
  import Icon from '../lib/components/Icon.svelte';
  import AcademicRecords from './AcademicRecords.svelte';
  import AcademicGraduation from './AcademicGraduation.svelte';
  import AcademicPlanning from './AcademicPlanning.svelte';
  import AcademicResource from './AcademicResource.svelte';
  import Progress from './Progress.svelte';
  let { route }=$props();
  let page=$derived(academicPage(route));
  let view=$derived(route.split('/')[1]??'overview');
  let summary=$derived(academicSummary($profile,$data));
</script>
{#if view==='overview'}
  <div class="page-heading"><div><p class="eyebrow">Your academic home</p><h1>My Academics</h1><p>Your class schedule, academic profile, records, and path to graduation.</p></div></div>
  <div class="academic-overview-grid"><div class="academic-overview-main"><section class="panel academic-overview-card"><div class="academic-panel-title"><Icon name="calendar"/><h2>Class Schedule</h2></div><div class="padded academic-copy"><h3>Your semester, in one place</h3><p>View confirmed classes and meeting details, then plan your next term.</p><a class="button primary" href="#/classes?tab=schedule&term=fall-2026">View Class Schedule <Icon name="arrow" size={16}/></a><a class="text-link spaced" href="#/academics/term-information">Term information & help <Icon name="arrow" size={15}/></a></div></section>
    <div class="academic-section-directory spaced">{#each ACADEMIC_GROUPS as group}<section class="panel padded"><div class="section-heading"><h2>{group.label}</h2><Icon name={group.icon} size={20}/></div>{#each group.items as item}<a class="academic-directory-link" href={item.href}><span>{item.label}</span><Icon name="arrow" size={15}/></a>{/each}</section>{/each}</div>
  </div><aside class="panel academic-overview-card academic-profile"><div class="academic-panel-title"><Icon name="people"/><h2>Academic Profile</h2></div><div class="padded academic-copy"><div class="section-heading"><h3>Your Current Program</h3><span class="badge neutral">Undergraduate</span></div>{#each $profile.programs??[{program:'CEAS Baccalaureate',plan:$profile.major}] as program}<div class="program-block"><span class="eyebrow">Academic Program</span><h3>{program.program}</h3><span class="muted small">Academic Plan</span><p>{program.plan}</p></div>{/each}
    <dl class="academic-definition"><div><dt>Cumulative GPA</dt><dd>{summary.gpa??'Not available'}</dd></div><div><dt>Academic Load</dt><dd>{summary.underway>=12?'Full-Time':'Part-Time'}</dd></div><div><dt>Level</dt><dd>{$profile.year}</dd></div><div><dt>Earned Credits</dt><dd>{summary.earned}</dd></div><div><dt>In Progress</dt><dd>{summary.underway}</dd></div></dl><div class="advising-contact"><h3>Academic Advisors</h3><p>{$profile.advisors?.academic?.name??'Academic advising team'}</p><p class="muted small">{$profile.advisors?.academic?.role??$profile.college}</p>{#if $profile.advisors?.academic?.email}<a class="text-link" href={`mailto:${$profile.advisors.academic.email}`}>{$profile.advisors.academic.email}</a>{/if}</div><div class="advising-contact"><h3>Other Student Advisors</h3><p>{$profile.advisors?.coop?.name??'Co-op advising team'}</p><p class="muted small">Co-op Advisor</p>{#if $profile.advisors?.coop?.email}<a class="text-link" href={`mailto:${$profile.advisors.coop.email}`}>{$profile.advisors.coop.email}</a>{/if}</div><a class="button primary full" href="#/academics/bearcat-network">My Bearcat Network <Icon name="arrow" size={16}/></a><p class="fine-print">Use My Bearcat Network to confirm your advising contacts and schedule an appointment.</p></div></aside></div>
{:else if page}
  <nav class="academic-breadcrumb" aria-label="Academic breadcrumb"><a href="#/academics">My Academics</a><Icon name="chevron" size={12}/><span>{page.group}</span></nav>
  {#if view==='degree-audit'}<Progress title="Get My Degree Audit"/>
  {:else}<div class="page-heading"><div><p class="eyebrow">{page.group}</p><h1>{page.label}</h1><p>{page.description}</p></div></div>
    {#if ACADEMIC_RESOURCES[view]}<AcademicResource {view}/>
    {:else if ['apply-graduate','graduation-status'].includes(view)}<AcademicGraduation {view}/>
    {:else if ['grades','milestones','course-history','grade-replacement','unofficial-record','enrollment-letter'].includes(view)}<AcademicRecords {view}/>
    {:else}<AcademicPlanning {view}/>{/if}
  {/if}
{:else}<section class="panel empty-state"><h1>Academic page not found.</h1><a class="button primary" href="#/academics">Back to My Academics</a></section>{/if}
