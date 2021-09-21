const TvModel = require("../models/tvModel");
const userModel = require("../models/userModel");

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
      return res.status(500).json({ msg: "Tv show already being tracked." });
    } else {
      tvShow.save(
        await function (err) {
          if (err) {
            res
              .status(500)
              .json({ msg: "Error in tvController save function", err });
          } else {
            res.json({ msg: "TV Show Saved" }).status(200);
          }
        }
      );
    }
  } catch (error) {
    console.log("error tracking tv show", error);
  }
};

exports.getTrackedShows = async (req, res) => {
  try {
    const currentUser = await userModel.find({ email: req.params.email });
    const currentUserId = currentUser[0]._id;
    const myTrackedShows = await TvModel.find({ trackedBy: currentUserId });
    return res.status(200).json(myTrackedShows);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteShow = async (req, res) => {
  console.log(req.params);

  // TvModel.findByIdAndDelete(req.params.id)
  //   .then(() => res.json("Show no longer being tracked"))
  //   .catch((err) => res.status(400).json("Error: " + err));
};
