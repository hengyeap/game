/**
 * Create a component with common options
 */
import createBasic from './create-basic';
import Icon from '../base_components/icon';
import Loading from '../base_components/loading';
import Cell from '../base_components/cell';
import CellGroup from '../base_components/cell-group';

export default function(sfc) {
  sfc.components = Object.assign(sfc.components || {}, {
    Icon,
    Loading,
    Cell,
    CellGroup
  });
  return createBasic(sfc);
};
