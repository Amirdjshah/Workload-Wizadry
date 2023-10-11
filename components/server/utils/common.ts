// Function to generate a unique verification code (you can use a library)
export function generateUniqueVerificationCode() {
    return Buffer.from(Math.random().toString()).toString("base64").slice(0, 8);
}
