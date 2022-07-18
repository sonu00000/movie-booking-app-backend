function countMatches(items, key, value) {
  let col = null;
  if (key === "type") {
    col = 0;
  } else if (key === "color") {
    col = 1;
  } else if (key === "name") {
    col = 2;
  }

  let count = 0;
  for (let row = 0; row < items.length; row++) {
    console.log(items[row][col]);
    // if (items[row][col] === value) {
    //   count++;
    // }
  }
  return count;
}

console.log(
  countMatches([
    ["phone", "blue", "pixel"],
    ["computer", "silver", "lenovo"],
    ["phone", "gold", "iphone"],
    "color",
    "silver",
  ])
);
