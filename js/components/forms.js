import { SELECTORS } from '../core/constants.js';

export function initForms() {
    const forms = document.querySelectorAll(SELECTORS.REMOTE_FORM);

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmit(form);
        });
    });
}

async function handleFormSubmit(form) {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;

    const originalText = button.textContent;

    try {
        // 1. Show Loading State
        button.disabled = true;
        button.textContent = 'Saving...';

        // 2. Gather Data
        const formData = new FormData(form);

        // 3. Fake API Call (Replace with your actual endpoint)
        console.log('Sending data:', Object.fromEntries(formData));
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 4. Success Feedback
        alert('Changes saved successfully!');

    } catch (error) {
        console.error('Form Error:', error);
    } finally {
        // 5. Reset Button
        button.disabled = false;
        button.textContent = originalText;
    }
}