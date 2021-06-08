<script>
  export let controlType = null;
  export let id;
  export let label;
  export let rows = null;
  export let value;
  export let type = 'text';

  export let valid = true;
  export let touched = false;
  export let validityMsg = '';
</script>


<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <textarea
            class:invalid={!valid && touched}
            on:input
            on:blur={() => {touched = true}}
            {id} {value}
    />
  {:else}
    <input
            type="{type}"
            class:invalid={!valid && touched}
            on:input
            on:blur={() => {touched = true}}
            {id} {value}
    />
  {/if}

  {#if validityMsg && !valid && touched}
    <p class="error-message">{validityMsg}</p>
  {/if}
</div>


<style>

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }

  input, textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
</style>