# Lab 4.1
# test_calculateDiscounts.py
from calculateDiscounts import calculate_discounts
import pytest 

def test_calculate_discounts():
    prices = [120, 80, 70, 30, 50]
    membership_levels = ['Gold', 'Gold', 'Silver', 'Silver', 'Bronze']
    expected_discounted_prices = ['96.00', '72.00', '59.50', '28.50', '50.00']

    result = calculate_discounts(prices, membership_levels)

    assert result == expected_discounted_prices

def test_calculateDiscounts_empty_input():
    with pytest.raises(Exception) as error:
        result = calculate_discounts(None, None)
    assert str(error.value) == "Prices and membership levels must be provided as non-empty lists."

def test_calculateDiscounts_sizeNotEqual_input():
    with pytest.raises(Exception) as error:
        prices = [120, 80, 70, 30]
        membership_levels = ['Gold', 'Gold', 'Silver', 'Silver', 'Bronze']
        result = calculate_discounts(prices, membership_levels)
    assert str(error.value) == "Prices and membership levels lists must have the same length."


