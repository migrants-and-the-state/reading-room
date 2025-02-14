import { browser } from '$app/environment';
import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const prerender = true;
export const ssr = false;

export async function load({ url }) {
	let password;
	let loggedIn;
	const onLoginPage = url.pathname.includes('login');

	if (browser) {
		password = localStorage.getItem('password');
		loggedIn = password === import.meta.env.VITE_PASSWORD;
		if (!loggedIn && !onLoginPage) {
			redirect(302, `${base}/login`);
		}
	}
}
