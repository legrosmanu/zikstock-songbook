class ZikResource {

    constructor(inputs) {
        this.url = inputs.url;
        this.artist = inputs.artist;
        this.title = inputs.title;
        this.addedBy = inputs.addedBy;
        this.tags = inputs.tags;
    }

    equals(otherResource) {

        let isEquals = true;

        isEquals = isEquals && this.addedBy === otherResource.addedBy;
        isEquals = isEquals && this.artist === otherResource.artist;
        isEquals = isEquals && this.title === otherResource.title;
        isEquals = isEquals && this.url === otherResource.url;

        isEquals = isEquals && this.tags.length === otherResource.tags.length;
        if (isEquals && this.tags.length > 0) {
            for (let tag of otherResource.tags) {
                // We check if we have the exact same tag on this.
                let tagFound = false;
                for (let i = 0 ; i < this.tags.length && !tagFound ; i++) {
                    tagFound = this.tags[i].label === tag.label && this.tags[i].value === tag.value;
                }
                isEquals = isEquals && tagFound;
            }
        }

        if (Object.prototype.hasOwnProperty.call(otherResource,"_id")) {
            isEquals = isEquals && this._id === otherResource._id;
        }

        return isEquals;
    }

}

module.exports = ZikResource;
