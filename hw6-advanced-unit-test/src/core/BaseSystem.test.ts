import { BookDataBaseService, BookInfo } from "@externals/simple-db";
import { TestBookInfo } from "../__test__/TestingData";
import { BaseSystem } from "./BaseSystem";


jest.spyOn(BaseSystem.prototype, 'getUpdateMessage')
    .mockImplementation(() => { return "david" })

class TestBaseSystem extends BaseSystem {
    public process(prevItems: BookInfo[]): void { }
};

/**
 * 測試 `TestBaseSystem.getUpdateMessage` 能得到預期結果
 */
describe("Need implement", () => {
    let obj: TestBaseSystem;
    let input: BookInfo[]

    beforeEach(async () => {
        // Arrange
        obj = new TestBaseSystem("david");
        input = TestBookInfo;
    })


    test("getUpdateMessageWithSuccess", () => {
        // Act
        // Assert
        expect(obj.getUpdateMessage()).toEqual("david");
    });

    test("getItemsWithSuccess", () => {
        // Act
        // Assert
        expect(obj.getItems()).toEqual([]);
    });
});
