'use strict';
import './style.css';

const layout = document.createElement('div');
layout.setAttribute('id', 'login');
layout.innerHTML = `
    <div style="max-width: 480px; margin: 0 auto; padding: 0 12px;">
        <h1 style="font-size: 32px; font-weight: semibold; text-align: center;">Hi Lisa!</h1>

        <div style="margin-bottom: 12px; text-align: center;">
            Nice to meet you! I'm Christian Delvianto</span>
            <br />
            Before you proceed, please kindly sign in with Google to access the site.
        </div>

        <button
        id="button-login"
        type="button">
            <span style="align-items: center; display: flex; flex-grow: 0; flex-shrink: 0; height: 40px; justify-content: center; margin-left: 8px; width: 40px;">
                <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                    <path
                    fill="#fff"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81" />
                </svg>
            </span>

            <span style="display: block; flex-grow: 1; flex-shrink: 1; font-size: 16px; font-weight: bold; text-align: center; margin-right: 24px;">Sign in with Google</span>
        </button>

        <hr style="border-top: 1px solid gray; margin: 24px 0;" />

        <div id="social">
            <a
            target="_blank"
            rel="nofollow"
            href="https://www.linkedin.com/in/christian-delvianto-4067ab362/">
                <span style="align-items: center; display: flex; flex-grow: 0; flex-shrink: 0; height: 40px; justify-content: center; margin-left: 8px; width: 40px;">
                    <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                        fill="#fff"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                    </svg>
                </span>

                <span style="display: block; flex-grow: 1; flex-shrink: 1; font-size: 16px; font-weight: bold; text-align: center; margin-right: 24px;">Connect on LinkedIn</span>
            </a>

            <a href="mailto:gwein.tjiang@gmail.com">
                <span style="align-items: center; display: flex; flex-grow: 0; flex-shrink: 0; height: 40px; justify-content: center; margin-left: 8px; width: 40px;">
                    <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                        <path
                        fill="#fff"
                        d="M21 12.13c-.15.01-.29.06-.39.17l-1 1l2.05 2l1-1c.22-.21.22-.56 0-.77l-1.24-1.23a.56.56 0 0 0-.38-.17m-2 1.75L13 19.94V22h2.06l6.06-6.07M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v-.89l8.24-8.22c.47-.49 1.12-.76 1.8-.76c.34 0 .68.06 1 .19V6c0-1.12-.92-2-2.04-2m0 4l-8 5l-8-5V6l8 5l8-5" />
                    </svg>
                </span>

                <span style="display: block; flex-grow: 1; flex-shrink: 1; font-size: 16px; font-weight: bold; text-align: center; margin-right: 24px;">Send an email</span>
            </a>
        </div>
    </div>
`;

export default layout;
