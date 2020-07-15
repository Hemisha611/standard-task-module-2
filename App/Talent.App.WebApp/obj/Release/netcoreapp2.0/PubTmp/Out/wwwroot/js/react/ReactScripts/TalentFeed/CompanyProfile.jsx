import React from 'react';
import { Loader, Icon, Card, Button, Image } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        const details = props.details ?
            Object.assign({}, props.details)
            : {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }

        this.state = {
            newContact: details
        }

    }

    render() {
        //const { newContact } = this.state;

        console.log("Render-Company");
        console.log(this.props.details);
        //console.log(this.state.newContact);

        let name = this.props.details ? this.props.details.name : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let email = this.props.details ? this.props.details.email : ""
        let city = this.props.details ? this.props.details.location.city : ""
        let country = this.props.details ? this.props.details.location.country : ""


        return (
            <Card>
                <Card.Content className="center aligned">

                    <Image circular size="mini" src='https://react.semantic-ui.com/images/wireframe/square-image.png' />

                    <Card.Header><br />{name}</Card.Header>
                    <Card.Meta><Icon name="map marker alternate" />{city}, {country}</Card.Meta>
                    <Card.Description>
                        We currently do not have specific skills that we desire
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta><Icon name="phone" />: {phone}</Card.Meta>
                    <Card.Meta><Icon name="mail" />: {email}</Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}