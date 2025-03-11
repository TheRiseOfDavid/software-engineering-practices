import pytest 
from unittest import mock
from data_processor import get_and_process_data

@mock.patch("data_processor.fetch_data_from_api", return_value=[1,2,3])
def test_get_and_process_data_normal(mock):
    result = get_and_process_data("https://example.com/")
    assert result == 6

@mock.patch("data_processor.fetch_data_from_api", return_value=None)
def test_get_and_process_data_none(mock):
    result = get_and_process_data("https://example.com/")
    assert result == None

