import exp from "constants";
import { TestBookInfo } from "../__test__/TestingData";
import { FilterSystem } from "./FilterSystem";
import { BookInfo } from "@externals/simple-db";

/** 
 * FilterSystem 並沒有與其他 class 互動，因此不需要 mock 
 * 只需要測試 `FilterSystem.process` 能否依據 `FilterSystem.isIgnoreCase` 去查看是否有成功收尋關鍵字，並分開寫兩個 Case
 */

describe("FilterSystem class - UnitTest", () => {
    let obj: FilterSystem
    let input: BookInfo[]

    beforeEach(() => {
        // Arrange
        obj = new FilterSystem();
        input = [1, 2, 3].map(index => TestBookInfo[index]);
    })

    test("processWithIgnoreCase", () => {
        // Arrange
        const result: BookInfo[] = [
            {
                "ISBN": "774-13-13326-60-1",
                "title": "To Kill a Mockingbird",
                "author": "Danielle Steel"
            }
        ]
        // Act
        obj.setFilterWord("kill")
        obj.setIgnoreCase(true)
        obj.process(input)

        // Assert
        expect(obj.getFilterWord()).toBe("kill");
        expect(obj.isIgnoreCase()).toBe(true);
        expect(obj.getItems()).toEqual(result);
    });

    test("processWithoutIgnoreCase", () => {
        // Arrange
        const result: BookInfo[] = []

        // Act
        obj.setFilterWord("kill")
        obj.setIgnoreCase(false)
        obj.process(input)

        // Assert
        expect(obj.getFilterWord()).toBe("kill");
        expect(obj.isIgnoreCase()).toBe(false);
        expect(obj.getItems()).toEqual(result);
    });
});

