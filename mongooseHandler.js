const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const Task = new Schema({
    title: String,
    description: String,
    points_worth: Number,
    single_person: Boolean,
    sponsor: String,
    image: String,
    category: String,
    cta_before: String,
    cta_after: String,
    rewards: [Object]
});

const Prizes = new Schema({
    title: String,
    value: Number,
    description: String
});

const User = new Schema({
    session_key: String,
    flight_id: String,
    name: String,
    email: String,
    points: Number,
    tasks_complete_ids: [Schema.Types.ObjectId]
});

const userModel = mongoose.model('User', User, 'users');
const taskModel = mongoose.model('Task', Task, 'tasks');
const prizesModel = mongoose.model('Prizes', Prizes, 'prizes');

class mongooseHandler {
    constructor() {
        mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW || require('./keys').MONGO_ATLAS_PW }@cluster0-e2krm.mongodb.net/test?retryWrites=true`, {
            useNewUrlParser: true
        }, err => console.log(err));
    }

    insertTestTasks() {

        (new taskModel({
            title: "",
            description: "",
            points_worth: 0,
            single_person: true,
            sponsor: "",
            image: "",
            category: "One-off",
            cta_before: "Upload Image",
            cta_after: "",
            rewards: []
        })).save();


    }

    async insertNewUser(name, email) {
        return new Promise(resolve => {
            let session = generateUniqueSessionKey();
            (new userModel({
                session_key: session,
                flight_id: null,
                name: name,
                email: email,
                points: 0,
                tasks_ongoing_ids: [],
                tasks_complete_ids: []
            })).save(() => {
                resolve(session)
            });
        });
    }

    async getUser(session) {
        return new Promise(resolve => {
            userModel.find({
                session_key: session
            }, (err, user) => {
                resolve(tasks);
            });
        })
    }

    async completeTask(session, task_id) {
        return new Promise(resolve => {
            userModel.find({
                session_key: session
            }, (err, user) => {
                taskModel.find({ _id: task_id }, (error, task) => {
                    let updated_user = user;
                    updated_user.tasks_complete_ids.push(task[0]._id);
                    updated_user.points += task[0].points_worth;
                    // Updating User
                    userModel.findOneAndUpdate({
                        session_key: session
                    }, updated_user, {
                        upsert: true,
                        useFindAndModify: false
                    }, (err, doc) => {
                        resolve("Inserted");
                    });
                })
            });
        });
    }

    async getTask(id) {
        return new Promise(resolve => {
            taskModel.find({
                _id: id
            }, (err, tasks) => {
                resolve(tasks[0]);
            });
        })
    }

    async getCompleteTasks(session) {
        return new Promise(resolve => {
            userModel.find({
                session_key: session
            }, (err, user) => {
                taskModel.find({}, (error, tasks) => { // Filtering through ids completed
                    user.tasks_complete_ids.forEach(id => tasks = tasks.filter(task => task._id != id));
                    resolve(tasks);
                })
            });
        })
    }

    async getOngoingTasks(session) {
        return new Promise(resolve => {
            userModel.find({
                session_key: session
            }, (err, user) => {
                taskModel.find({}, (error, tasks) => { // Filtering through ids completed
                    user.tasks_complete_ids.forEach(id => tasks = tasks.filter(task => task._id == id));
                    resolve(tasks);
                })
            });
        })
    }

    // insertLog(value, username, accessed, device) {
    //     (new Log({
    //         _id: mongoose.Types.ObjectId(),
    //         value: value,
    //         accessed: accessed,
    //         timestamp: Date.now(),
    //         username: username,
    //         device: device
    //     })).save();
    // }

    // insertTag(value, device) {
    //     (new Tag({
    //         _id: mongoose.Types.ObjectId(),
    //         value: value,
    //         device: device
    //     })).save();
    // }

    // insertDevice(name, user, broker, topic) {
    //     (new Device({
    //         id: broker + topic,
    //         name: name,
    //         username: user,
    //         broker: broker,
    //         topic: topic
    //     })).save();
    // }

    // async findTag(value, device) {
    //     return new Promise(resolve => {
    //         Tag.find({
    //             value: value,
    //             device: device
    //         }, function (err, tags) {
    //             resolve(tags);
    //         });
    //     })
    // }

    // async getLogs(device) {
    //     return new Promise(resolve => {
    //         Log.find({
    //             device: device
    //         }, function (err, logs) {
    //             resolve(logs);
    //         });
    //     })
    // }

    // async getDevices(username) {
    //     return new Promise(resolve => {
    //         Device.find({
    //             username: username
    //         }, function (err, devices) {
    //             resolve(devices);
    //         });
    //     })
    // }

    generateUniqueSessionKey() {
        return (new Array(9).fill("")).map(i => Math.random().toString(36).substring(7)).reduce((pre, curr) => pre += curr, "");
    }

    close() {
        mongoose.connection.close();
    }
}

module.exports = mongooseHandler;