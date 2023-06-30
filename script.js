const items = document.querySelectorAll('.item')
const containers = document.querySelectorAll('.container')

items.forEach(item => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging')
  })
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging')
  })
})

// виконується на тому контейнері, на який навів користувач
containers.forEach(container => {
  container.addEventListener('dragover', (e) => {
    // для того, щоб з'являвся курсор 
    e.preventDefault()
    // отримуємо елемент котрий йде після курсору
    const nextElement = getNextElementAfterCursor(container, e.clientY)
    // обирається елемент котрий ми взяли
    const draggable = document.querySelector('.dragging')
    if (nextElement == null) {
      // якщо слідуючого елемента немає, курсор знаходиться в кінці, то просто додаємо елемент в список
      container.appendChild(draggable)
    } else {
      // вставляємо перед елементом корий стоїть стідуючим після курсору
      container.insertBefore(draggable, nextElement)
    }
  })
})

// шукаємо елемент котрий розташований після нашого курсору миші
function getNextElementAfterCursor(container, Y) {
  // отримуємо всі елементи крім того котрий переносимо
  const elements = [...container.querySelectorAll('.item:not(.dragging)')]
  return elements.reduce((closest, child) => {
    // отримуємо інформацію про елемент
    const box = child.getBoundingClientRect()
    // вимірюємо відступ між курсором та центром елемента
    const offset = Y - box.top - box.height / 2
    // якщо відступ має позитивне значення, то курсор знаходиться під елементом, цю поведінку ми...
    // нам потрібно щоб відступ був від'ємним, тому що це означає що курсор над елементом
    // offset > closest.offset - умова котра знаходить найменший відступ, отже найближчий елемент
    if (offset < 0 && offset > closest.offset) {
      // Якщо відстань менша за попередню, зберігаємо поточний елемент як найближчий
      return { offset: offset, element: child }
    } else {
      // Якщо відстань більша або рівна, залишаємо поточний найближчий елемент
      return closest
    } // Початкове значення відступу найближчого елемента - негативна нескінченність
  }, { offset: Number.NEGATIVE_INFINITY }).element
}