'use strict';
import loginLayout from './layout/login/index.ts';
import { isOpen, toggle } from './layout/login/update-logs.ts';
import loadingLayout from './layout/loading/index.ts';
import { addNavigation, init, users, windowResize } from './layout/three/index.ts';

declare global {
    const google: any;
}

interface UserObject {
    id: number,
    name: string | '',
    age: number | 0,
    interest: string | '',
    country: string | '',
    photo: string | '',
    net_worth: number | 0
}

// Sheet data
const range = encodeURIComponent('Data Template!A1:Z999');
const sheetId: string = '1X-ydVb3OPG1lVaNq6f0VqUlEwLgU2ZqWWhnRy2NOuQw';
const url: string = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`;

// Google token client
const tokenClient = await google!.accounts.oauth2.initTokenClient({
    client_id: '901853246026-cspblughjkgk7q222nha79hm8ci6iffk.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    callback: (response: any): void => {
        console.log('response:', response);

        userAuthenticated(response.access_token);
    }
});

function requestAccessToken(): void {
    tokenClient.requestAccessToken({ prompt: '' });
}

async function userAuthenticated(accessToken: string): Promise<void> {
    // Remove login layout
    document.getElementById('login')?.remove();

    // Start loading
    document.body.appendChild(loadingLayout);

    // Fetch data
    await fetchData(accessToken);
};

async function fetchData(accessToken: string): Promise<void> {
    // const res = await fetch('/data.csv');
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const data = await res.json();
    const rows = data.values;

    if (!rows || rows.length < 2) return;

    const header = rows[0];
    const body = rows.slice(1);

    for (let i: number = 0; i < body.length; i++) {
        const row = body[i];

        if (row.length < header.length) continue;

        const user: UserObject = {
          id: i + 1,
          name: row[0] ?? '',
          photo: row[1] ?? '',
          age: parseInt(row[2]) || 0,
          country: row[3] ?? '',
          interest: (row[4] ?? '').toLowerCase(),
          net_worth: parseFloat(row[5].replace(/[^\d.-]/g, '')) || 0
        };

        users.push(user);
    }

    renderThreeLayout();
};

function renderThreeLayout(): void {
    document.getElementById('loading')?.remove();

    const app = document.createElement('div');
    app.setAttribute('id', 'app');

    document.body.appendChild(app);

    init();

    // Add buttons
    addNavigation();

    // Attach window resize event
    window.addEventListener('resize', windowResize);
};

function startApp(): void {
    document.body.appendChild(loginLayout);

    // Add button event to login / authorize
    document.getElementById('button-login')?.addEventListener('click', requestAccessToken);

    document.getElementById('view-update')?.addEventListener('click', () => {
        console.log('isOpen value:', isOpen);
        
        toggle(!isOpen);
    });
}

document.addEventListener('DOMContentLoaded', startApp);
