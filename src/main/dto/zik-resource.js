class ZikResource {

    constructor(inputs) {
        this.url = inputs.url;
        this.artist = inputs.artist;
        this.title = inputs.title;
        this.addedBy = inputs.addedBy;
        this.tags = inputs.tags;
    }

    equals(otherZikResource) {

        let isEquals = true;

        isEquals = isEquals && this.addedBy === otherZikResource.addedBy;
        isEquals = isEquals && this.artist === otherZikResource.artist;
        isEquals = isEquals && this.title === otherZikResource.title;
        isEquals = isEquals && this.url === otherZikResource.url;

        // We check if we have the exact same tags in both objects.
        if (otherZikResource.tags) {
            isEquals = isEquals && (this.tags.length === otherZikResource.tags.length);
            for (let iTag = 0; iTag < otherZikResource.tags.length && isEquals; iTag++) {
                let tag = otherZikResource.tags[iTag];
                isEquals = isEquals && this.containsTag(tag);
            }
        }

        if (otherZikResource.hasOwnProperty("_id")) {
            isEquals = isEquals && this._id === otherZikResource._id;
        }

        return isEquals;
    }

    containsTag(tag) {
        let tagFound = false;
        for (let i = 0; i < this.tags.length && !tagFound; i++) {
            tagFound = (this.tags[i].label === tag.label) && (this.tags[i].value === tag.value);
        }
        return tagFound;
    }

}

module.exports = ZikResource;
