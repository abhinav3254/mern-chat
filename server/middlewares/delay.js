function generateRandom() {
    return Math.floor(Math.random() * 5) + 2;
}

function delayRequest(req, res, next) {
    const delay = generateRandom();
    console.log(`Delaying request by ${delay} seconds...`);

    setTimeout(() => {
        console.log(`Request delay finished.`);
        next();
    }, delay * 1000);
}

module.exports = { delayRequest };
