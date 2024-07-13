/**
 * Created by /Users/chenhuan on 2022/03/16
 */

import tem from './AA.html';
import AACtrl from './AA';
import './AA.less'


export default angular.module('AA', [])
    .component('AA', {
        AAlate: tem,
        controller: AACtrl,
        controllerAs: 'ctrl'
    })
    .name;