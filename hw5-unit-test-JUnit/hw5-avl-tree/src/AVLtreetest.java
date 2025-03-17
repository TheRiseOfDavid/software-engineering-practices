import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;

// code coverage: line converage: 98%, method converage 100%, Branch converage 95%;
// Partition testing: 對每個 if 做測試, ex: countNodes.
// Boundary tests: 對每個邊界做測試, ex: duplicate node.
// Negative tests: 做出 fail 的 test.

class TestAvlTree {
	private AvlTree tree;
	@BeforeEach
	void setUp(){
		// given: 建立一個 AVL Tree，並且下面每個 test 都會用到
		tree = new AvlTree();
	}

	@org.junit.jupiter.api.Test
	void isEmpty_ReturnTrue_byCoverage() {
		// when: 檢查樹是否為空
		boolean flag = tree.isEmpty();

		// then: 沒有回傳任何節點，因此回傳 true.
        assertTrue(flag);
	}

	@org.junit.jupiter.api.Test
	void isEmpty_ReturnFalse_byCoverage() {
		// given: 插入一個節點
		tree.insert(1);

		// when: 檢查樹是否為空
		boolean flag = tree.isEmpty();

		// then: 有插入節點，因此回傳 false.
        assertFalse(flag);
	}

	@org.junit.jupiter.api.Test
	void makeEmpty_ReturnTrue_byCoverage() {
		// given: 插入一個節點
		tree.insert(1);

		// when: 檢查樹是否為空
		tree.makeEmpty();

		// then: 樹應該為空，因此回傳 true.
		assertTrue(tree.isEmpty());
	}

	@org.junit.jupiter.api.Test
	void insertWithLeftRotation_Success_byCoverage() {
		// when: 插入三節點導致左旋
		tree.insert(10);
		tree.insert(20);
		tree.insert(30);

		// then: 回傳成功左旋的結果
		assertEquals("10 20 30", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void insertWithRightRotation_Success_byCoverage() {
		// when: 插入三節點導致右旋
		tree.insert(30);
		tree.insert(20);
		tree.insert(10);

		// then: 回傳成功右旋的結果
		assertEquals("10 20 30", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void insertWithDoubleRotationWithLeftRight_Success_byCoverage() {
		// when: 插入三節點導致先左旋在右旋
		tree.insert(30);
		tree.insert(10);
		tree.insert(20);

		// then: 回傳成功的結果
		assertEquals("10 20 30", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void insertWithDoubleRotationWithRightLeft_Success_byCoverage() {
		// when: 插入三節點導致先右旋在左旋
		tree.insert(10);
		tree.insert(30);
		tree.insert(20);

		// then: 回傳成功的結果
		assertEquals("10 20 30", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void insertWithoutRotate_Success_byCoverage() {
		// when: 插入三節點, 但不用旋轉
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);

		// then: 回傳成功的結果
		assertEquals("10 20 30", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void insertWithDuplicateNumber_Success_byCoverage() {
		// when: 插入三節點, 但數值相同, 不需要做插入
		tree.insert(20);
		tree.insert(20);
		tree.insert(20);

		// then: 回傳成功的結果
		assertEquals("20", tree.inorder());
	}

	@org.junit.jupiter.api.Test
	void countNodes_empty_byPartition() {
		// when: 回傳節點數量
		int cnt = tree.countNodes();

		// then: 回傳正確的結果
		assertEquals(0, cnt);
	}

	@org.junit.jupiter.api.Test
	void countNodes_haveData_byPartition() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);

		// when: 回傳節點數量
		int cnt = tree.countNodes();

		// then: 回傳正確的結果
		assertEquals(3, cnt);
	}

	@org.junit.jupiter.api.Test
	void search_hasNumber_byCoverage() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);

		// when: 找到數字
		boolean flag = tree.search(20);

		// then: 回傳 true
		assertTrue(flag);
	}

	@org.junit.jupiter.api.Test
	void search_hasNotNumber_byCoverage() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);

		// when: 找不到數字
		boolean flag = tree.search(50);

		// then: 回傳 false
		assertFalse(flag);
	}

	@org.junit.jupiter.api.Test
	void inorder_Success_byCoverage() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);
		tree.insert(40);
		tree.insert(50);

		// when: 對 AVLtree 輸出 inorder 排序
		String result = tree.inorder();

		// then: 回傳成功的結果
		assertEquals("10 20 30 40 50", result);
	}

	@org.junit.jupiter.api.Test
	void preorder_Success_byCoverage() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);
		tree.insert(40);
		tree.insert(50);

		// when: 對 AVLtree 輸出 preorder 排序
		String result = tree.preorder();

		// then: 回傳成功的結果
		assertEquals("20 10 40 30 50", result);
	}

	@org.junit.jupiter.api.Test
	void postorder_Success_byCoverage() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);
		tree.insert(40);
		tree.insert(50);

		// when: 對 AVLtree 輸出 postorder 排序
		String result = tree.postorder();

		// then: 回傳成功的結果
		assertEquals("10 30 50 40 20", result);
	}

	void performance_tests() {
		// given: 給予節點
		tree.insert(20);
		tree.insert(10);
		tree.insert(30);
		tree.insert(40);
		tree.insert(50);

		// when: 對 AVLtree 輸出 postorder 排序
		String result = tree.postorder();

		// then: 回傳成功的結果
		assertEquals("10 30 50 40 20", result);
	}
}
