import { TestBookInfo } from "../__test__/TestingData";
import { HashGenerator } from "./HashGenerator";
import { BookInfo } from "@externals/simple-db";

/**
 * 檢查 `HashGenerator.g()` 回傳預期結果 與 throw error
 * 檢查 `HashGenerator.simpleISBN()` 回傳預期結果
 */
describe("HashGenerator Class - Unit Test", () => {
    let obj: HashGenerator;
    beforeEach(() => {
        // Arrange
        obj = new HashGenerator();
        global.Math.random = jest.fn().mockReturnValue(0.4)
    })

    test("gWithSuccess", () => {
        // Act
        const result: string = "KKKKKKKK";
        // Assert
        expect(obj.g(8)).toBe(result);
    });

    test("gThrowErrorForInvalidNumber", () => {
        // Act
        // Assert
        expect(() => obj.g(-4)).toThrow("Hash number can't less than 0");
    });

    test("simpleISBMWithSuccess", () => {
        // Act
        const result: string = "44444-444";

        // Assert
        expect(obj.simpleISBN("david-HBD")).toBe(result);
    });
});
