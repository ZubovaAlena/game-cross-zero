const { Marker } = require('../classes/Marker');

// CONFIG
const FIELD_SIZE = 3;

// OTHER
const EMPTY_MARKER = new Marker('_');
const MARKERS = {
  X: new Marker('x'),
  O: new Marker('o'),
  // Default marker
  _: new Marker('_'),
};

module.exports = { 
	FIELD_SIZE,
	MARKERS,
	EMPTY_MARKER
};
