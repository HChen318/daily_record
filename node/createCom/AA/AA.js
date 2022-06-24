/**
 * Created by /Users/chenhuan on 2022/03/16
 */
import url from '../../config/system.js';

class AACtrl {
    constructor(http) {
        [this.http, this.name] = [http, 'AA'];
    }
}
AACtrl.$inject = ['http'];
export default AACtrl