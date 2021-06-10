import {meetups} from "../Meetups/meetup-store";
const URL = 'https://svelte-udemy-course-46913-default-rtdb.europe-west1.firebasedatabase.app/meetups.json';

export const getAllMeetups = () =>
    fetch(URL)
        .then(res => res.json())
        .then(meetupList => {
            const transformedMeetups = [];
            for(let key in meetupList) {
                transformedMeetups.push({
                    id: key,
                    ...meetupList[key]
                })
            }
            meetups.set(transformedMeetups);
            return false;
        })

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