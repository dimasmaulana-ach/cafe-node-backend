const models = require('./../../models/index')
const report = models.bug_report

module.exports = {
    controllerGetReport: (req, res)=> {
        report.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerGetReportById: (req, res)=> {
        report.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(result=> {
            res.json({
                data: result
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerAddReport: (req, res)=> {
        const {kasir, message} = req.body
        const data = {
            tgl_report : new Date().toJSON(),
            kasir: kasir,
            message: message,
            status: false,
            role: req.body.role
        }
        report.create(data)
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerEditReport: (req, res)=> {
        const {kasir, message} = req.body
        const data = {
            tgl_report : new Date().toJSON(),
            kasir: kasir,
            message: message,
            role: req.body.role
        }
        report.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                data: data
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerEditStatusReport:(req, res)=> {
        report.findOne({
            where: {id: req.params.id}
        })
        .then(result=> {
            const data = {
                status: !result.status
            }
            report.update(data, {
                where: {id: req.params.id}
            })
            .then(results=> {
                res.json({message: "status was updated"})
            })
            .catch(err=> {
                console.log(err)
            })
        })
        .catch(err=> {
            console.log(err)
        })
    },
    controllerDeleteReport: (req, res)=> {
        report.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result=> {
            res.json({
                message: "data was deleted"
            })
        })
        .catch(err=> {
            console.log(err)
        })
    }
}