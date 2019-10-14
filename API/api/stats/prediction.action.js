const date_fns = require('date-fns');
const mongoose = require('mongoose');
const d3 = require('d3');
const Sensor = mongoose.model('Sensor');

async function getHistory(id) {
    try {
        const sensor = await Sensor.findById(id);
        let dayValue = [];
        const now = new Date();
        const dateParse = date_fns.parseISO(now.toISOString());
        for (const reading of sensor.readings) {
            const date = reading.date.slice(0, 10);
            if (
                date_fns.isWithinInterval(date_fns.parseISO(date), {
                    start: date_fns.subDays(dateParse, 14),
                    end: dateParse,
                })
            )
                dayValue.push({ date: date, data: reading.data });
        }
        const grouped = dayValue.reduce((acc, value) => {
            let { date, data } = value;
            return {
                ...acc,
                [date]: [...(acc[date] || []), data],
            };
        }, {});
        const dates = Object.keys(grouped);
        let meanDates = [];
        for (const i of dates) {
            meanDates.push({ date: i, data: d3.mean(grouped[i]) });
        }
        return meanDates;
    } catch (err) {
        console.log(err);
    }
}

function predictFuture(data, newX) {
    const round = n => Math.round(n * 100) / 100;
    const sum = data.reduce(
        (acc, pair) => {
            const x = pair[0];
            const y = pair[1];

            if (y) {
                acc.x += x;
                acc.y += y;
                acc.squareX += x * y;
                acc.product += x * y;
                acc.length += 1;
            }
            return acc;
        },
        { x: 0, y: 0, squareX: 0, product: 0, length: 0 }
    );

    const rise = sum.length * sum.product - sum.x * sum.y;
    const run = sum.length * sum.squareX - sum.x * sum.x;

    const gradient = run === 0 ? null : round(rise / run);
    const intercept = round(
        sum.y / sum.length - (gradient * sum.x) / sum.length
    );

    return round(gradient * newX + intercept);
}

async function predict(req, res, next) {
    const startTime = new Date();
    const id = req.params.id;
    try {
        let history = await getHistory(id);
        const now = new Date();

        let future = [
            { date: date_fns.format(now, 'yyyy-MM-dd') },
            { date: date_fns.format(date_fns.addDays(now, 1), 'yyyy-MM-dd') },
            { date: date_fns.format(date_fns.addDays(now, 2), 'yyyy-MM-dd') },
            { date: date_fns.format(date_fns.addDays(now, 3), 'yyyy-MM-dd') },
            { date: date_fns.format(date_fns.addDays(now, 4), 'yyyy-MM-dd') },
        ];

        const historyIndex = history.map((d, i) => [i, d.data]);
        const futureX = future.map((d, i) => {
            return {
                date: d.date,
                data: predictFuture(historyIndex, historyIndex.length - 1 + i),
            };
        });
        const stopTime = new Date();
        console.log((stopTime - startTime) / 1000);
        return res.status(200).json(futureX);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    predict,
};
