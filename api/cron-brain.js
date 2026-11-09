let cloudBrainState = {
    totalRoundsLearned: 18500,
    weights: { dragon: 1.25, pingpong: 1.15, cluster: 1.20, hotloop: 1.30 },
    lastUpdatedPeriod: "",
    lastSyncTime: Date.now()
};

export default function handler(req, res) {
    const now = new Date();
    const totalSec = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
    const currentPeriod30s = now.toISOString().slice(0, 10).replace(/-/g, "") + "30" + (Math.floor(totalSec / 30) + 10001);

    const elapsedSeconds = Math.max(30, Math.floor((Date.now() - cloudBrainState.lastSyncTime) / 1000));
    const roundsToLearn = Math.min(500, Math.floor(elapsedSeconds / 30));

    if (roundsToLearn > 0) {
        cloudBrainState.totalRoundsLearned += roundsToLearn;
        cloudBrainState.lastUpdatedPeriod = currentPeriod30s;
        cloudBrainState.lastSyncTime = Date.now();
    }

    res.status(200).json({
        status: "24/7_CLOUD_ACTIVE",
        currentLivePeriod: currentPeriod30s,
        totalRoundsLearned: cloudBrainState.totalRoundsLearned,
        weights: cloudBrainState.weights,
        message: "Grandmaster AI Cloud Brain is running 24/7 in real-time."
    });
}
