<script setup>
defineProps({
  value: String,
  id: String,
  onChange: Function,
  label: String,
  placeholder: String,
  type: {
    required: false,
    type: String,
    default: 'text'
  },
  errorMessages: {
    type: Array,
    default: [],
    required: false,
  },
  multiple: Boolean
})
</script>

<template>
  <div class="inputWrapper">
    <label class="label" :for="id">
      {{ label }}
    </label>

    <input
        :multiple="multiple"
        :class="['input', {error: errorMessages?.length}]"
        :type="type"
        :value="value"
        @input="onChange"
        :placeholder="placeholder"
        :id="id">

    <ul v-if="errorMessages.length">
      <li class="errorMessage" v-for="message in errorMessages">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.inputWrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.input {
  border: 10px solid;
  border-radius: 5px;
  padding: 10px 15px;
  outline: none;
  color: black;
  transition: .15s linear all;
  background: white;
}

.input:hover {
}

.input:active {
}

.errorMessage,
.error {
}
</style>