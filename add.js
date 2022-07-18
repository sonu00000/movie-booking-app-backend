function add(mat1, mat2) {
  const res = [];
  for (let i = 0; i < mat1.length; i++) {
    const arr = [];
    for (let j = 0; j < mat1[0].length; j++) {
      arr[j] = mat1[i][j] + mat2[i][j];
    }
    res.push(arr);
  }
  return res;
}

console.log(
  add(
    [
      [4, 5],
      [6, 7],
    ],
    [
      [1, 2],
      [3, 8],
    ]
  )
);

console.log(
  add(
    [
      [12, 13, 18],
      [14, 15, 20],
    ],
    [
      [20, 40, 15],
      [50, 60, 11],
    ]
  )
);
