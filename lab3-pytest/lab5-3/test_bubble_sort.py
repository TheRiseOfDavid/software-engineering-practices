import pytest 
from bubble_sort import bubble_sort

def test_bubble_sort():
    # empty array
    arr = []
    assert bubble_sort(arr) == []

    # single element 
    arr = [1]
    assert bubble_sort(arr) == [1]

    # two element with increase 
    arr = [1,2]
    assert bubble_sort(arr) == [1,2]

    # tow element with decrease
    arr = [2,1]
    assert bubble_sort(arr) == [1,2]

    # increase array 
    arr = [1, 2, 3, 4, 5]
    assert bubble_sort(arr) == [1, 2, 3, 4, 5]

    # decrease array 
    arr = [5,4,3,2,1]
    assert bubble_sort(arr) == [1,2,3,4,5]

    # this array have peak and plunges property
    arr = [1, 3, 2, 4, 5]
    assert bubble_sort(arr) == [1,2,3,4,5]

    # this array have plunges and peak property
    arr = [3, 1, 5, 2, 4]
    assert bubble_sort(arr) == [1,2,3,4,5]

    # this array have negative number property
    arr = [-3, -1, -5, -2, -4]
    assert bubble_sort(arr) == [-5,-4,-3,-2,-1]

    # this array have negative number and positive number
    arr = [-3, -1, -5, 2, 4]
    assert bubble_sort(arr) == [-5,-3,-1,2,4]

    # this array have duplicate number
    arr = [2,2,2,2,2]
    assert bubble_sort(arr) == [2,2,2,2,2]
