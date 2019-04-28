const { MARKERS } = require('../../constants');
const { Marker } = require('../../classes/Marker');

function getEmptyField (size = 4) {
  const row = new Array(size).fill(MARKERS._);
  return new Array(size)
      .fill()
      .map(_ => row.slice());
};

// TODO add tests
function rotateField(field){
  const newField = [];
  for(let i = 0; i < field.length; i++){
    for(let j = 0; j < field.length; j++){
      if(!newField[i]){
        newField[i] = [];
      }
      newField[i][j] = new Marker(field[j][i].val);
    }
  }
  return newField;
}

module.exports = {
  getEmptyField,
  rotateField
};
