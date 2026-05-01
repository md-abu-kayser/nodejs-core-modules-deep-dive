// const args = process.argv;

// process.arg[0] = node path
// process.arg[1] = file path
// process.arg[2] = first actual argument.

// const name = args[2] || "guest";
// const time = new Date().getHours();

// if else
// let greeting;
// if (time < 12) {
//   greeting = "Good Morning";
// } else if (time < 18) {
//   greeting = "Good Afternoon";
// } else if (time < 22) {
//   greeting = "Good evening";
// } else {
//   greeting = "Good Night";
// }

// console.log(`${greeting} ${name}`);

// function greeting

// function getGreetingHours(hour) {
//   if (hour < 12) return "Good Morning";
//   if (hour < 18) return "Good Afternoon";
//   if (hour < 22) return "Good Evening";
//   return "Good Night";
// }

// const name = process.argv[2] || "guest";
// const hour = new Date().getHours();

// console.log(`${getGreetingHours(hour)} ${name}`);

// Ternary operator

const hour = new Date().getHours();

const greeting =
  hour < 12
    ? "Good Morning"
    : hour < 18
      ? "Good Afternoon"
      : hour < 22
        ? "Good Evening"
        : "Good Night";

console.log(`${greeting} ${process.argv[2] || "guest"}`);
