const {Salon, User} = require("../models")
const UserStatus = require("../models/values/UserStatus")
const { DateTime } = require("luxon");
const {getBookingsStats} = require("./bookingRepository")

const getActiveSalonByUuid = async (uuid) => {
    let salon;
    try {
        //check if salon exists
        salon = await Salon.findOne({ 
            where: { 
                uuid,
            }
        });
        const salonUser = await User.findOne({
            where: {
                email: salon.email
            }
        })

        if (!(salonUser && salonUser.statusId == UserStatus.ACTIVE.id)) {
            salon = undefined
        }
    } catch (error) {}
    
    return salon
}

const getUserSalonByEmail = async(salonUser) => {
    let salon;
    try {
        //check if salon exists
        salon = await Salon.findOne({ 
            where: { 
                email: salonUser.email,
            }
        });
        const user = await User.findOne({
            where: {
                email: salon.email
            }
        })
        
        if (!(user && user.statusId == UserStatus.ACTIVE.id)) {
            salon = undefined
        }
    } catch (error) {}
    
    return salon
}

const getSalonStats = async(salon, fromDate, toDate) => {
    const toDateTime = toDate ? DateTime.fromISO(toDate) : null
    const lastDateTime = fromDate ? DateTime.fromISO(fromDate) : null
    let lastPreviousDay
    if (lastDateTime) {
        lastPreviousDay = lastDateTime.minus({days: 7}).startOf('day')
    }

    let lastSevenDaysbookings = await getBookingsStats({
        fromDate: lastDateTime ? lastDateTime.toISO() : null,
        toDate: toDateTime ? toDateTime.toISO() : null,
        salon
    })

    let lastFifteenDaysbookings = {}
    if (fromDate && toDate) {
        lastFifteenDaysbookings = await getBookingsStats({
            fromDate: lastPreviousDay.toISO(),
            toDate: lastDateTime.toISO(),
            salon
        })
    }
    
    const finalResult = {}
    for(let key in lastSevenDaysbookings) {
        const currentStats = lastSevenDaysbookings[key]
        const prevStats = lastFifteenDaysbookings[key]
        let state = ""

        if (currentStats == prevStats) {
            state = "NEUTRAL"
        } else if (currentStats < prevStats) {
            state = "NEGATIVE"
        } else {
            state = "POSITIVE"
        }

        finalResult[key] = {
            value: lastSevenDaysbookings[key],
            state
        }
    }
    
    return finalResult
}

module.exports = {
    getActiveSalonByUuid,
    getUserSalonByEmail,
    getSalonStats
}