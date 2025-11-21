const date: string = '19 Nov 2025';

const lists: string[] = [
    'Setting up the project using Vite and native JavaScript/TypeScript.',
    'Created login layout, login button and integrate it with Google OAuth',
    'Created loading layout and integrate with Google Sheet API',
    'Created three layout to render animation'
];

const layout: HTMLDivElement = document.createElement<'div'>('div');

const mark: HTMLSpanElement = document.createElement<'span'>('span');
mark.style['display'] = 'block';
mark.style['fontSize'] = '16px';
mark.textContent = `v0 - ${date}`;

const ul: HTMLUListElement = document.createElement<'ul'>('ul');
ul.setAttribute('role', 'list');

lists.forEach(list => {
    const li: HTMLLIElement = document.createElement<'li'>('li');

    li.textContent = list;

    ul.appendChild(li);
});

layout.appendChild(mark);
layout.appendChild(ul);

layout.style['marginBottom'] = '24px';

export default layout;
