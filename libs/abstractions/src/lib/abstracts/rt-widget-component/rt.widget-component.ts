import { InternalGlobalProvider } from '../../internal-global-provider';
import { NgZone } from '@angular/core';
import { RtComponent } from '../rt.component';

/**
 * @description The Base class to use on any widget component.
 * We've had a lot of trouble with widgets' change detection "breaking" in the past, and for the most part we've figured
 * it out. It is due to some less-than-obvious ngZone mechanics.
 * However, this knowledge and pattern is kinda clunky and easy to forget, so this is an abstraction to help devs not
 * have to worry about that.
 *
 * Usage
 * Just use the RtWidgetComponent base class instead of RtComponent (it extends RtComponent, so you'll get the log and
 * addSubscription method). After that, you can use @PublicApiWidgetMethod() to decorate the methods you intend to be
 * callable externally, just like you would decorate input or output properties. Without doing this on those methods,
 * change detection is unreliable leading to all sorts of headaches, swearing, and broken keyboards.
 * No more need to worry about ngZone in widgets.
 *
 * @example ```ts
 * export class ExamplePublicApiWidgetComponent extends RtWidgetComponent {
 *     // Used to test the decorated method, 'test';
 *     public decoratedMethodHasMutatedThisValue = false;
 *
 *     // Used to test the decorated method, 'incrementCount';
 *     public count = 0;
 *
 *     constructor() {
 *       super('PublicApiWidgetComponent');
 *     }
 *
 *     // Example use. Verifies TS is happy
 *     \@PublicApiWidgetMethod()
 *     public test(): void {
 *       this.decoratedMethodHasMutatedThisValue = true;
 *     }
 *
 *     // Example use. Verifies TS is happy and the signatures aren't affected
 *     \@PublicApiWidgetMethod()
 *     public incrementCount(): number {
 *       return ++this.count;
 *     }
 *   }
 * ```
 * @summary Example basic implementation: the backslashes are intended to escape JSDoc rules, do not include them in your implementation
 */
export class RtWidgetComponent extends RtComponent {
  /** globally provided ngZone reference for @PublicApiWidgetMethod decorated methods */
  public readonly _ngZone: NgZone = InternalGlobalProvider.getNgZone();

  protected constructor(componentName: string) {
    super(componentName);
  }
}
