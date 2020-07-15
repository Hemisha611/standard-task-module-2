import React from 'react';
import Cookies from 'js-cookie';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Image, Grid, Segment, Embed, Button } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showEditSection: false,
            profileData: "",
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
    };

    componentDidMount() {
        this.loadData();
    }


    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
           // url: 'https://talentprofile1.azurewebsites.net/profile/profile/getTalent',
            url: 'http://localhost:60290/profile/profile/getTalent',
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
        console.log("updateWithoutSave-Card");
        console.log(newValues);
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
        console.log("updateWithoutSave-Card AFTER:");
        console.log(this.state.profileData);
    }

    openEdit() {
        this.setState({
            showEditSection: true
        })

        console.log("Open Values after:" + this.state.showEditSection);
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        console.log("renderEdit");

        const { profileData } = this.state;

        let variable = this.state.profileData.currentEmployment;

        let skill = this.state.profileData.skills;

        console.log("Skills:" + skill);

        console.log(this.state.profileData);
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>{this.state.profileData.name}<Icon corner top right name="star" /></Card.Header>
                </Card.Content>
                <Card.Content>

                    <Grid columns={2} stackable>
                        <Grid.Column>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={true} />
                        </Grid.Column>
                        <Grid.Column>
                            <Card.Content>
                                <Card.Header>Talent snapshot</Card.Header>
                                <Card.Header>CURRENT EMPLOYER</Card.Header>
                                <Card.Meta>{variable.substring(22, 25)}</Card.Meta>
                                <Card.Header>VISA STATUS</Card.Header>
                                <Card.Meta>{this.state.profileData.visa}</Card.Meta>
                                <Card.Header>POSITION</Card.Header>
                                <Card.Meta>
                                    {variable.substring(0, 18)}
                                </Card.Meta>
                            </Card.Content>
                        </Grid.Column>
                    </Grid>

                </Card.Content>
                <Card.Content>
                    <Grid divided='vertically'>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <Icon name="video camera" onClick={this.closeEdit} />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="file pdf outline" />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="linkedin" />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="github" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    {this.state.profileData.skills.map((item, index) =>
                        < Button basic color='blue' size="small" key={index}>
                            {item}
                        </Button>
                    )}
                </Card.Content>
            </Card>

        );
    }

    renderDisplay() {

        console.log("renderDisp");

        const { profileData } = this.state;

        let skill = ["C#", ".Net Core", "Javascript", "ReactJS", "PreactJS"];

        console.log("Skills:" + skill);

        console.log(this.state.profileData);

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>Hemisha Patel  <Icon float='right' name="star" /></Card.Header>

                </Card.Content>
                <Card.Content>
                    <Embed id='n-RjGEWW3nk' source='youtube' />
                </Card.Content>
                <Card.Content>
                    <Grid divided='vertically'>
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <Icon onClick={this.openEdit} name="user" />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="file pdf outline" />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="linkedin" />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="github" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    {skill.map((item, index) =>
                        < Button basic color='blue' size="small" key={index}>
                            {item}
                        </Button>
                    )}
                </Card.Content>
            </Card>

        );
    }
}
