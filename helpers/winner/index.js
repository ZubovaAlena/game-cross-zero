const { MARKERS, EMPTY_MARKER, FIELD_SIZE } = require('../../constants');
const { loggerInfo } = require('../logger');
const { rotateField } = require('../field');
const { Marker } = require('../../classes/Marker');


// TODO add tests
function getHorizontalWinnerMarker (field) {
  try {
    return field.reduce((prev, row) => {
      const isWon = Marker.isAllMarkersEqual(row);
      return isWon && !(row[0]).isEqual(EMPTY_MARKER) ? row[0] : prev;
    }, EMPTY_MARKER);
  }
  catch(err) {
    return EMPTY_MARKER;
  }
};

function getVerticalWinnerMarker(field) {
  return getHorizontalWinnerMarker(rotateField(field));
};

function getDiagonalWinnerMarker (field) {
  const d1 = [];
  const d2 = [];
  for(let i = 0; i < FIELD_SIZE; i++) {
    for(let j = 0; j < FIELD_SIZE; j++) {
        if(i === j){
          d1.push(field[i][j]);
        }
        if(i + j === FIELD_SIZE - 1){
          d2.push(field[i][j]);
        }
    }
  }


  if(d1 && Marker.isAllMarkersEqual(d1) && !(d1[0]).isEqual(EMPTY_MARKER)){
    return d1[0];
  }
  if(d2 && Marker.isAllMarkersEqual(d2) && !(d2[0]).isEqual(EMPTY_MARKER)){
    return d2[0];
  }
  return EMPTY_MARKER;
};

function getWinnerMarker (field) {
  if (!Boolean(field)) {
    return EMPTY_MARKER;
  }

  const hw = getHorizontalWinnerMarker(field);
  const vw = getVerticalWinnerMarker(field);
  const dw = getDiagonalWinnerMarker(field);

  loggerInfo(`Current game field status h - ${hw} v - ${vw} d - ${dw}`);

  if (!hw.isEqual(EMPTY_MARKER)) {
    return hw;
  }
  if (!vw.isEqual(EMPTY_MARKER)) {
    return vw;
  }
  if (!dw.isEqual(EMPTY_MARKER)) {
    return dw;
  }
  return EMPTY_MARKER;
};

module.exports = {
  getWinnerMarker,
  getHorizontalWinnerMarker,
  getDiagonalWinnerMarker,
  getVerticalWinnerMarker
};
