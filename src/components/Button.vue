<script setup>
defineProps({
  type: {
    required: false,
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <button :type="type" class="button">
    <slot />
  </button>
</template>

<style scoped>
  .button {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    border: 2px solid;
    background-color: darkgray;
    color: white;
    font-weight: bold;

    transition: .15s linear all;
  }

  .button:hover {
    border: 2px solid;
    background-color: transparent;
  }

  .button:active {
    border: 2px solid;
    background-color: red;
  }

</style>