const tvModel = require("../models/tvModel");
const TvModel = require("../models/tvModel");
const userModel = require("../models/userModel");
const sendNotification = require("../utilities/pushNotifications");

exports.trackTvShow = async (req, res, next) => {
  try {
    const {
      title,
      id,
      firstAirDate,
      lastAirDate,
      nextAirDate,
      noEpisodes,
      noSeasons,
      trackedBy,
    } = req.body;

    const currentUser = await userModel.find({ email: trackedBy });
    if (!currentUser) return res.status(404).json({ msg: "User not found" });
    const currentUserId = currentUser[0]._id;
    const existingTvShows = await TvModel.find({ id: id });
    const trackedArr = existingTvShows.map((item) => {
      return item.trackedBy.toString();
    });

    let tvShow = new TvModel({
      title,
      id,
      firstAirDate,
      lastAirDate,
      nextAirDate,
      noEpisodes,
      noSeasons,
      trackedBy: currentUserId,
    });

    if (trackedArr.includes(tvShow.trackedBy.toString())) {
      // sendNotification(currentUser[0].expoPushToken, "Already Tracked");
      return res.status(500).json({ msg: "Tv show already being tracked." });
    } else {
      tvShow.save(
        await function (err) {
          if (err) {
            res
              .status(500)
              .json({ msg: "Error in tvController save function", err });
          } else {
            // sendNotification(
            //   currentUser[0].expoPushToken,
            //   "Saved Successfully"
            // );
            res.json({ msg: "TV Show Saved", tvShow }).status(200);
          }
        }
      );
    }
  } catch (error) {
    console.log("error tracking tv show", error);
  }
};

exports.appendSchedule = async (req, res) => {
  try {
    const { _id, identifier } = req.params;
    const targetShow = await tvModel.findById(_id);
    console.log(targetShow);
    targetShow.identifier = identifier;
    await targetShow.save();
    return res.status(200).json({ msg: "test" });
  } catch (error) {
    console.log(error);
  }
};

exports.getTrackedShows = async (req, res) => {
  try {
    const currentUser = await userModel.find({ email: req.params.email });
    const currentUserId = currentUser[0]._id;
    const myTrackedShows = await TvModel.find({ trackedBy: currentUserId });
    // console.log(myTrackedShows);
    return res.status(200).json(myTrackedShows);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteShow = async (req, res) => {
  try {
    const currentUser = await userModel.find({ email: req.params.email });
    const currentUserId = currentUser[0]._id;
    const target = await TvModel.find({
      trackedBy: currentUserId,
      id: req.params.id,
    });
    const targetId = target[0]._id;
    await TvModel.findByIdAndDelete(targetId);
    const updatedList = await TvModel.find({
      trackedBy: currentUserId,
    });
    return res
      .status(200)
      .json({ msg: "Show no longer being tracked", data: updatedList });
  } catch (error) {
    console.log(error);
  }
};
