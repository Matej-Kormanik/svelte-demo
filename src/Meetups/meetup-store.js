import {writable} from "svelte/store";


const meetupStore = writable([
    {
        id: "m1",
        title: "Coding Bootcamp",
        subtitle: "Learn to code in 2 hours",
        description:
            "In this meetup, we will have some experts that teach you how to code!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
        address: "27th Nerd Road, 32523 New York",
        contactEmail: "code@test.com",
        isFavorite: false

    },
    {
        id: "m2",
        title: "Swim Together",
        subtitle: "Let's go for some swimming",
        description: "We will simply swim some rounds!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
        address: "27th Nerd Road, 32523 New York",
        contactEmail: "swim@test.com",
        isFavorite: false

    }
])

const addMeetup = newMeetup => {
    meetupStore.update(current => [newMeetup, ...current])
}

const toggleFavorite = id => {
    meetupStore.update(meetupList => {
        const meetup = {...meetupList.find(m => m.id === id)}
        meetup.isFavorite = !meetup.isFavorite;

        const updatedMeetups = [...meetupList]
        const index = meetupList.findIndex(m => m.id === id);

        updatedMeetups[index] = meetup;
        return updatedMeetups;
    })
}

export const meetups = {
    subscribe: meetupStore.subscribe,
    set: meetupStore.set,
    addMeetup,
    toggleFavorite
}