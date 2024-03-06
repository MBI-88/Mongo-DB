db.perosnas.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: { ciudad: "$location.city" }, personas: { $sum: 1 } } },
    { $sort: { personas: -1 } }
])

db.perosnas.aggregate([
    { $project: { _id: 0, gender: 1, NombreCompleto: { $concat: ["$name.first", " ", "$name.last"] } } }
])

db.perosnas.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            NombreCompleto: {
                $concat:
                    [
                        {
                            $toUpper: {
                                $substrCP:
                                    ["$name.first", 0, 1]
                            }
                        },
                        { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
                        " ",
                        { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
                        { $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }] }
                    ]
            }
        }
    }
])

db.empleados.find({ 'Fecha contrato': { $gt: '12/1/06' } }).count()

db.empleados.updateMany(
    {}, { $rename: { Categoría: "Categoria" } }
)

db.empleados.updateMany({}, { $rename: { "Informes a": "Informes" } })

db.empleados.updateMany({}, { $rename: { "Fecha contrato": "Contrato", "Salario anual": "Salario_anual" } })

db.empleados.aggregate([
    {
        $project: {
            _id: 0,
            FullName: {
                $concat: [
                    { $toUpper: "$Nombre" }, " ", { $toUpper: "$Apellido" }
                ]
            }
        }
    }
])

db.empleados.findOneAndUpdate({ EmpID: 38 }, { $set: { Nombre: "Maria" } }, { "returnNewDocument": true })