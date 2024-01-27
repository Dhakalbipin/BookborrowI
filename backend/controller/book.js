const { userInfo } = require("os");
const Book = require("../models/book");
const fs = require("fs").promises;
module.exports = {
  async bookList(req, res, next) {
    try {
      const books = await Book.find({});
      res.json(books);
    } catch (error) {
      next(error);
    }
  },
  async createBook(req, res, next) {
    try {
      const loginUser = req.user;
      const {
        bookName,
        author,
        genre,
        stock,
        bookValue,
        vendorName,
        amount,
        rating,
        description,
      } = req.body;
      console.log(req.user);
      let picturePath = null;
      // check if a file is uploaded
      if (req.files && req.files.photo) {
        const picture = req.files.photo;
        picture.name = picture.name.replaceAll(" ", "");
        picturePath = `public/images/user/${picture.name}`;
        // Save the picture to the specified path
        await picture.mv(picturePath);
        picturePath = picturePath.slice(6);
      }
      const newBook = new Book({
        bookName,
        author,
        genre,
        stock,
        bookValue,
        vendorName,
        amount,
        rating,
        description,
        photo: picturePath,
        userId: loginUser._id,
      });
      const savedBook = await newBook.save();
      // loginUser.userHistory.concat(loginUser._id);
      res.status(201).json(savedBook);
    } catch (error) {
      next(error);
    }
  },
  // get book byid
  async getBook(req, res, next) {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).jason({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      const {
        bookName,
        author,
        genre,
        stock,
        bookValue,
        vendorName,
        amount,
        picture,
        rating,
        description,
      } = req.body;
      let picturePath = null;

      // Check if a file is uploaded
      if (req.files && req.files.picture) {
        const picture = req.files.picture;
        const picturePath = `public/images/user/${picture.name}`;

        // Save the new picture to the specified path
        await picture.mv(picturePath);

        updatedUser.picture = picturePath;
      }

      const users = await User.findByIdAndUpdate(
        id,
        {
          bookName,
          author,
          genre,
          stock,
          bookValue,
          vendorName,
          amount,
          picture: picturePath,
          rating,
          description,
        },

        { new: true }.exec()
      );
      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  // Delete a book by ID
  async deleteBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookToDelete = await Book.findById(id);
      //unlink image urls
      if (!bookToDelete) {
        return res.status(404).json({ error: "Book not found" });
      }
      if (bookToDelete.photo) {
        const publicPicturePath = `public/${bookToDelete.photo}`;

        // Unlink the picture using the modified path
        await fs.unlink(publicPicturePath);
      }

      await Book.findByIdAndRemove(id);
      console.log("test");
      res.status(204).send("deleted");
    } catch (error) {
      next(error);
    }
  },
};
