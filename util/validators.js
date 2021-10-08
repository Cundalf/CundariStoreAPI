module.exports = {
    isGoodPassword: (value) => {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
        return regex.test(value);
    },
    phoneValidate: (input) => {
        const phone = input.replace(/\D/g, "");
        return /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(phone);
    },
    emailValidate: (input) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
    },
    urlValidate: (input) => {
        return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input);
    }
};