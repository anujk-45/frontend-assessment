import React, { useState, useRef } from 'react';

function ChipComponent() {
  const [items, setItems] = useState(["Apple","Apple 2", "Banana", "Orange", "Grapes", "Watermelon", "Strawberry", "Mango", "Pineapple", "Kiwi", "Peach"]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [highlightedChip, setHighlightedChip] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    console.log('In Here');
    setInputValue(event.target.value);
    setFilteredItems(
      items.filter((item) => item.toLowerCase().startsWith(event.target.value.toLowerCase()))
    );
  };

  const handleInputKeyDown = (event) => {
    setFilteredItems([])
    if (event.key === 'Backspace') {
      if (inputValue === '' && !highlightedChip) {
        const lastChip = chips[chips.length - 1];
        setHighlightedChip(lastChip); // Highlight the last chip
      } else if (highlightedChip) {
        // Delete highlighted chip
        setItems([...items, highlightedChip])
        setChips(chips.filter((i) => i !== highlightedChip));
        setHighlightedChip(null);
        inputRef.current.blur();
      } else {
        setHighlightedChip(null);
      }
    }
  };

  const handleItemClick = (item) => {
    console.log('Inside handleItemClick');
    setChips([...chips, item]); // Add item to chips
    setItems(items.filter((i) => i !== item)); // Remove item from list
    setFilteredItems([]); // Clear filtered items
    setInputValue(''); // Clear input field
    console.log(chips);
  };

  const handleChipRemove = (item) => {
    setChips(chips.filter((i) => i !== item)); // Remove item from chips
    setItems([...items, item]); // Add item back to list
  };

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((item) => (
          <span
            key={item}
            className={item === highlightedChip ? 'chip highlighted' : 'chip'}
          >
            {item} <button onClick={() => handleChipRemove(item)}>x</button>
          </span>
        ))}
      </div>
      <div className='input-list-area'>
        <input
          type="text"
          placeholder="Enter items"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setFilteredItems(items)}
          onBlur={()=> setFilteredItems([])}
          className="chip-input"
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        <ul className="chip-list">
          {filteredItems.map((item) => (
            <li className='chip-list-item' key={item} onMouseDown={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChipComponent;