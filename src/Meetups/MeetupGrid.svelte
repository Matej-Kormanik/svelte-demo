<script>
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import {createEventDispatcher} from "svelte";
  import {scale} from 'svelte/transition';
  import {flip} from 'svelte/animate';

  export let meetups;
  let favsOnly = false;

  const dispatch = createEventDispatcher();
  $: fillteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1
  }
</script>


<div id="meetup-controls">
  <MeetupFilter on:select={setFilter} selectedFavButton={favsOnly}/>
  <Button on:click={() => {dispatch('add')}}>New meetup</Button>
</div>

<section id="meetups">
  {#each fillteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{duration: 800}}>
      <MeetupItem {...meetup} on:showdetails on:edit/>
    </div>
  {/each}
</section>


<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>