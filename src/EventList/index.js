import React from 'react';
import { Card, Button, Grid, Header, Form} from 'semantic-ui-react'

function EventList(props) {

	const events = props.events.map((event) => {
		// if (event.user.Id == currentUser.Id)
		return (

			<Card key={event.id}>Events Entered
				<Card.Content>
					<Card.Header>{event.category}, {event.level}, {event.partner}, {event.results}</Card.Header>
				</Card.Content>
				<Card.Content extra>
            		<Button onClick={() => props.deleteEvent(event.id)}>Delete Event</Button>
            		<Button onClick={() => props.showEventModal(event)}>Edit Event</Button>
            	</Card.Content>
			</Card>
			)
	})

	return (
		<Card.Group>
			{ events }
		</Card.Group>
		)
}

export default EventList;

