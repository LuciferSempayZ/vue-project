<script setup>
import {reactive, ref} from "vue";

import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";

import {registration} from "@/api/methods/auth/registration.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

const inputData = reactive({
  email: '',
  password: '',
  name: '',
  surname: '',
  phone: ''
})

const isLoading = ref(false)

const errors = reactive({
  data: {},
  message: ''
})

const onSubmit = async () => {
  isLoading.value = true

  errors.data = {}
  const data = await registration(inputData.email, inputData.password, inputData.name, inputData.surname, inputData.phone)

  isLoading.value = false

  console.log(data)

  if (data?.code === 422) {
    errors.data = data.message
    return
  }

  if (data?.code === 401) {
    errors.data = data.message
    return
  }

}

const onInputChange = (field, event) => {
  const value = event.target.value

  errors.data[field] = []
  inputData[field] = value
}
</script>

<template>
  <main>
    <h1>Регистрация</h1>


    <Form :submit="onSubmit" method="POST">
      <p v-if="isLoading">Загрузка...</p>
      <template v-else>
        <FormItem
            id="email"
            label="Введите почту"
            placeholder="Введите почту"
            type="email"
            :value="inputData.email"
            :error-messages="errors.data?.email"
            @change="(event) => onInputChange('email', event)"
        />

        <FormItem
            id="password"
            label="Введите пароль"
            placeholder="Введите пароль"
            type="password"
            :value="inputData.password"
            :error-messages="errors.data?.password"
            @change="(event) => onInputChange('password', event)"
        />

        <FormItem
            id="name"
            label="Введите имя"
            placeholder="Введите имя"
            :value="inputData.name"
            :error-messages="errors.data?.name"
            @change="(event) => onInputChange('name', event)"
        />
        <FormItem
            id="surname"
            label="Введите фамилию"
            placeholder="Введите фамилию"
            :value="inputData.surname"
            :error-messages="errors.data?.surname"
            @change="(event) => onInputChange('surname', event)"
        />
        <FormItem
            id="phone"
            label="Введите номер телефона"
            placeholder="Введите номер телефона"
            type="phone"
            :value="inputData.phone"
            :error-messages="errors.data?.phone"
            @change="(event) => onInputChange('phone', event)"
        />

        <Button @submit.prevent="onSubmit" type="submit">Зарегистрироваться</Button>
      </template>
    </Form>
  </main>
</template>
