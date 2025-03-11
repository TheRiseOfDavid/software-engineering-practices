import pytest
from unittest import mock 
from unittest.mock import MagicMock
from data_processor import process_and_store_data

@mock.patch("data_processor.Database")
def test_process_and_store_data_success(MockDB):
    db = MockDB.return_value
    db.get_all_data.return_value = [1,2,3]
    
    result = process_and_store_data([1,2,3])
    assert result == 6




