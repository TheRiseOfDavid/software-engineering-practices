# Lab 5.4
# findNumbers.py

def find_numbers(numbers):
    if not isinstance(numbers, list):
        raise TypeError("numbers obj is not type of list.")
    if len(numbers) == 0:
        raise ValueError("size of number can't zero")

    result = []
    for num in numbers:
        if num > 0:
            result.append("positive")
        elif num < 0:
            result.append("negative")
        else:
            result.append("zero")
    return result
