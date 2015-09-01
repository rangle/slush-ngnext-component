import {Inject} from 'utils/di';

export class <%= componentName %> {
    private static selector = '<%= componentNameSelector %>';
    private static templateUrl = '<%= componentNameTemplate %>.html';

    constructor(
        @Inject('$log') private $log
    ) {
        this.$log.info('<%= componentName %> initalized');
    }
}
