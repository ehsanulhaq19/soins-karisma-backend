const { Op } = require("sequelize");
const { DateTime } = require("luxon");
const { OtpCode, User } = require("../models")
const otpCodeStatuses = require("../models/values/OtpCodeStatus")
const statuses = require("../constants/statuses.json")

exports.getUserOtpcode = async (userEmail, otpCodeType) => {
    const currentDateTime = DateTime.now()
    const otpCode = await OtpCode.findOne({ 
        include:{
            model: User,
            where: {
                email: {
                  [Op.eq]: userEmail
                }
            },
        },
        where: {
            type: {
                [Op.eq]: otpCodeType
            },
            status: {
                [Op.eq]: otpCodeStatuses.ACTIVE.id
            },
            expireAt: {
                [Op.gt]: currentDateTime.toString()
            }
        },
        order: [
            ['id', 'DESC']
        ]
    });
    
    return otpCode
}

exports.createOtpCode = async(otpCode, userId, type, expireAt) => {
    await OtpCode.update(
        { 
            status: otpCodeStatuses.DISABLE.id
        }, 
        {
            where: {
                userId,
                status: otpCodeStatuses.ACTIVE.id,
                type,
            }
        }
    );

    const newOtpCode = OtpCode.build({
        otpCode,
        userId,
        expireAt,
        type,
        status: otpCodeStatuses.ACTIVE.id
    });

    await newOtpCode.save()

    return {
        type: statuses.SUCCESS
    }
}