'use strict';
import './style.css';

const layout = document.createElement('div');
layout.setAttribute('id', 'login');
layout.innerHTML = `
    <div style="max-width: 480px; margin: 0 auto; padding: 0 12px;">
        <h1 style="font-size: 32px; font-weight: semibold; text-align: center;">Hi welcome!</h1>

        <span style="display: block; font-size: 16px; margin-bottom: 12px; text-align: center;">Before you proceed, please kindly log in with Google to access the site.</span>

        <!-- <div
        data-callback="handleCredentialResponse"
        data-client_id="901853246026-cspblughjkgk7q222nha79hm8ci6iffk.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        id="g_id_onload"></div>

        <div
        data-type="standard"
        class="g_id_signin"></div> -->

        <button
        id="button-login"
        type="button"
        style="background-color: transparent; border: 1px solid gray; border-radius: 24px; display: block; font-size: 16px; padding: 12px 0; width: 100%;">Sign in with Google</button>
    </div>

    <div style="align-items: center; bottom: 12px; display: flex; flex-direction: column; gap: 12px; position: absolute; width: 100%;">
        <span style="display: block; font-size: 14px;">By Christian Delvianto</span>

        <a
        href="mailto:gwein.tjiang@gmail.com"
        style="background-color: rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(127, 255, 255, 0.25);
        border-radius: 16px;
        box-shadow: 0 0 12px rgba(127, 255, 255, 0.5);
        padding: 6px 12px;
        text-decoration: none;">Send an email</a>
    </div>
`;

export default layout;
