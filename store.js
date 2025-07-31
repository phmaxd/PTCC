(async () =>{

    const storePromise = require('electron-store').then(({ default: Store}) => {
    return new Store();
});

module.exports = storePromise;

})