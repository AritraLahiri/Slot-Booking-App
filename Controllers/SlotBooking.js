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
  const userId = req.params.userID;
  let slotID;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.json([{ Deleted: false }]);
      } else {
        slotID = user.dataValues.SlotId;
      }

      return user.destroy();
    })
    .then(() => {
      if (slotID != null) {
        Slot.findByPk(slotID)
          .then((slot) => {
            slot.update({ Remaining: slot.Remaining + 1 });
          })
          .catch((err) => console.log(err));
        res.json([{ Deleted: true }]);
      }
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
