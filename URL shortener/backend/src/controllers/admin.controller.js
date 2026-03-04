import { User } from "../model/user.model.js";

export const getUserStats = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const stats = await User.aggregate([
      {
        $facet: {
        total : [
            {$count : "count"}
        ],
          totalMonthlystats: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(year, 0, 1),
                  $lte: new Date(year, 11, 31),
                },
              },
            },
            {
              $group: {
                _id: { $month: "$createdAt" },
                totalUser: { $sum: 1 },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
        },
      },
    ]);
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const TotalNumberOfUser = async (req, res) => {
  try {
    const user = await User.find()
      .sort({ createdAt: -1 })
      .select("-password -refreshToken");

    return res.status(200).json({ user, count: user.length });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
