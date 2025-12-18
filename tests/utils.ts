export function generateRandomEmail(): string {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '') + now.getMilliseconds().toString().padStart(3, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `testuser_${timestamp}_${random}@example.com`;
}

export function generateTestPassword(): string {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `Test@${timestamp}`;
}