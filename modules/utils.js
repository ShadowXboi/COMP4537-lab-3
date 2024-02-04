function getDate() {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const currentDate = new Date().toLocaleString('en-US', options);
    return currentDate;
}

module.exports = { getDate };
