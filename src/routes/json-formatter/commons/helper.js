export const getJson = (input) => {
    let item = typeof input !== 'string'
        ? JSON.stringify(input)
        : input;

    let isSuccess = false;
    let output = { message: 'json 格式有誤！' };

    try {
        item = JSON.parse(item);
        if (typeof item === 'object' && item !== null) {
            output = item;
            isSuccess = true;
        }
    } catch (e) {
        isSuccess = false;
    }

    return [isSuccess, output];
};
