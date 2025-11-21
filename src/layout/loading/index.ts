'use strict';
import './style.css';

// Layout
const layout: HTMLDivElement = document.createElement<'div'>('div');
layout.setAttribute('id', 'loading');
layout.innerHTML = `
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <span style="display: block; margin-top: 8px; text-align: center;">Loading data...</span>
`;

export default layout;
