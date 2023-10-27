import { RtWidgetComponent } from './rt.widget-component';
import { PublicApiWidgetMethod } from './public-api-widget-method.decorator';

export class ExamplePublicApiWidgetComponent extends RtWidgetComponent {
  /** Used to test the decorated method, 'test' */
  public decoratedMethodHasMutatedThisValue = false;

  /** Used to test the decorated method, 'incrementCount' */
  public count = 0;

  constructor() {
    super('PublicApiWidgetComponent');
  }

  /** Example use. Verifies TS is happy */
  @PublicApiWidgetMethod()
  public test(): void {
    this.decoratedMethodHasMutatedThisValue = true;
  }

  /** Example use. Verifies TS is happy and the signatures aren't affected */
  @PublicApiWidgetMethod()
  public incrementCount(): number {
    return ++this.count;
  }
}
