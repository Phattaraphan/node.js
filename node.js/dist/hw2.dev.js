"use strict";

var A_Z = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var mod2;
var split = " ";

function print() {
  return regeneratorRuntime.async(function print$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          for (i = 0; i < A_Z.length; i++) {
            if (i % 2 === 0) {
              mod2 = A_Z[i];
            }

            i++;
            split += A_Z[i] + " " + mod2 + " ";
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(console.log(split));

        case 4:
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("Error");

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

print();