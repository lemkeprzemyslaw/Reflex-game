const createBoard = (elementId, size) => {
  const board = document.querySelector(`#${elementId}`);
  const table = document.createElement("table");

  for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");

      td.className = 'tile';
      tr.append(td)
    }
    table.className = 'game__board';
    table.append(tr)
  }

  board.append(table)
};

export default createBoard;