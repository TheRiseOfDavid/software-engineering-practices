import { BookDataBaseService, BookInfo } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData"
import { HashGenerator } from "../utils/HashGenerator";
import { DataBaseSystem } from "./DataBaseSystem"
import { BaseSystem } from "./BaseSystem";

/**
 * 因為 DataBaseSystem 會去與 database 做連線，因此要用 stub 去模擬在 unit test 中 function 的特定回覆
 * 加上是傳給它 array, 因此 `WordPurityService.purity` 每一次的值必須模擬對應 input 的輸出.  
 */
jest.mock("@externals/simple-db", () => {
    return {
        BookDataBaseService: jest.fn().mockImplementation(() => ({
            setUp: jest.fn(),
            getBooks: jest.fn(),
            addBook: jest.fn(),
            deleteBook: jest.fn(),
        })),
    }
})
jest.mock("../utils/HashGenerator", () => {
    return {
        HashGenerator: jest.fn().mockImplementation(() => ({
            simpleISBN: jest.fn(),
            g: jest.fn(),
        }))
    }
})

/**
 * 測試 `DataBaseSystem.connectDB` 回傳預期結果與錯誤內容
 * 測試 `DataBaseSystem.addBook` 回傳預期結果與錯誤內容
 * 測試 `DataBaseSystem.deleteBook` 回傳預期結果與錯誤內容
 * 測試 `DataBaseSystem.process` 回傳預期結果
 * 測試 DataBaseSystem 的 constructor 能否回傳正確結果
 */
describe("DataBaseSystem Class - Unit Test", () => {
    let obj: DataBaseSystem
    let stubDB: jest.Mocked<BookDataBaseService>;
    let stubHash: jest.Mocked<HashGenerator>;
    let input: BookInfo[]

    beforeEach(() => {
        // Arrange
        stubDB = new BookDataBaseService as jest.Mocked<BookDataBaseService>;
        stubHash = new HashGenerator as jest.Mocked<HashGenerator>;
        obj = new DataBaseSystem(stubDB, stubHash);
        input = TestBookInfo;
    })

    test("connectDBWithSuccess", async () => {
        // Arrange
        stubDB.setUp.mockReturnValue(Promise.resolve("Success"));
        stubDB.getBooks.mockImplementation(async () => { return TestBookInfo });

        // Act
        const result: string = await obj.connectDB();

        // Assert
        expect(stubDB.setUp).toHaveBeenCalledTimes(1);
        expect(stubDB.getBooks).toHaveBeenCalledTimes(1);
        expect(result).toBe("Success")
    });

    test("connectDBWithFail", async () => {
        // Arrange
        stubDB.setUp.mockRejectedValue(new Error("mock error"));

        // Act
        // Assert
        await expect(obj.connectDB()).rejects.toThrow("Cannnot connect to DB")
        // 必須要先確認前面的 connectDB 都以成功執行才做
        expect(stubDB.setUp).toHaveBeenCalledTimes(5);
    });

    test("addBookWithSuccess", async () => {
        // Arrange
        stubHash.simpleISBN.mockReturnValue("123-45-67890-12-3");
        stubDB.addBook.mockResolvedValue("success");

        // Act
        await obj.addBook("my autobiography", "david");

        // Assert
        expect(stubHash.simpleISBN).toHaveBeenCalledTimes(1);
        expect(stubDB.addBook).toHaveBeenCalledTimes(1);
    });

    test("addBookThrowErrorForParameterEmpty", async () => {
        // Arrange

        // Act
        // Assert
        expect(obj.addBook("", "")).rejects.toThrow("Add book failed");
    });

    test("deleteBookWithSuccess", async () => {
        // Arrange
        stubDB.deleteBook.mockResolvedValue("success");

        // Act
        await obj.deleteBook("123-45-67890-12-3");

        // Assert
        expect(stubDB.deleteBook).toHaveBeenCalledTimes(1);
    });

    test("deleteBookWithParameterEmpty", async () => {
        // Arrange

        // Act
        // Assert
        expect(obj.deleteBook("")).rejects.toThrow("Delete book failed");
    });

    test("processWithSuccess", async () => {
        // Arrange
        const result: BookInfo[] = input;
        stubDB.getBooks.mockResolvedValue(input)

        // Act
        await obj.process(input)

        // Assert
        expect(obj.getItems()).toEqual(result);
    });

    test("constructorWithDefault", async () => {
        // Arrange
        obj = new DataBaseSystem();

        // Act
        // Assert
        expect(obj.db).toBeInstanceOf(Object);
        expect(obj.hashGenerator).toBeInstanceOf(Object);
    });
});
