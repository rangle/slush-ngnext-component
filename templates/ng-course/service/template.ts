import {Inject} from 'utils/di';

export class <%= serviceName %> {

  constructor(
    @Inject('$log') private $log
    ) {
    this.$log.info('<%= serviceName %> initalized');
  }

  public sayHello() {
    return "hello from service";
  }

}