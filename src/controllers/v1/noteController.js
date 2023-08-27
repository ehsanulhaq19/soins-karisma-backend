const httpStatus = require('http-status');
const { Note, Salon, User } = require('../../models');
const uuidService = require('../../services/uuidService')
const NoteSerializer = require('../../serializers/v1/NoteSerializer')
const { Op } = require("sequelize");

/**
 * create note
 * @param {Object} req
 * @param {Object} res
 */

const createNote = async (req, res) => {
    const { title, description } = req.body;
    const salonUuid = uuidService.decodeUuid(req.params.uuid);

    const salon = await Salon.findOne({
        where: {
            uuid: salonUuid
        }
    });

    if (!salon) {
        return res.status(httpStatus.NOT_FOUND).json({
            ...{
                statusCode: httpStatus.NOT_FOUND,
                message: 'Salon not found'
            }
        });
    }

    const note = await Note.create({
        title,
        description,
        salonId: salon.id,
        userId: req.user.id
    });

    note.User = req.user;
    note.Salon = salon;

    const noteSerializer = new NoteSerializer()
    const serializedNote = await noteSerializer.serialize(note, false)
    res.status(httpStatus.CREATED).json({
        ...{
            statusCode: httpStatus.CREATED,
            note: serializedNote
        }
    });
}

/**
 * Get notes
 * @param {Object} req
 * @param {Object} res
 */

const getNotes = async (req, res) => {

    // get 3 params
    // search
    // order
    // userUuid

    const { search, orderBy, userUuid, page, itemsPerPage, pagination } = req.query;

    // pagination
    let paginationQuery = {};
    if (pagination === 'true') {
        paginationQuery = {
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage
        }
    }

    // search by title or description
    let searchQuery = {};
    if (search) {
        searchQuery = {
            [Op.or]: [{
                title: {
                    [Op.like]: `%${search}%`
                },
            }, {
                description: {
                    [Op.like]: `%${search}%`
                },
            }]
        }
    }

    if (userUuid) {
        const userUuidDecoded = uuidService.decodeUuid(userUuid);

        // search by user
        const user = await User.findOne({
            where: {
                uuid: userUuidDecoded
            }
        });

        if (user) {
            searchQuery = {
                ...searchQuery,
                userId: user.id
            }
        }
    }
    
    let orderQuery = [];
    if (orderBy === 'ASC') {
        orderQuery = [
            ['createdAt', 'ASC']
        ]
    }
    else if (orderBy === 'DESC') {

        orderQuery = [
            ['createdAt', 'DESC']
        ]
    }

    console.log(orderQuery);

    const salonUuid = uuidService.decodeUuid(req.params.uuid);

    const salon = await Salon.findOne({
        where: {
            uuid: salonUuid
        }
    });

    const notes = await Note.findAll({
        where: {
            salonId: salon.id,
            ...searchQuery
        },
        order: orderQuery,
        include: [{
            model: Salon,
            as: 'Salon'
        }, {
            model: User,
            as: 'User'
        }],
        ...paginationQuery
    });

    const noteSerializer = new NoteSerializer()
    const serializedNotes = await noteSerializer.serializeBulk(notes, false)
    res.status(httpStatus.OK).json({
        ...{
            statusCode: httpStatus.OK,
            notes: serializedNotes
        }
    });
}

/**
 * Get note
 * @param {Object} req
 * @param {Object} res
 */

const getNote = async (req, res) => {
    const noteUuid = uuidService.decodeUuid(req.params.uuid);

    const note = await Note.findOne({
        where: {
            uuid: noteUuid
        },
        include: [{
            model: Salon,
            as: 'Salon'
        }, {
            model: User,
            as: 'User'
        }]
    });

    if (!note) {
        return res.status(httpStatus.NOT_FOUND).json({
            ...{
                statusCode: httpStatus.NOT_FOUND,
                message: 'Note not found'
            }
        });
    } else {
        const noteSerializer = new NoteSerializer()
        const serializedNote = await noteSerializer.serialize(note, false)
        res.status(httpStatus.OK).json({
            ...{
                statusCode: httpStatus.OK,
                note: serializedNote
            }
        });
    }
}

/**
 * Update note
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise}
 */

const updateNote = async (req, res) => {
    const noteUuid = uuidService.decodeUuid(req.params.uuid);

    const note = await Note.findOne({
        where: {
            uuid: noteUuid
        },
        include: [{
            model: Salon,
            as: 'Salon'
        }, {
            model: User,
            as: 'User'
        }]
    });

    if (!note) {
        return res.status(httpStatus.NOT_FOUND).json({
            ...{
                statusCode: httpStatus.NOT_FOUND,
                message: 'Note not found'
            }
        });
    } else {
        const { title, description } = req.body;

        note.title = title ? title : note.title;
        note.description = description ? description : note.description;

        await note.save();

        const noteSerializer = new NoteSerializer()
        const serializedNote = await noteSerializer.serialize(note, false)
        res.status(httpStatus.OK).json({
            ...{
                statusCode: httpStatus.OK,
                note: serializedNote
            }
        });
    }
}

/**
 * Delete note
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise}
 */

const deleteNote = async (req, res) => {
    const noteUuid = uuidService.decodeUuid(req.params.uuid);

    const note = await Note.findOne({
        where: {
            uuid: noteUuid
        }
    });
    if (!note) {
        return res.status(httpStatus.NOT_FOUND).json({
            ...{
                statusCode: httpStatus.NOT_FOUND,
                message: 'Note not found'
            }
        });
    } else {
        await note.destroy();
        res.status(httpStatus.NO_CONTENT).json({
            ...{
                statusCode: httpStatus.NO_CONTENT,
                message: 'Note deleted successfully'
            }
        });
    }
}

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}