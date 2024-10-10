app.get('/api/combined-data', async (req, res) => {
    const { month } = req.query;

    try {
        // Fetch data from all 3 APIs
        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`/api/statistics?month=${month}`),
            axios.get(`/api/bar-chart?month=${month}`),
            axios.get(`/api/pie-chart?month=${month}`)
        ]);

        res.json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
