﻿/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Form, Input, Select, Button, Icon, Dropdown, Option } from 'semantic-ui-react';


export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            currentlyEditing: false,
            langname: "",
            langlevel: "",
            skills: [],
            skill: [],
            val: "",
            data: {
                name: "",
                level: ""
            },
            updateData: {
                id: " ",
                name: "",
                level: ""
            },
            name: "",
            level: ""
        }
            
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        
        this.check = this.check.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addSkill = this.addSkill.bind(this);

        this.addSkills = this.addSkills.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this);
        this.deleteSkills = this.deleteSkills.bind(this);
        this.updateSkill = this.updateSkill.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofile1.azurewebsites.net/profile/profile/getSkill',

            //url: 'http://localhost:60290/profile/profile/getSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res.data)
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }
    updateWithoutSave(newValues) {
        console.log(newValues)
        let newSkill = Object.assign([], this.state.skills, newValues)
        this.setState({
            skills: newSkill
        })
        console.log(this.state.skills)
    }

    openEdit() {
        //const languageData = Object.assign({}, this.props.languageData)
        this.setState({
            showEditSection: true,
            updateData: { id: null }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
        console.log("Close Edit:" + this.state.currentlyEditing);
    }

    addSkill() {
        console.log("addSkill called");
        this.setState({
            skill: this.state.data
        }, this.addSkills);

    }
    addSkills() {
        console.log("Add Skill called");
        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofile1.azurewebsites.net/profile/profile/addSkill',

           // url: 'http://localhost:60290/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill Added sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not Added successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

    }
    deleteSkill(skill) {
        console.log(skill)
        this.setState({
            skill: skill,
            skills: []
        }, this.deleteSkills)
    }
    deleteSkills() {

        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofile1.azurewebsites.net/profile/profile/deleteSkill',

           //url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language Deleted sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not deleted successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    updateSkill() {
        console.log(this.state.skill)
        this.setState({
            skill: this.state.updateData
        }, this.updateSkills)
    }

    updateSkills() {

        console.log(JSON.stringify(this.state.skill))
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentprofile1.azurewebsites.net/profile/profile/UpdateSkill',

           // url: 'http://localhost:60290/profile/profile/UpdateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.cancel()
    }

    check(lang) {
        console.log(lang)
        this.setState({
            currentlyEditing: true,
            updateData: {
                id: lang.id,
                name: lang.name,
                level: lang.level
            }
        })

    }

    cancel() {
        this.setState({
            currentlyEditing: false,
        })
        console.log("Cancel clicked after:" + this.state.currentlyEditing);
    }
    handleChange(event) {

        if (this.state.updateData.id != null) {
            const updateData = Object.assign({}, this.state.updateData);
            updateData[event.target.name] = event.target.value;
            this.setState({ updateData }, () => console.log(this.state.updateData))
        }
        else {
            const data = Object.assign({}, this.state.data);
            data[event.target.name] = event.target.value;
            this.setState({ data }, () => console.log(this.state.data))
        }
    }

    //handleChange(event) {
    //    const data = Object.assign({}, this.state.data)
    //    data[event.target.name] = event.target.value;
    //    this.setState({ data }, () => console.log(this.state.data))

    //}


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        //const SkillLevel = [
        //    "Beginner",
        //    "Intermediate",
        //    "expert",

        //]

        //const SkillOptions = SkillLevel.map(Skill => ({
        //    key: Skill,
        //    text: Skill,
        //    value: Skill,

        //}));


        return (
            <div className='ui sixteen wide column'>
                <React.Fragment>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input}
                                placeholder='Add Language'
                                name="name"
                                onChange={this.handleChange}
                            />

                            <Form.Field>
                                <select className="ui right labeled dropdown"
                                    placeholder="Language Level"
                                    onChange={this.handleChange}
                                    name="level"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </Form.Field>
                            <Form.Field>
                                <button type="button" className="ui teal button" onClick={this.addSkill}
                                >Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}
                                >Cancel</button>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                    <br />
                </React.Fragment>
            </div>
        )
    }

    renderDisplay() {
       


            // console.log("Called Display");
            console.log(this.state.updateData);

        const { skills } = this.state;

        //const languageLevel = [
        //    "Basic",
        //    "Conversational",
        //    "Fluent",
        //    "Native/Bilingual",
        //]

        //const languageOptions = languageLevel.map(lang => ({
        //    key: lang,
        //    text: lang,
        //    value: lang,

        //}));

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <button type="button" className="ui floated teal button" onClick={this.openEdit}>+ Add New</button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {skills.map((name) => (
                                    <Table.Row key={name.id}>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (

                                                <Table.Cell>
                                                    <Form>
                                                        <Form.Field control={Input}
                                                            placeholder='Add Skill'
                                                            name="name"
                                                            value={this.state.updateData.name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form>
                                                </Table.Cell>
                                            )
                                                :
                                                (
                                                    <Table.Cell>{name.name}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <div>
                                                    <Table.Cell>
                                                        <Form>
                                                            <select className="ui right labeled dropdown"
                                                                placeholder="Language Level"
                                                                onChange={this.handleChange}
                                                                name="level"
                                                                value={this.state.updateData.level}
                                                            >
                                                                <option value="">Select Level</option>
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Intermediate">Intermediate</option>
                                                                <option value="Expert">Expert</option>
                                                            </select>
                                                        </Form>
                                                    </Table.Cell>

                                                </div>

                                            )
                                                : (
                                                    <Table.Cell>{name.level}</Table.Cell>
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {this.state.currentlyEditing && this.state.updateData.id === name.id ? (
                                                <Table.Cell>
                                                    <button type="button" className="ui teal button" onClick={this.updateSkill.bind(this)}>Update</button>
                                                    <button type="button" className="ui button" onClick={this.cancel.bind(this)}>Cancel</button>
                                                </Table.Cell>
                                            )
                                                : (
                                                    <Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='pencil' onClick={this.check.bind(this, name)} />
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Icon link name='delete' onClick={this.deleteSkill.bind(this, name)} />
                                                        </Table.Cell>
                                                    </Table.Cell>

                                                )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}
