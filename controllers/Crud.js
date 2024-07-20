const express = require("express");
const { User } = require("../sequelizeConnect");
const router = express.Router();
const Authorization = require("../middleware/Authorization");

// router.get("/protected-route", Authorization, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

router.post("/insert", Authorization, async (req, res) => {
  try {
    const { fname, lname, email } = req.body;

    const insert = await User.create({ fname, lname, email });
    res.status(200).json({ msg: "Inserted :", insert });
  } catch (error) {
    console.log("Error while insrting data", error);
    res.status(500).json({ msg: "Error while inseting" });
  }
});

//get
router.get("/select", Authorization, async (req, res) => {
  try {
    const select = await User.findAll({});
    res.status(200).json({ msg: "All data", select });
  } catch (error) {
    console.log("Error while fetch data", error);
    res.status(500).json({ msg: "Error while fetch" });
  }
});

//findByID
router.get("/select/:id", Authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const select = await User.findByPk(id);

    if (!select) {
      return res.status(404).json({ msg: "No data found in this id :", id });
    }
    return res.status(200).json({ msg: `Selceted by ${id}`, select });
  } catch (error) {
    console.log("Error while fetch data", error);
    res.status(500).json({ msg: "Error while fetch" });
  }
});

//put
router.put("/update/:id", Authorization, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "No data found in this id :", id });
    }

    await User.update(updates, {
      where: { id: id },
    });

    const updated = await User.findByPk(id);

    res.status(200).json({ msg: "Updated successfully", updated });
  } catch (error) {
    console.log("Error while update data", error);
    res.status(500).json({ msg: "Error while update" });
  }
});

//delete
router.delete("/delete/:id", Authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "No data found in this id :", id });
    }

    const deleted = await user.destroy();

    res.status(200).json({ msg: "User deleted successfully", deleted });
  } catch (error) {
    console.log("Error while update data", error);
    res.status(500).json({ msg: "Error while update" });
  }
});

module.exports = router;
