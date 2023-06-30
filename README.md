# Drag and Drop Functionality

<b>Demo</b>: https://drag-n-drop-between-boards.netlify.app/

This repository demonstrates a basic implementation of drag and drop functionality using HTML, CSS, and JavaScript. The code allows users to drag and drop items within different containers on a web page. Here's how you can achieve this functionality:

## Techniques Used

1. **Drag Events**: The code utilizes the HTML Drag and Drop API, which provides a set of events (`dragstart`, `dragend`, `dragover`, etc.) that allow you to control the drag and drop behavior.

2. **CSS Class Manipulation**: By adding and removing CSS classes dynamically, the code visually represents the dragging state of an item. The `dragging` class is added to the item being dragged, allowing for custom styling during the drag operation.

3. **Event Listeners**: Event listeners are attached to the items and containers to listen for drag-related events and perform the necessary actions accordingly. These listeners enable interaction and manipulation of the draggable items.

4. **Insertion Point Calculation**: The `getNextElementAfterCursor` function calculates the insertion point for the dragged item within a container. It determines the nearest element based on the cursor's position and the existing elements in the container. This technique helps ensure proper placement when dragging items.

## Code

```javascript
const items = document.querySelectorAll('.item')
const containers = document.querySelectorAll('.container')

items.forEach((item) => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging')
  })
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging')
  })
})

// Executed on the container where the user hovers
containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    // To display the cursor properly
    e.preventDefault()
    // Get the element that is located after the cursor
    const nextElement = getNextElementAfterCursor(container, e.clientY)
    // Get the element that we move
    const draggable = document.querySelector('.dragging')
    if (nextElement == null) {
      // If there is no next element, the cursor is at the end, so we simply append the item to the list
      container.appendChild(draggable)
    } else {
      // Insert before the element that comes after the cursor
      container.insertBefore(draggable, nextElement)
    }
  })
})

// Find the element located after the mouse cursor
function getNextElementAfterCursor(container, Y) {
  // Get all elements except the one being dragged
  const elements = [...container.querySelectorAll('.item:not(.dragging)')]
  return elements.reduce(
    (closest, child) => {
      // Get information about the element
      const box = child.getBoundingClientRect()
      // Measure the offset between the cursor and the center of the element
      const offset = Y - box.top - box.height / 2
      // If the offset is positive, the cursor is below the element, which is the behavior we want...
      // We need the offset to be negative, indicating that the cursor is above the element
      // offset > closest.offset - condition to find the smallest offset, hence the closest element
      if (offset < 0 && offset > closest.offset) {
        // If the distance is smaller than the previous one, store the current element as the closest
        return { offset: offset, element: child }
      } else {
        // If the distance is greater or equal, keep the current closest element
        return closest
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element
}
```

Feel free to use and modify this code to implement drag and drop functionality in your own projects. Remember to include the necessary HTML structure and CSS styles to support the desired visual layout and interactions.
