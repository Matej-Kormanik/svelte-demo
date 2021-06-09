<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from './UI/Button.svelte';
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import {meetups} from "./Meetups/meetup-store";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode = false;
  let page = 'overview';
  let pageData = {};

  function toggleFavorite(event) {
    meetups.toggleFavorite(event.detail);
  }

  function cancelEdit() {
    editMode = false;
  }

  function showDetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
      page = 'overview';
      pageData = {};
  }
</script>


<Header/>

<main>
    {#if page === 'overview'}
        <div class="meetup-control">
            <Button on:click={() => {editMode = !editMode}}>New meetup</Button>
        </div>
        {#if editMode}
            <MeetupForm on:save={() => {editMode = false}} on:cancel={cancelEdit}/>
        {/if}
        <MeetupGrid meetups={$meetups} on:showdetails={showDetails}/>
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetails}/>
    {/if}
</main>


<style>
    main {
        margin-top: 5rem;
    }

    .meetup-control {
        margin: 1rem;
    }
</style>