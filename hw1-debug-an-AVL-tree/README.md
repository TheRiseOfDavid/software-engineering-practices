# HW1: debug an AVL tree 
> 軟工碩一 113525011 江大衞
> [題目要求](./debug%20AVL%20tree.docx)

## ANS: 
### bug1
* 原因：在輸入 8 的時候會發生錯誤
* 發生：不斷遞迴導致 stack overflow error. 
![alt text](image.png)

#### 修復
* bug1: `rotateWithLeftChild` 傳送的參數不正確
![alt text](image-1.png)
* bug2: `rotateWithLeftChild`, `rotateWithRightChild` rotate 錯誤
    * 解法
      * 新增一個 AVLNode 做為回傳值。
      * 將 function 傳近來的參數進行旋轉，並讓新增的 AVLNode 做為 root 
      * 在旋轉的過程中，如果有資料會被排擠到，則將它重新做一次 insert. 
![alt text](image-2.png)


