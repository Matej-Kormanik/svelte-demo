<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from './UI/Button.svelte';
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import {meetups} from "./Meetups/meetup-store";

  let editMode = false;

  function toggleFavorite(event) {
    meetups.toggleFavorite(event.detail);
  }

  function cancelEdit() {
    editMode = false;
  }
</script>


<Header />

<main>
  <div class="meetup-control">
    <Button on:click={() => {editMode = !editMode}}>New meetup</Button>
  </div>
  {#if editMode}
    <MeetupForm on:save={() => {editMode = false}} on:cancel={cancelEdit}/>
  {/if}
  <MeetupGrid meetups={$meetups} />
</main>


<style>
  main {
    margin-top: 5rem;
  }
  .meetup-control {
    margin: 1rem;
  }
</style>