import { base } from '$app/paths';
import { goto } from '$app/navigation';
import { writable } from 'svelte/store';
import { get } from 'svelte/store';

const password = writable(localStorage.getItem('password'));

export function handlePasswordSubmit(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	const pw = data.get('password');
	password.set(pw);
	if (verifyLoginStatus()) {
		localStorage.setItem('password', pw);
		goto(base);
	} else {
		alert('Incorrect password');
	}
	event.target.reset();
}

export function verifyLoginStatus() {
	return getUserPassword() === getRealPassword();
}

export function handleLogout() {
	localStorage.setItem('password', '');
	password.set('');
	goto(`${base}/login`);
}

export function getUserPassword() {
	return get(password);
}

export function getRealPassword() {
	return import.meta.env.VITE_PASSWORD;
}
