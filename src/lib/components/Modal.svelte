<script>
import {onMount} from 'svelte';import Icon from './Icon.svelte';
let {title,onclose,children,wide=false}=$props();let dialog;
onMount(()=>{dialog.showModal();dialog.querySelector('[data-initial-focus]')?.focus();return ()=>dialog?.close();});
</script>
<dialog bind:this={dialog} class:wide aria-label={title} oncancel={(e)=>{e.preventDefault();onclose();}} onclick={(e)=>{if(e.target===dialog)onclose();}} onkeydown={(e)=>{if(e.key==='Escape'){e.preventDefault();onclose();}}}>
  <div class="modal-head"><h2>{title}</h2><button class="icon-button" aria-label="Close dialog" onclick={onclose}><Icon name="close"/></button></div>
  <div class="modal-body">{@render children()}</div>
</dialog>
