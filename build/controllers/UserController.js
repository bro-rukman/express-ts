"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = [
    {
        id: 1,
        nama: 'Endang Rukmana',
        email: 'e_rukmana@gmail.com',
    },
    {
        id: 2,
        nama: 'Rukmana',
        email: 'rukmana@gmail.com',
    },
    {
        id: 3,
        nama: 'Endang',
        email: 'endang@gmail.com',
    },
    {
        id: 4,
        nama: 'Kamidi',
    },
];
class UserController {
    getAll(req, res) {
        return res.status(200).send(data);
    }
    create(req, res) {
        const { id, name, email } = req.body;
        data.push({ id, name, email });
        if (!id && !name && !email) {
            return res.status(400).send('');
        }
        return res.send('success created an user');
    }
    getById(req, res) {
        const { id } = req.params;
        const user = data.find(item => item.id === Number(id));
        if (!user) {
            return res.status(404).send('User not found !');
        }
        else {
            return res.status(200).send(user);
        }
    }
    updateById(req, res) {
        const { id } = req.params;
        const user = data.find(item => item.id === Number(id));
        const { nama, email } = req.body;
        user.nama = nama;
        user.email = email;
        if (!user) {
            return res.status(404).send('User not found !');
        }
        else {
            return res.status(200).send('Success Update user !');
        }
    }
    deleteById(req, res) {
        const { id } = req.params;
        const getUser = data.find(item => item.id === Number(id));
        const user = data.filter(f => f.id !== Number(id));
        if (!getUser) {
            return res.status(404).send('User not found !');
        }
        else {
            return res.status(200).send(user);
        }
    }
}
exports.default = new UserController();
