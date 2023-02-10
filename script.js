// Mathematical Shapes assignment

const findDiagonalOfSquare = (side) => {
  return Math.sqrt(2) * side;
};

const findAreaOfTriangle = (sideOne, sideTwo, sideThree) => {
  let semiPerimeter = (sideOne + sideTwo + sideThree) / 2;
  return Math.sqrt(
    semiPerimeter *
      (semiPerimeter - sideOne) *
      (semiPerimeter - sideTwo) *
      (semiPerimeter - sideThree)
  );
};

const findCircumferenceOfCircle = (radius) => {
  return 2 * Math.PI * radius;
};

const findSurfaceAreaOfCircle = (radius) => {
  return Math.PI * radius ** 2;
};

console.log(
  `diagonal of a square with side of 9 is ${findDiagonalOfSquare(9)}`
);

console.log(
  `are of triangle with sides equal to 5, 6 and 7 is ${findAreaOfTriangle(
    5,
    6,
    7
  )}`
);

console.log(
  `circumference of circle with radius of 4 is ${findCircumferenceOfCircle(4)}`
);

console.log(
  `surface area of circle with radius of 4 is ${findSurfaceAreaOfCircle(4)}`
);

// Conditional Statements and Loops assignment

const compareIntegers = (integerOne, integerTwo) => {
  let message = `Comparing integers. The values entered are: ${integerOne} and ${integerTwo}. `;
  if (!Number.isInteger(integerOne) || !Number.isInteger(integerTwo)) {
    message += 'Please enter integers!';
  } else if (integerOne === integerTwo) {
    message += 'Integers are equal';
  } else {
    message += `The higher integer is ${Math.max(integerOne, integerTwo)}`;
  }
  return message;
};

const checkIfIntegerEvenOrOdd = (integer) => {
  let message = `Checking if integer ODD or EVEN. The value provided is ${integer}. `;
  if (!Number.isInteger(integer)) {
    message += 'Please enter an integer!';
  }
  else {
    if (integer % 2 === 0) {
      message += 'This is an EVEN integer';
    }
    else {
      message += 'This is an ODD integer';
    }
  }
  return message
};

// console.log(compareIntegers(1, 2));
// console.log(compareIntegers(1.5, 2));
// console.log(compareIntegers('One', 2));
// console.log(compareIntegers(3, 3));
// console.log(compareIntegers(600, -300));

// console.log(checkIfIntegerEvenOrOdd('Three'));
// console.log(checkIfIntegerEvenOrOdd(4.5));
// console.log(checkIfIntegerEvenOrOdd(101));
// console.log(checkIfIntegerEvenOrOdd(1000));

let arr = [ 1, 2, 300, 20, 505, 3000, 11, 404, 14, 333, 444, 5055, 5051];

let newarr = arr.map(elt => elt += 1);

console.log(newarr);