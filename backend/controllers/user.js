const auth = require("../auth.services");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// SIGNUP

exports.signup = async (req, res, next) => {
    try {
        const user = await auth.signup(req, res);
        res.status(201).json({
            status: true,
            message: "User created !",
            data: user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

// LOGIN

exports.login = async (req, res, next) => {
    try {
        const userLog = await auth.login(req, res)
        res.status(200).json({
            status: true,
            message: 'Connexion ok !',
            data: userLog
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
}

// SHOW ALL USERS

exports.all = async (req, res, next) => {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                profile: true,
                posts: true,
                commentaire: true,
                likes: true,
            }
        });
        res.status(200).json({
            status: true,
            message: "All users",
            data: allUsers
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

// SHOW ONE USER PROFIL

exports.oneUserProfile = async (req, res, next) => {
    try {
        const id = req.user.id;
        const oneUser = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                email: true,
                isAdmin: true,
                username: true,
                profile: {
                    select: {
                        bio: true,
                        id: true,
                        image: true,
                        userId: true,
                    },
                },
            },
        });
        res.status(200).json({
            status: true,
            message: "One user Profile",
            data: oneUser,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

// SHOW ONE USER
//
exports.oneUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const oneUser = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                likes: true,
            },
        });
        res.status(200).json({
            status: true,
            message: "One user",
            data: oneUser,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

// DELETE USER

exports.deleteUser = async (req, res, next) => {
    if (req.user.isAdmin === 1) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id: Number(req.params.id),
                },
            });
            res.status(201).json({
                status: true,
                message: "Account deleted",
                data: user,
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ message: error.message });
        }
    }
};

// DELETE OWN USER ACCOUNT 

exports.deleteOwn = async (req, res, next) => {
    try {
        const id = req.user.id;
        console.log(id);
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            },
            select: {
                email: true,
                id: true,
                isAdmin: true,
                username: true,
            }
        });
        res.status(201).json({
            status: true,
            message: "Your account is deleted",
            data: user,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

