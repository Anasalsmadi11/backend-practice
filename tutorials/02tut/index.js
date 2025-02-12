// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'));// this instead of writing the path manually

// fs.readFile("./files/starter.txt", "utf-8", (err, data) => {
//   //   By specifying "utf-8" in the fs.readFile() function, you're telling Node.js how to interpret the raw binary data of the file as readable text. Without this encoding, the data would be read as a Buffer (a series of raw binary bytes).
//   if (err) throw new Error();
//   console.log(data);
//   //   console.log(data.toString()); or put "utf-8" without the toString method
// });

console.log(path.join(__dirname, "files", "starter.txt")); // Output: /home/anas/backend-practice/tutorials/tut02/files/starter.txt

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "welcome to the new file",
//   (err) => {
//     if (err) console.log(err);
//     console.log("new file created");
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\n yes it is",
//       (err) => {
//         if (err) console.log("error happened");
//         console.log(
//           "if you put a new file name it will create a new file with the message, if you put an old file it will update it and add the new message to it"
//         );

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newReply.txt"),
//           (err) => {
//             if (err) console.log("name couldn't be changed");
//             console.log("file name changed");
//           }
//         );
//       }
//     );
//   }
// );

// the functin above cuse callback hell and it can be written in another way:

const readFiles = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );
    // console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\n file appended"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "newFileName.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "newFileName.txt"),
      "utf-8"
    );
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
};
readFiles();

// fs.appendFile(
//   path.join(__dirname, "files", "test.txt"),
//   "\n\n yes it is",
//   (err) => {
//     if (err) console.log("error happened");
//     console.log("append complete");
//   }
// );

process.on("uncaughtException", (err) => {
  console.log("there was an error", err);
  process.exit(1);
});
