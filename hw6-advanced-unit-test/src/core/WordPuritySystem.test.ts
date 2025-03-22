import { TestBookInfo } from "../__test__/TestingData";
import { WordPuritySystem } from "./WordPuritySystem";
import { WordPurityService } from "@externals/word-purity";
import { BookInfo } from "@externals/simple-db";
import { createCompilerHost, ModuleDetectionKind } from "typescript";


/**
 * 因為 WordPurityService 是會對 Copperfield, Wonderland 這兩個單字做敏感詞 \
 * 加上是傳給它 array, 因此 `WordPurityService.purity` 每一次的值必須模擬對應 input 的輸出.  
 */
jest.mock("@externals/word-purity", () => {
    return {
        WordPurityService: jest.fn().mockImplementation(() => ({
            purity: jest.fn().mockReturnValueOnce("Emma Story")
                .mockReturnValueOnce("Alice Adventures in **********")
                .mockReturnValueOnce("Game of Thrones II"),
            addWord: jest.fn().mockImplementation(() => { }),
        }))
    }
})

/**
 * `WordPuritySystem.process` 測試 disable 是否能得到預期輸出 
 */
describe("WordPuritySystem Class - Unit Test", () => {
    let obj: WordPuritySystem
    let stubObj: jest.Mocked<WordPurityService>;
    let input: BookInfo[]

    beforeEach(() => {
        // Arrange
        stubObj = new WordPurityService() as jest.Mocked<WordPurityService>;
        obj = new WordPuritySystem(stubObj);
        input = [5, 6, 7].map(index => TestBookInfo[index]);
    })

    test("processWithEnablePurity", async () => {
        // Arrange 
        const result: BookInfo[] = [{
            "ISBN": "572-70-62221-82-2",
            "title": "Emma Story",
            "author": "Henry James"
        },
        {
            "ISBN": "680-71-48243-17-0",
            "title": "Alice Adventures in **********",
            "author": "Stephenie Meyer"
        },
        {
            "ISBN": "148-71-77362-42-3",
            "title": "Game of Thrones II",
            "author": "J. R. R. Tolkien"
        }]

        // Act
        obj.setDisablePurity(false);
        await obj.process(input)

        // Assert
        expect(obj.isDisablePurity()).toBe(false);
        expect(stubObj.purity).toHaveBeenCalledTimes(3);
        expect(obj.getItems()).toEqual(result);
    });

    test("processWithDisblePurity", async () => {
        // Arrange 
        const result: BookInfo[] = input

        // Act
        obj.setDisablePurity(true);
        await obj.process(input)

        // Assert
        expect(obj.isDisablePurity()).toBe(true);
        expect(stubObj.purity).toHaveBeenCalledTimes(0);
        expect(obj.getItems()).toEqual(result);
    });
});

