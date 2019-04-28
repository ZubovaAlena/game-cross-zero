class Marker {
	constructor(val = 'x') {
		this.val = val;
	}

	toString() {
		return this.val;
	}

	isEqual(otherMarker){
		return this.val === otherMarker.val;
	}

	static isEqualMarkers(markerA, markerB) {
		// TODO add type checking
		return markerA.isEqual(markerB);
	}
	static isAllMarkersEqual(arrMarkers) {
    	return arrMarkers.reduce((prev, cur) => prev && cur.isEqual(arrMarkers[0]) );
	}
}

module.exports = { Marker };
