const TvModel = require("../models/tvModel");

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

    let tvShow = new TvModel({
      title,
      id,
      firstAirDate,
      lastAirDate,
      nextAirDate,
      noEpisodes,
      noSeasons,
      trackedBy,
    });
    //TODO optimize by building on 'trackedBy' instead of creating new entry
    const existingTvShows = await TvModel.find({ id: id });
    let trackedArr = existingTvShows.map((item) => {
      return item.trackedBy.toString();
    });
    if (
      existingTvShows !== null &&
      trackedArr.includes(tvShow.trackedBy[0].toString())
    ) {
      return res.status(500).json({ msg: "Tv show already being tracked." });
    }
    tvShow.save(
      await function (err) {
        if (err) {
          res.status(500).json({ msg: "Error in tvController save function" });
        } else {
          res.json({ msg: "TV Show Saved" }).status(200);
        }
      }
    );
  } catch (error) {
    console.log("error tracking tv show", error);
  }
};
