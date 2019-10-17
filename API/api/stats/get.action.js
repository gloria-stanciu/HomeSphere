const date_fns = require('date-fns');
const mongoose = require('mongoose');
const d3 = require('d3');
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
            min: min,
            max: max,
        };
        return result;
    } catch (err) {
        console.log(err);
    }
}

// function rand(min, max) {
//     if (min == null && max == null) return 0;

//     if (max == null) {
//         max = min;
//         min = 0;
//     }
//     return min + Math.floor(Math.random() * (max - min + 1));
// }

// async function insertData(req, res, next) {
//     try {
//         const id = req.params.id;
//         const sensor = await Sensor.findById(id);
//         let newData = [];
//         const start = date_fns.format(
//             new Date(2019, 01, 01),
//             "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
//         );
//         for (
//             let i = date_fns.format(
//                 new Date(2019, 01, 01),
//                 "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
//             );
//             i <=
//             date_fns.format(
//                 new Date(2019, 10, 6),
//                 "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
//             );
//             date_fns.addDays(date_fns.parseISO(start), i)
//         ) {
//             // console.log(i);
//             newData.push({
//                 count: rand(18, 24),
//                 date: i,
//             });
//         }
//         newData.forEach(async element => {
//             await sensor.updateOne({ $push: { readings: element } });
//         });
//         const a = await Sensor.findById(id);

//         return res.status(200).send(a);
//     } catch (err) {
//         next(err);
//     }
// }

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
            maxDates.push({ date: d3.isoParse(i), count: d3.max(grouped[i]) });
        }
        return maxDates;
    } catch (err) {
        console.log(err);
    }
}

async function valuesOfPeriod(id, startTime, type) {
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
        let selectedValues = [];
        for (const i of dates) {
            selectedValues.push({
                date: d3.isoParse(i),
                mean: d3.mean(grouped[i]),
                min: d3.min(grouped[i]),
                max: d3.max(grouped[i]),
            });
        }
        return selectedValues;
    } catch (err) {
        return console.log(err);
    }
}

async function callFunctions(req, res, next) {
    try {
        const startTime = req.query.startTime;
        const type = req.query.type;
        const days = req.query.days;
        const id = req.params.id;
        const meanData = await meanOfSensorData(id);
        const minMaxPeriod = await minMaxOfPeriod(id, days);
        const getData = await maxValueOfEveryDay(id);
        const valuesOfGivenPeriod = await valuesOfPeriod(id, startTime, type);
        res.status(200).json({
            mean: meanData,
            minMax: minMaxPeriod,
            maxValue: getData,
            valuesOfGivenPeriod: valuesOfGivenPeriod,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    callFunctions,
    // insertData,
};
