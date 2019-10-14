const date_fns = require('date-fns');
const mongoose = require('mongoose');
const d3 = require('d3');
const Device = mongoose.model('Device');
const Sensor = mongoose.model('Sensor');

async function meanOfSensorData(id) {
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

async function minMaxOfPeriod(id, days) {
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

async function maxValueOfEveryDay(id) {
    try {
        const sensor = await Sensor.findById(id);
        let dayValue = [];
        const now = new Date();
        const dateParse = date_fns.parseISO(now.toISOString());
        for (const reading of sensor.readings) {
            const date = reading.date.slice(0, 10);
            if (
                date_fns.isWithinInterval(date_fns.parseISO(date), {
                    start: date_fns.subDays(dateParse, 30),
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

async function meanValuesOfPeriod(id, startTime, type) {
    let interval = [];
    const stopTime = new Date();
    const stopTimeParse = date_fns.parseISO(stopTime.toISOString());
    try {
        const sensor = await Sensor.findById(id);

        if (type === 'months') {
            for (const reading of sensor.readings) {
                const date = reading.date.slice(0, 13);
                if (
                    date_fns.isWithinInterval(date_fns.parseISO(date), {
                        start: date_fns.subMonths(stopTimeParse, startTime),
                        end: stopTimeParse,
                    })
                )
                    interval.push({
                        date: date_fns.parseISO(date),
                        data: reading.data,
                    });
            }
        } else if (type === 'days') {
            for (const reading of sensor.readings) {
                const date = reading.date.slice(0, 13);
                console.log(date);
                console.log(date_fns.parseISO(date));
                if (
                    date_fns.isWithinInterval(date_fns.parseISO(date), {
                        start: date_fns.subDays(stopTimeParse, startTime),
                        end: stopTimeParse,
                    })
                )
                    interval.push({
                        date: date_fns.parseISO(date),
                        data: reading.data,
                    });
            }
        } else if (type === 'hours') {
            for (const reading of sensor.readings) {
                const date = reading.date.slice(0, 13);
                console.log(date);
                console.log(date_fns.parseISO(date));
                if (
                    date_fns.isWithinInterval(date_fns.parseISO(date), {
                        start: date_fns.subHours(stopTimeParse, startTime),
                        end: stopTimeParse,
                    })
                )
                    interval.push({
                        date: date_fns.parseISO(date),
                        data: reading.data,
                    });
            }
        }

        const grouped = interval.reduce((acc, value) => {
            let { date, data } = value;
            return {
                ...acc,
                [date]: [...(acc[date] || []), data],
            };
        }, {});
        const dates = Object.keys(grouped);
        let meanDates = [];
        for (const i of dates) {
            meanDates.push({ date: d3.isoParse(i), data: d3.mean(grouped[i]) });
        }
        return meanDates;
    } catch (err) {
        return console.log(err);
    }
}

async function callFunctions(req, res, next) {
    try {
        const startTime = req.body.startTime;
        const type = req.body.type;
        const days = req.body.days;
        const id = req.params.id;
        const meanData = await meanOfSensorData(id);
        const minMaxPeriod = await minMaxOfPeriod(id, days);
        const getData = await maxValueOfEveryDay(id);
        const meanValuesOfGivenPeriod = await meanValuesOfPeriod(
            id,
            startTime,
            type
        );
        res.status(200).json({
            mean: {
                message: 'Mean value of sensor data',
                data: meanData,
            },
            minMax: minMaxPeriod,
            maxValue: {
                message: 'Max value of sensor data for every day',
                result: getData,
            },
            meanValuesOfGivenPeriod: {
                message: 'Mean values of every hour in the given period',
                result: meanValuesOfGivenPeriod,
            },
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    callFunctions,
};
