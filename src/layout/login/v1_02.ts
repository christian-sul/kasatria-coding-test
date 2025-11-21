const date: string = '21 Nov 2025';

const lists: string[] = [
    'Fixed tetrahedron mode',
    'Created update logs'
];

const layout: HTMLDivElement = document.createElement<'div'>('div');

const mark: HTMLSpanElement = document.createElement<'span'>('span');
mark.style['display'] = 'block';
mark.style['fontSize'] = '16px';
mark.textContent = `v1.02 - ${date}`;

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
