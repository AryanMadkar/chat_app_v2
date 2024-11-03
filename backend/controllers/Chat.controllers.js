const asyncHandler = require("express-async-handler");
const chatmodels = require("../model/Chatmodel");
const usermodel = require("../model/USermodel");
const { json } = require("express");

const accesschats = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.body;
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    let ischat = await chatmodels
      .find({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: req.user._id } } },
          { users: { $elemMatch: { $eq: userid } } },
        ],
      })
      .populate("users", "-password")
      .populate("latestmessages");

    // Corrected population line
    ischat = await usermodel.populate(ischat, {
      path: "latestmessages.sender",
      select: "name email profilePicture",
    });

    if (ischat.length > 0) {
      res.json(ischat[0]);
    } else {
      let chatdata = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userid],
      };
      try {
        const createchat = await chatmodels.create(chatdata);
        const fullchat = await chatmodels
          .findOne({ _id: createchat._id })
          .populate("users", "-password");
        res.status(200).json(fullchat);
      } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ message: "Server Error" });
      }
    }
  } catch (error) {
    console.error("Error accessing chats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const fetchchats = asyncHandler(async (req, res) => {
  try {
    const { userid } = req.body;
    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const chats = await chatmodels
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestmessages")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await usermodel.populate(results, {
          path: "latestmessages.sender",
          select: "name email profilePicture",
        });
        return results;
      });
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getgroupchats = asyncHandler(async (req, res) => {
  try {
    const { users, name } = req.body;
    if (!users || !name) {
      return res
        .status(400)
        .json({ message: "Users and Group Name are required" });
    }

    let users2;
    try {
      users2 = JSON.parse(users);
    } catch (error) {
      return res.status(400).json({ message: "Invalid users format" });
    }

    if (users2.length < 2) {
      return res
        .status(400)
        .json({ message: "At least three users are required" });
    }
    users2.push(req.user);

    const groupchat = await chatmodels.create({
      chatName: name,
      users: users2,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullgroupchat = await chatmodels
      .findOne({ _id: groupchat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullgroupchat);
  } catch (error) {
    console.error("Error fetching group chats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const renamegroup = asyncHandler(async (req, res) => {
  try {
    const { chatid, newname } = req.body;
    if (!chatid || !newname) {
      return res
        .status(400)
        .json({ message: "Chat ID and New Name are required" });
    }
    const chat = await chatmodels
      .findByIdAndUpdate(chatid, { chatName: newname }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    console.error("Error renaming group:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const addtogroup = asyncHandler(async (req, res) => {
  try {
    const { chatid, userid } = req.body;
    if (!chatid || !userid) {
      return res
        .status(400)
        .json({ message: "Chat ID and User ID(s) are required" });
    }

    // Parse user IDs if `userid` is a JSON string array
    let users2 = Array.isArray(userid) ? userid : [userid];

    if (users2.length < 1) {
      return res
        .status(400)
        .json({ message: "At least one user ID is required" });
    }

    const chat = await chatmodels
      .findByIdAndUpdate(
        chatid,
        { $push: { users: { $each: users2 } } },
        { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error adding users to group:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

const removefromgroup = asyncHandler(async (req, res) => {
  try {
    const { chatid, userid } = req.body;
    if (!chatid || !userid) {
      return res
        .status(400)
        .json({ message: "Chat ID and User ID(s) are required" });
    }

    // Parse user IDs if `userid` is a JSON string array
    let users2 = Array.isArray(userid) ? userid : [userid];

    if (users2.length < 1) {
      return res
        .status(400)
        .json({ message: "At least one user ID is required" });
    }

    const chat = await chatmodels
      .findByIdAndUpdate(chatid, { $pullAll: { users: users2 } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat);
  } catch (error) {
    console.error("Error removing users from group:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  accesschats,
  fetchchats,
  getgroupchats,
  renamegroup,
  addtogroup,
  removefromgroup,
};
