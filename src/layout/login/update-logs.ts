import v0Layout from './v0.ts';
import v1Layout from './v1.ts';
import v1_01Layout from './v1_01.ts';
import v1_02Layout from './v1_02.ts';

let isOpen = false;

const layout = document.createElement('div');
layout.setAttribute('id', 'update-logs');
layout.innerHTML = `
    <div id="wrapper">
        <div id="header">
            <div style="align-items: center; display: flex; flex-direction: row; flex-grow: 1; flex-shrink: 1; justify-content: space-between; height: 100%; width: 100%;">
                <span style="font-size: 24px; font-weight: bold; padding-left: 12px;">Update logs</span>

                <button
                id="close-update"
                type="button">
                    <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                        fill="#fff"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
                    </svg>
                </button>
            </div>
        </div>

        <div id="contents">
            <span style="display: block; font-size: 20px; font-weight: bold; margin-bottom: 12px;">Current version: 1.02</span>

            <hr style="border-top: 1px solid gray; margin: 12px 0 24px;" />

            <!-- version -->
        </div>
    </div>
`;

function toggle(value: boolean): void {
    if (value) {
        document.body.appendChild(layout);

        const closeButton = document.getElementById('close-update');

        closeButton?.addEventListener('click', () => toggle(false));
        
        const contents = document.getElementById('contents');
        contents?.appendChild(v1_02Layout);
        contents?.appendChild(v1_01Layout);
        contents?.appendChild(v1Layout);
        contents?.appendChild(v0Layout);

        console.log('Window should insert update layout');
    } else {
        document.getElementById('update-logs')?.remove();

        console.log('Removing update layout');
    }

    isOpen = value;
};

export {
    isOpen,
    toggle,
};
