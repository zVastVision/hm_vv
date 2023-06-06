import { defineRule } from 'vee-validate';

export default defineNuxtPlugin(() => {
    defineRule('numeric', (value: string) => {
        if (isNaN(Number(value))) {
            return "This field must be a number"
        } else {
            return true
        }
    });

    defineRule('required', (value: string) => {
        if (!value || !value.length) {
            return 'This field is required';
        }

        return true;
    });
    

    defineRule('email', (value: string) => {
        // Field is empty, should pass
        if (!value || !value.length) {
            return true;
        }

        // Check if email
        if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
            return 'This field must be a valid email';
        }

        return true;
    });
    defineRule('minMax', (value: string, [min, max]: [number, number]) => {
        // The field is empty so it should pass
        if (!value || !value.length) {
            return true;
        }
        const numericValue = Number(value);
        if (numericValue < min) {
            return `This field must be greater than ${min}`;
        }

        if (numericValue > max) {
            return `This field must be less than ${max}`;
        }

        return true;
    });
})