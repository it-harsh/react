import React, { useState } from 'react';

function ArrayInsideObjectTuteDudeHelp() {
  const [selectedFruits, setSelectedFruits] = useState([]);
 
  const handleCheckboxChange = (e) => {
    const fruitName = e.target.value;
    if (e.target.checked) {
      // Add the selected fruit to the list
      setSelectedFruits([...selectedFruits, fruitName]);
    } else {
      // Remove the selected fruit from the list
      setSelectedFruits(selectedFruits.filter(fruit => fruit !== fruitName));
    }
  };
 
  const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Orange'];

  return (
    <div>
      <h2>Select Fruits:</h2>
      <form>
        {fruits.map(fruit => (
          <label key={fruit}>
            <input
              type="checkbox"
              value={fruit}
              checked={selectedFruits.includes(fruit)}
              onChange={handleCheckboxChange}
            />
            {fruit}
          </label>
        ))}
      </form>
      <h2>Selected Fruits:</h2>
      <ul>
        {selectedFruits.map(fruit => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArrayInsideObjectTuteDudeHelp;