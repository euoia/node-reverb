var _ = require('underscore');

var insults = [
  'Abruti',
  'Vas te faire enculer',
  'Vas te faire foutre',
  'Andouille',
  'Avorton',
  'Bouffon',
  'Branleur',
  'Cave',
  'Connard',
  'Crétin',
  'Débile',
  'Ducon',
  'Enfoiré',
  'Étron',
  'Face de pet',
  'Fripouille',
  'Glandeur',
  'Idiot',
  'Imbécile',
  'Incapable',
  'Minable',
  'Minus',
  'Misérable',
  'Moins-que-rien',
  'Moron',
  'Niaiseux',
  'Nul',
  'Plouc',
  'Poltron',
  'Putois',
  'Raté',
  'Roi des cons'
];

exports.newInsult = function(){
  return _.sample(insults);
};
