const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// const tasks = [
// 	{
// 		title: "Apprendre à programmer",
// 		done: false
// 	},
// 	{
// 		title: "Faire les courses",
// 		done: true
// 	}
// ];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true
	})
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	if (!req.session.tasks) {
		req.session.tasks = [];
	}
	res.render("todolist", { tasks: req.session.tasks });
});

app.post("/task", (req, res) => {
	if (req.body.task) {
		const newTask = {
			title: req.body.task,
			done: false
		};
		req.session.tasks.push(newTask);
	}
	res.redirect("/");
});

app.get("/task/:id/done", (req, res) => {
	if (req.session.tasks[req.params.id]) {
		req.session.tasks[req.params.id].done = true;
	}
	res.redirect("/");
});

app.get("/task/:id/delete", (req, res) => {
	if (req.session.tasks[req.params.id]) {
		req.session.tasks.splice(req.params.id, 1);
	}
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Serveur lancé sur le port ${port}`);
});
