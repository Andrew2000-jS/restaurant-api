export const $ = (input: string): HTMLElement | null => document.getElementById(input);
export const $A = (input: string): NodeList | null => document.querySelectorAll(input);