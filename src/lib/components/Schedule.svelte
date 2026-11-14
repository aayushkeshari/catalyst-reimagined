<script>
import Icon from './Icon.svelte';import {formatTime,minutes,meetingLabel} from '../model.js';
let {courses=[],termId='spring-2027',compact=false}=$props();let view=$state('calendar');
const days=['Mon','Tue','Wed','Thu','Fri'];const hours=[8,9,10,11,12,13,14,15,16,17,18,19];
let blocks=$derived(courses.flatMap((c,i)=>c.meetings.flatMap(m=>m.days.map(day=>({...c,meeting:m,day,color:i%5})))));
</script>
<div class="schedule-widget" class:compact>
 <div class="schedule-toolbar"><div><span class="eyebrow">Weekly schedule</span><p class="muted small">{termId==='spring-2027'?'Spring 2027':'Fall 2026'} · Eastern time</p></div><div class="segmented" aria-label="Schedule display"><button class:active={view==='calendar'} aria-pressed={view==='calendar'} onclick={()=>view='calendar'}><Icon name="calendar" size={15}/>Week</button><button class:active={view==='list'} aria-pressed={view==='list'} onclick={()=>view='list'}><Icon name="list" size={15}/>List</button></div></div>
 {#if !courses.length}<div class="empty-state"><span class="empty-icon"><Icon name="calendar" size={28}/></span><h3>A little room for what’s next.</h3><p>Enrolled classes will appear here. Adding a class to your cart does not reserve a seat.</p><a class="button secondary" href="#/classes">Find your next class <Icon name="arrow" size={16}/></a></div>
 {:else}
  <div class="calendar-desktop" class:hide-calendar={view==='list'}>
   <div class="week-header"><span></span>{#each days as day}<span>{day}</span>{/each}</div>
   <div class="week-grid"><div class="time-axis">{#each hours as h}<span style:top={`${(h-8)*56}px`}>{h%12||12} {h<12?'AM':'PM'}</span>{/each}</div>
    {#each days as day}<div class="day-column">{#each hours as h}<div class="hour-line" style:top={`${(h-8)*56}px`}></div>{/each}{#each blocks.filter(b=>b.day===day) as b}<div class={`class-block course-color-${b.color}`} style:top={`${(minutes(b.meeting.start)-480)/60*56}px`} style:height={`${Math.max(34,(minutes(b.meeting.end)-minutes(b.meeting.start))/60*56-3)}px`} title={`${b.title} · ${meetingLabel(b)}`}><strong>{b.code}</strong><span>{formatTime(b.meeting.start)}–{formatTime(b.meeting.end)}</span><span>{b.meeting.room}</span></div>{/each}</div>{/each}
   </div>
   {#if courses.some(c=>!c.meetings.length)}<p class="async-note"><Icon name="info" size={16}/>Online asynchronous: {courses.filter(c=>!c.meetings.length).map(c=>c.code).join(', ')}</p>{/if}
  </div>
  <div class="schedule-agenda" class:always-show={view==='list'}>{#each courses as c,i}<div class="agenda-row"><span class={`course-marker course-color-${i%5}`}></span><div><strong>{c.code} <span class="muted">· {c.section}</span></strong><p>{c.title}</p></div><div><span>{meetingLabel(c)}</span><p class="muted">{c.meetings.map(m=>m.room).join(' · ')||'Complete work on your own schedule'}</p></div><span class="badge success">Enrolled</span></div>{/each}</div>
 {/if}
</div>
