const app = require("./app.js"); //import
const PORT = process.env.PORT || 3000; // insert the port 3000 as optional
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // $ used for calling the variable
});
