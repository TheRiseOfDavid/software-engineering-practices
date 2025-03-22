import exp from "constants";
import { TestBookInfo } from "../__test__/TestingData";
import { SortSystem } from "./SortSystem";
import { BookInfo } from "@externals/simple-db";

/**
 * SortSystem 並沒有與其他 class 互動，因此不需要 mock 
 * 主要去測試 `SortSystem.process` 是否為按照 ASC, DESC, 以及非預期類別去進行測試
 */
describe("SortSystem class - UnitTest", () => {
    let obj: SortSystem
    let input: BookInfo[]

    beforeEach(() => {
        // Arrange
        obj = new SortSystem();
        input = [1, 2, 3].map(index => TestBookInfo[index]);
    })

    test("ProcessWithASC", () => {
        // Arrange
        obj.setSortType("ASC");
        const result: BookInfo[] = [
            {
                "ISBN": "712-03-87188-05-4",
                "title": "Bone of fire",
                "author": "Willain Bradbury"
            },
            {
                "ISBN": "255-03-71788-05-4",
                "title": "Game of Thrones I",
                "author": "Ray Bradbury"
            },
            {
                "ISBN": "774-13-13326-60-1",
                "title": "To Kill a Mockingbird",
                "author": "Danielle Steel"
            },

        ]

        // Act
        obj.process(input);

        // Assert
        expect(obj.getSortType()).toBe("ASC")
        expect(obj.getItems()).toEqual(result);
    });

    test("ProcessWithDESC", () => {
        // Arrange
        obj.setSortType("DESC");
        const result: BookInfo[] = [
            {
                "ISBN": "712-03-87188-05-4",
                "title": "Bone of fire",
                "author": "Willain Bradbury"
            },
            {
                "ISBN": "255-03-71788-05-4",
                "title": "Game of Thrones I",
                "author": "Ray Bradbury"
            },
            {
                "ISBN": "774-13-13326-60-1",
                "title": "To Kill a Mockingbird",
                "author": "Danielle Steel"
            },
        ].reverse()

        // Act
        obj.process(input);

        // Assert
        expect(obj.getSortType()).toBe("DESC")
        expect(obj.getItems()).toEqual(result);
    });

    test("ProcessWithException", () => {
        // Act
        // Assert
        expect(() => obj.setSortType("david")).toThrow("It must be ASC or DESC");
    });
});
