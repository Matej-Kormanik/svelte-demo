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
            meetups.set(transformedMeetups.reverse());
            return false;
        }).catch(err => {
            throw new Error('Failed to fetch meetups')
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


export const updateMeetup = (id, updatedMeetup, toggleFav = false) =>
    fetch(`https://svelte-udemy-course-46913-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify(updatedMeetup),
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        if (!res.ok) {
            throw new Error('Meetup has not been updated');
        }
        if (toggleFav) {
            meetups.toggleFavorite(id);
        } else {
            meetups.updateMeetup(id, updatedMeetup);
        }
    }).catch(err => {
        console.log(err)
    });


export const deleteMeetup = id =>
    fetch(`https://svelte-udemy-course-46913-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`, {
        method: 'DELETE',
    }).then(res => {
        if (!res.ok) {
            throw new Error('Meetup has not been updated');
        }
        meetups.deleteMeetup(id);
    }).catch(err => {
        console.log(err)
    });