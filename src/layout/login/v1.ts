const date: string = '19 Nov 2025';

const lists: string[] = [
    'Created table mode',
    'Created sphere mode',
    'Created helix (double helix) mode',
    'Created grid mode',
    'Deployed on Vercel'
];

const layout: HTMLDivElement = document.createElement<'div'>('div');

const mark: HTMLSpanElement = document.createElement<'span'>('span');
mark.style['display'] = 'block';
mark.style['fontSize'] = '16px';
mark.textContent = `v1.0 - ${date}`;

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
