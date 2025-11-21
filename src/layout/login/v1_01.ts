const date: string = '20 Nov 2025';

const lists: string[] = [
    'Created tetrahedron mode',
];

const layout: HTMLDivElement = document.createElement<'div'>('div');

const mark: HTMLSpanElement = document.createElement<'span'>('span');
mark.style['display'] = 'block';
mark.style['fontSize'] = '16px';
mark.textContent = `v1.01 - ${date}`;

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
