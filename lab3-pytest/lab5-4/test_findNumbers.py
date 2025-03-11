import pytest 
from findNumbers import find_numbers

def test_find_numbers_boundary():
    # one element
    numbers = [1]
    result = ["positive"]
    assert find_numbers(numbers) == result

    numbers = [-1]
    result = ["negative"]
    assert find_numbers(numbers) == result  

    numbers = [0]
    result = ["zero"]
    assert find_numbers(numbers) == result  

    # two element 
    numbers = [-1, 1]
    result = ["negative", "positive"]
    assert find_numbers(numbers) == result  

    numbers = [-1, 0]
    result = ["negative", "zero"]
    assert find_numbers(numbers) == result  

    numbers = [-1, -1]
    result = ["negative", "negative"]
    assert find_numbers(numbers) == result  

    numbers = [1, 0]
    result = ["positive", "zero"]
    assert find_numbers(numbers) == result 

    numbers = [1, -1]
    result = ["positive", "negative"]
    assert find_numbers(numbers) == result 

    numbers = [1, 1]
    result = ["positive", "positive"]
    assert find_numbers(numbers) == result 

    numbers = [0, -1]
    result = ["zero", "negative"]
    assert find_numbers(numbers) == result 

    numbers = [0, -1]
    result = ["zero", "negative"]
    assert find_numbers(numbers) == result 

    numbers = [0, 0]
    result = ["zero", "zero"]
    assert find_numbers(numbers) == result 

def test_find_numbers_negative():
    with pytest.raises(Exception) as error:
        result = find_numbers(None)
    assert str(error.value) == "numbers obj is not type of list."

    with pytest.raises(Exception) as error:
        result = find_numbers([])
    assert str(error.value) == "size of number can't zero"
