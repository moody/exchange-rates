import { CurrencyModule } from "@/store/modules/currency";

describe("store: currency", () => {
  describe("mutations", () => {
    it("setBaseCurrency", () => {
      const expected = "HRK";
      CurrencyModule.setBaseCurrency(expected);
      expect(CurrencyModule.baseCurrency).toBe(expected);
    });
  });
});
