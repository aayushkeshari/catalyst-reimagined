<script>import {icons} from '../icons.js';let {name,size=20,...rest}=$props();</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" {...rest}><path d={icons[name]??icons.grid}/></svg>
