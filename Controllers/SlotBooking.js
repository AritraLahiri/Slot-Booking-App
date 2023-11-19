const Slot = require("../Models/Slot");
const User = require("../Models/User");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let Remaining = Slot.Remaining;

exports.BookSlot = (req, res, next) => {
  const Name = req.body.userName;
  const Email = req.body.userEmail;
  const SlotID = req.body.slotID;
  Slot.findByPk(SlotID)
    .then((slot) => {
      slot.update({ Remaining: slot.Remaining - 1 });
    })
    .catch((err) => console.log(err));

  User.create({
    Email,
    Name,
    SlotId: SlotID,
  });
  return res.json([]);
};
exports.getBookings = (req, res, next) => {
  Slot.findAll({ include: User })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};
exports.deleteSlot = (req, res, next) => {
  const slotId = req.params.slotID;
  const userId = req.params.userID;
  console.log(slotId);
  Slot.update(
    { Remaining: Remaining + 1 },
    {
      where: {
        id: slotId,
      },
    }
  )
    .then(() => {
      return User.findByPk(userId);
    })
    .then((user) => {
      if (!user) {
        res.json([{ Deleted: false }]);
      }
      return user.destroy();
    })
    .then(() => {
      res.json([{ Deleted: true }]);
    })
    .catch((err) => console.log(err));
};

exports.getSlots = (req, res, next) => {
  Slot.findAll({ where: { Remaining: { [Op.gt]: 0 } } })
    .then((slot) => {
      res.json(slot);
    })
    .catch((err) => console.log(err));
};
// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   Product.create({
//     title: title,
//     price: price,
//     imageUrl: imageUrl,
//     description: description,
//   })
//     .then(() => res.redirect("/"))
//     .catch((err) => console.log(err));
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => console.log(err));
// };
