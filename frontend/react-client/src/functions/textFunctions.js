function isValidEmail(email) {
    const emailPattern = /^.+@.+$/;
    return emailPattern.test(email);
}

export { isValidEmail };