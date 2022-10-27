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
];
class UserController {
    getAll(req, res) {
        return res.status(200).send(data);
    }
    create(req, res) {
        const { id, name, email } = req.body;
        // data.push({ id, name, email });
        console.log(id, name, email);
        if (!id && !name && !email) {
            return res.status(400).send("");
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
        throw new Error('Method not implemented.');
    }
    deleteById(req, res) {
        throw new Error('Method not implemented.');
    }
}
exports.default = new UserController();
