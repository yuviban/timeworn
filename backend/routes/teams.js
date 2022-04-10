const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Teams = require('../models/Teams')
const { body, validationResult } = require('express-validator');
// ROUTE:1 Get Team :"/api/teams/getteam" login require
router.get('/fetchteam', fetchuser, async (req, res) => {
    try {
        const teams = await Teams.find({ user: req.user.id });
        res.json({ teams });

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})
// ROUTE:2 Adding a Team :"/api/teams/addteam" login require
router.post('/addteam', fetchuser, [
    body('teamname', "Team name must be atleast 3 charecter").isLength({ min: 3 }),
    body('teamcode', "Team code must be atleast 4 charecter").isLength({ min: 4 }),
    body('teamdescription', "Length of description must be atleast 5 charecter").isLength({ min: 5 }),

], async (req, res) => {
    try {
        let code = await Teams.findOne({ teamcode: req.body.teamcode });
        if (code) {
            return res.status(400).json({ error: "This code is already used try diffrent" })
        }


        const { teamname, teamcode, teamdescription } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const teams = new Teams({
            teamname, teamdescription, teamcode, user: req.user.id
        });
        const saveTeams = await teams.save();
        res.json(saveTeams);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE:3 Update a Team :"/api/teams/updateteam" login require
router.put('/updateteam/:id', fetchuser, async (req, res) => {
    const { teamname, teamdescription } = req.body;
    try {
        // Creatin new team object
        const newTeams = {}
        if (teamname) { newTeams.teamname = teamname };
        if (teamdescription) { newTeams.teamdescription = teamdescription };

        // Find the team to be updated and update it
        let teams = await Teams.findById(req.params.id);
        if (!teams) { return res.status(404).send("Not found") }
        // Allowed updation only if user own this team
        if (teams.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed")

        }

        teams = await Teams.findByIdAndUpdate(req.params.id, { $set: newTeams })
        res.json({ teams });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }


})

// ROUTE:4 Delete a Team :"/api/teams/deleteteam" login require
router.delete('/deleteteam/:id', fetchuser, async (req, res) => {
    try {
        // Find the team to be deleted and delete it
        let teams = await Teams.findById(req.params.id);
        if (!teams) { return res.status(404).send("Not found") }

        // Allowed delete only if user own this team
        if (teams.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed")

        }

        teams = await Teams.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Team has been deleted" });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }


})
module.exports = router