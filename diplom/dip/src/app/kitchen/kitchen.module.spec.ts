import { KitchenModule } from './kitchen.module';

describe('KitchenModule', () => {
  let kitchenModule: KitchenModule;

  beforeEach(() => {
    kitchenModule = new KitchenModule();
  });

  it('should create an instance', () => {
    expect(kitchenModule).toBeTruthy();
  });
});
