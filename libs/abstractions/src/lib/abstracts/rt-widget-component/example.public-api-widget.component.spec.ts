import { ExamplePublicApiWidgetComponent } from './example.public-api-widget.component';
import { InternalGlobalProvider } from '../../internal-global-provider';
import { NgZone } from '@angular/core';

describe(`PublicWidgetApiMethodDecorator`, () => {
  it(`should run in ngZone`, () => {
    spyOn(InternalGlobalProvider, 'getNgZone').and.returnValue(new NgZone({}));
    const publicApiWidgetComponent = new ExamplePublicApiWidgetComponent();
    const ngZoneRun = spyOn(publicApiWidgetComponent._ngZone, 'run').and.callThrough();

    expect(ngZoneRun).not.toHaveBeenCalled();
    expect(publicApiWidgetComponent.decoratedMethodHasMutatedThisValue).toEqual(false);

    publicApiWidgetComponent.test();
    expect(ngZoneRun).toHaveBeenCalled();
    expect(publicApiWidgetComponent.decoratedMethodHasMutatedThisValue).toEqual(true);
  });
  it(`should not alter the signature of the method`, () => {
    spyOn(InternalGlobalProvider, 'getNgZone').and.returnValue(new NgZone({}));
    const publicApiWidgetComponent = new ExamplePublicApiWidgetComponent();
    const ngZoneRun = spyOn(publicApiWidgetComponent._ngZone, 'run').and.callThrough();

    expect(publicApiWidgetComponent.count).toEqual(0);
    expect(ngZoneRun).not.toHaveBeenCalled();

    const count1 = publicApiWidgetComponent.incrementCount();
    expect(ngZoneRun).toHaveBeenCalled();
    expect(publicApiWidgetComponent.count).toEqual(1);
    expect(count1).toEqual(1);

    const count2 = publicApiWidgetComponent.incrementCount();
    expect(ngZoneRun).toHaveBeenCalledTimes(2);
    expect(publicApiWidgetComponent.count).toEqual(2);
    expect(count2).toEqual(2);
  });
});
