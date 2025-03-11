import pytest 
from classifyTriangle import classify_triangle

# partition test 必須把 onto 作為 case.
def test_classify_triangle_sizeEqual():
    side1 = 3
    side2 = 3
    side3 = 3
    result = classify_triangle(side1, side2, side3)
    assert result == "Equilateral"

def test_classify_triangle_twoSizeEqual():
    side1 = 3
    side2 = 3
    side3 = 4
    result = classify_triangle(side1, side2, side3)
    assert result == "Isosceles"

def test_classify_triangle_twoSizeEqual_1():
    side1 = 3
    side2 = 3
    side3 = 4
    result = classify_triangle(side2, side1, side3)
    assert result == "Isosceles"

def test_classify_triangle_twoSizeEqual_2():
    side1 = 3
    side2 = 3
    side3 = 4
    result = classify_triangle(side3, side2, side1)
    assert result == "Isosceles"

def test_classify_triangle_SizeDiff():
    side1 = 3
    side2 = 4
    side3 = 5
    result = classify_triangle(side1, side2, side3)
    assert result == "Scalene"