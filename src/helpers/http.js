const URL = 'https://svelte-udemy-course-46913-default-rtdb.europe-west1.firebasedatabase.app/meetups.json';

import {meetups} from "../Meetups/meetup-store";

export const saveNewMeetup = (meetup) =>
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(meetup),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (!res.ok) {
            throw new Error('Meetup has not been saved');
        }
        return res.json();
    }).then(savedMeetup => {
        console.log(savedMeetup);
        meetups.addMeetup({id: savedMeetup.name, ...meetup})
    }).catch(err => {
        console.log(err)
    });


export const updateMeetup = (id, meetup) =>
    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(meetup),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (!res.ok) {
            throw new Error('Meetup has not been saved');
        }
        return res.json();
    }).then(savedMeetup => {
        console.log(savedMeetup);
        meetups.addMeetup({id: savedMeetup.name, ...meetup})
    }).catch(err => {
        console.log(err)
    });