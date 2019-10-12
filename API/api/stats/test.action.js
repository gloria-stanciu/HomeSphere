const date_fns = require('date-fns');
const mongoose = require('mongoose');
const d3 = require('d3');
const Device = mongoose.model('Device');
const Sensor = mongoose.model('Sensor');

async function mean(id) {
    try {
        const sensor = await Sensor.findById(id);
        let sensorData = [];
        for (const reading of sensor.readings) {
            sensorData.push(reading.data);
        }
        return d3.mean(sensorData);
    } catch (err) {
        console.log(err);
    }
}

async function weekData(id, days) {
    try {
        const sensor = await Sensor.findById(id);
        let weekData = [];
        const now = new Date();
        const dateParse = date_fns.parseISO(now.toISOString());
        for (const reading of sensor.readings) {
            if (
                date_fns.isWithinInterval(date_fns.parseISO(reading.date), {
                    start: date_fns.subDays(dateParse, days),
                    end: dateParse,
                })
            )
                weekData.push({ data: reading.data, date: reading.date });
        }
        const min = d3.min(weekData);
        const max = d3.max(weekData);
        result = {
            min: {
                message: `Minimum value from the last ${days} days.`,
                data: min,
            },
            max: {
                message: `Maximum value from the last ${days} days.`,
                data: max,
            },
        };
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function data(id) {
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
        let maxDates = [];
        for (const i of dates) {
            maxDates.push({ date: d3.isoParse(i), data: d3.max(grouped[i]) });
        }
        return maxDates;
    } catch (err) {
        console.log(err);
    }
}

async function callFunctions(req, res, next) {
    try {
        const days = req.body.days;
        const id = req.params.id;
        const meanData = await mean(id);
        const week = await weekData(id, days);
        const getData = await data(id);
        res.status(200).json({
            mean: {
                message: 'Mean value',
                data: meanData,
            },
            week: week,
            dataByDay: getData,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    callFunctions,
    data,
};
