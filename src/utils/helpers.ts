export const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

export const genId = () => Date.now() + '-' + Math.random().toString(36).slice(2, 11);
