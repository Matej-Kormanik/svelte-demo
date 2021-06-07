<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from './UI/Button.svelte';
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let meetups = [
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
  ];
  let editMode;

  function addMeetup(event) {
    const newMeetup = event.detail;
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }
  function toggleFavorite(event) {
    const id = event.detail;
    const meetup = {...meetups.find(m => m.id === id)}
    meetup.isFavorite = !meetup.isFavorite;
    const index = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups]
    updatedMeetups[index] = meetup;
    meetups = updatedMeetups;
  }
</script>


<Header />

<main>
  <div class="meetup-control">
    <Button caption="New meetup" on:click={() => {editMode = 'add'}}/>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup}/>
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite}/>
</main>


<style>
  main {
    margin-top: 5rem;
  }
  .meetup-control {
    margin: 1rem;
  }
</style>