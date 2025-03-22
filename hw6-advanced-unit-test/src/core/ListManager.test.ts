import { BookDataBaseService, BookInfo } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData";
import { ListViewerManager, UpdateType } from "./ListManager";
import { WordPuritySystem } from "./WordPuritySystem";
import { DataBaseSystem } from "./DataBaseSystem";
import { WordPurityService } from "@externals/word-purity";

/**
 * 由於前期想說可以將 mock function 全部寫在一起便於理解，但後面發現用 
 * jest.spyOn(HashGenerator.prototype, 'simpleISBN').mockReturnValue("1234");
 * 可以透過用 spy 的方式去針對每個 test 的 function 做偽造更好
 */

jest.mock("./DataBaseSystem", () => {
    return {
        DataBaseSystem: jest.fn().mockImplementation(() => ({
            connectDB: jest.fn().mockResolvedValue("success"),
            process: jest.fn().mockResolvedValue(() => ({})),
            getUpdateMessage: jest.fn().mockReturnValue("Data Base Update"),
            getItems: jest.fn().mockReturnValue(TestBookInfo),
        })),
    }
})

jest.mock("./WordPuritySystem", () => {
    return {
        WordPuritySystem: jest.fn().mockImplementation(() => ({
            process: jest.fn().mockResolvedValue(() => ({})),
            getItems: jest.fn().mockReturnValue(TestBookInfo),
            getUpdateMessage: jest.fn().mockReturnValue("Dom Purity Update"),
        })),
    };
})

jest.mock("../../externals/word-purity")

jest.mock("./FilterSystem", () => {
    return {
        FilterSystem: jest.fn().mockImplementation(() => ({
            process: jest.fn().mockResolvedValue(() => ({})),
            getUpdateMessage: jest.fn().mockReturnValue("Filter Update"),
            getItems: jest.fn().mockReturnValue(TestBookInfo),
        })),
    }
})

jest.mock("./SortSystem", () => {
    return {
        SortSystem: jest.fn().mockImplementation(() => ({
            process: jest.fn().mockResolvedValue(() => ({})),
            getUpdateMessage: jest.fn().mockReturnValue("Sort Update"),
            getItems: jest.fn().mockReturnValue(TestBookInfo),
        })),
    }
})

jest.mock("./DisplayRangeSystem", () => {
    return {
        DisplayRangeSystem: jest.fn().mockImplementation(() => ({
            process: jest.fn().mockResolvedValue(() => ({})),
            getUpdateMessage: jest.fn().mockReturnValue("Display Range Update"),
            getItems: jest.fn().mockReturnValue(TestBookInfo),
        })),
    };
})

/**
 * 檢查 `ListViewerManager.updateResult` 成功獲得預期結果
 * 檢查 `ListViewerManager.getProcessor` 成功獲得預期結果
 * 檢查 `ListViewerManager.generateDisplayItemRow` 成功獲得預期結果
 */
describe("ListViewerManager Class: Unit Test", () => {
    let obj: ListViewerManager;
    let input: BookInfo[]

    beforeEach(async () => {
        // Arrange
        obj = new ListViewerManager();
        await obj.setUp();
        input = TestBookInfo;
    })

    test("updateResultForAllProcessors", async () => {
        // Arrange 
        const result: string[] = ["Data Base Update",
            "Dom Purity Update",
            "Filter Update",
            "Sort Update",
            "Display Range Update",
        ]

        // Act
        await obj.updateResult(UpdateType.Data);

        // Assert
        expect(obj.getUpdateMessage()).toEqual(result);
    });

    test("getProcessorSuccess", () => {
        // Act
        const result: WordPuritySystem = obj.getProcessor<WordPuritySystem>(UpdateType.Purity);

        // Assert
        expect(result instanceof Object).toBe(true);
    })

    test("generateDisplayItemRowSuccess", () => {
        // Act
        const result: BookInfo[] = obj.generateDisplayItemRow();

        // Assert
        expect(result).toEqual(input);
    })
});
