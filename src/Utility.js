export const generateHeight = () => {
    return Math.floor((Math.random() * (380)) + 80);
}

export const initImageList = (tmpPictures, MAX_PICTURES) => {
    let initPictures = [];
    for (let i = 0; i < MAX_PICTURES; i++) {
        if (tmpPictures[i] !== undefined) {
            initPictures.push({
                index: i,
                image: tmpPictures[i].image,
                rawImage: tmpPictures[i].rawImage,
                add: false
            });
        } else {
            initPictures.push({index: i, image: null, rawImage: null, add: true});
        }
    }
    return initPictures;
};
