import { IWidgetComponent } from './widget-component.interface';

type PublicApiDecoratorFactory<T> = (
  widgetComponent: T,
  propertyKey: keyof T,
  propertyDescriptor: PropertyDescriptor
) => PropertyDescriptor;

/**
 * @description Use on any method that a widget intends to be callable by its hosting context.
 * It will allow the widget's change detection to function more smoothly in its
 * own widget context.
 *
 * @summary Example implementation: the backslashes are intended to escape JSDoc rules, do not include them in your implementation
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
 */
export const PublicApiWidgetMethod = <T extends IWidgetComponent>(): PublicApiDecoratorFactory<T> => {
  // our factory function will return our actual decorator function
  return (
    widgetComponent: T,
    propertyKey: keyof T,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    // monkey patch the original implementation - wrap it in an ngZone.run
    // invocation. This is because the hosting app will call the public method
    // on the widget (which is a different app with its own zone - this one),
    // which will run the method in its hosting ngZone. This means change
    // detection is broken for the widget as its zone (and by extension Angular's
    // change detection mechanism) isn't clued in to task processing.
    const originalMethod = propertyDescriptor.value;
    // do not use an arrow function to reassign the implementation as it will be
    // scoped incorrectly, blocking use of any instance properties.
    propertyDescriptor.value = function(...args): any {
      // `this` is the "invocation-run-time" widget instance.
      // The widgetComponent: T argument is the "compile-time" class evaluation,
      // which will not have instance variables.
      return this._ngZone.run(() => {
        // run the original method with its original arguments
        return originalMethod.apply(this, args);
      });
    };
    return propertyDescriptor;
  };
};
