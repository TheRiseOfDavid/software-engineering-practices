import { TestBookInfo } from "../__test__/TestingData";
import { DisplayRangeSystem } from "./DisplayRangeSystem";
import { BookInfo } from "@externals/simple-db";

/**
 * 透過 `DisplayRangeSystem.process` 確認是否會符合範圍內的設定
 * 透過 `DisplayRangeSystem.setRange` 檢查 `DisplayRangeSystem.convertNum` 拋出的 error 
 * 透過 `DisplayRangeSystem.setRange` 檢查拋出的 error 
 */
describe("DisplayRangeSystem - UnitTest", () => {
    let obj: DisplayRangeSystem
    let input: BookInfo[]

    beforeEach(() => {
        // Arrange
        obj = new DisplayRangeSystem();
        input = TestBookInfo;
    })

    test("processWithSuccess", () => {
        // Arrange
        const result: BookInfo[] = input.slice(3 - 1, 7);

        // Act
        obj.setRange(3, "7");
        obj.process(input);

        // Assert
        expect(obj.getStartRange()).toBe(3);
        expect(obj.getEndRange()).toBe(7);
        expect(obj.getItems()).toEqual(result);
    });

    test("setRangeThrowErrorForInvalidString", () => {
        // Act
        // Assert
        expect(() => obj.setRange("david")).toThrow("Invalid String Input");
    });

    test("setRangeThrowErrorForFloat", () => {
        // Act
        // Assert
        expect(() => obj.setRange(3.0)).toThrow("Invalid Float Input");
    });

    test("setRangeThrowErrorForNegativeNumber", () => {
        // Act
        // Assert
        expect(() => obj.setRange(-3)).toThrow("Cannot be less than 0");
    });

    test("setRangeThrowErrorForInvalidRange", () => {
        // Act
        // Assert
        expect(() => obj.setRange(10, 8)).toThrow("End Range cannot less than Start Range");
    });
});
