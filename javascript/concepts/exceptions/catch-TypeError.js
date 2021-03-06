const second = (obj) => {
  obj.clearlyNonExistentMethod();
}

const first = () => {
  let x = { a: 1, b: "2", c: [3] };
  second(x);
}

try {
  first();
} catch (e) {
  console.log("Error Type:       ", e.name);
  console.log("Error Message:    ", e.message);
  console.log("Error stack type: ", typeof e.stack);
}
