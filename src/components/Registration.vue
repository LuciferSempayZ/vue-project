<script setup>
import {reactive, ref} from "vue";

import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";

import {registration} from "@/api/methods/auth/registration.js";
import Button from "@/components/Button.vue";
import router from "@/router/index.js";

const inputData = reactive({
  name: '',
  surname: '',
  password: '',
  email: '',
  phone: '',
})

const onSubmit = async () => {
// Проверяем, что все поля заполнены
  if (!inputData.name || !inputData.surname || !inputData.password || !inputData.email || !inputData.phone) {
    alert('Заполните все поля для регистрации');
    return;
  }

  // Проверяем, что имя и фамилия содержат только буквы и имеют длину от 2 до 32 символов
  const nameRegex = /^[a-zA-Zа-яА-Я]{2,32}$/;
  if (!nameRegex.test(inputData.name)) {
    alert('Имя должно содержать только буквы и иметь длину от 2 до 32 символов');
    return;
  }
  if (!nameRegex.test(inputData.surname)) {
    alert('Фамилия должна содержать только буквы и иметь длину от 2 до 32 символов');
    return;
  }

  // Проверяем, что email соответствует формату и имеет длину от 11 до 32 символов
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputData.email) || inputData.email.length < 11 || inputData.email.length > 32) {
    alert('Введите корректный email');
    return;
  }

  // Проверяем, что номер телефона соответствует формату
  const phoneRegex = /^8\d{3}\d{3}\d{2}\d{2}$/;
  if (!phoneRegex.test(inputData.phone)) {
    alert('Введите корректный номер телефона в формате 8XXXXXXXXXX');
    return;
  }

  // Проверяем, что пароль содержит как минимум 6 символов
  if (inputData.password.length < 6) {
    alert('Пароль должен содержать как минимум 6 символов');
    return;
  }
  try {
    const response = await registration(
        inputData.name,
        inputData.surname,
        inputData.password,
        inputData.email,
        inputData.phone
    );
    alert("Вы успешно зарегистрировались")
    await router.push({ name: 'login' });
  } catch (error) {
    console.error('Во время регистрации произошла ошибка:', error);
    // Handle unexpected errors (e.g., network issues) appropriately
  }
};
const onInputChange = (field, event) => {
  inputData[field] = event.target.value;
}
</script>
<template>
  <main>
    <h1 style="text-align: center">Регистрация</h1>
    <Form class="form" :submit="onSubmit" method="POST">
      <label>Введите имя</label>
      <FormItem
          id="name"
          placeholder="Введите имя"
          type="text"
          :value="inputData.name"
          @change="(event) => onInputChange('name', event)"
      />
      <label>Введите фамилию</label>
      <FormItem
          id="surname"
          placeholder="Введите фамилию"
          type="text"
          :value="inputData.surname"
          @change="(event) => onInputChange('surname', event)"
      />
      <label>Введите номер телефона</label>
      <FormItem
          id="phone"
          placeholder="Введите номер телефона"
          type="text"
          :value="inputData.phone"
          @change="(event) => onInputChange('phone', event)"
      />
      <label>Введите почту</label>
      <FormItem
          id="email"
          placeholder="Введите почту"
          type="text"
          :value="inputData.email"
          @change="(event) => onInputChange('email', event)"
      />
      <label>Введите пароль</label>
      <FormItem
          id="password"
          placeholder="Введите пароль"
          type="password"
          :value="inputData.password"
          @change="(event) => onInputChange('password', event)"
      />
      <Button class="btn btn-success" @submit.prevent="onSubmit" type="submit">Регистрация</Button>
    </Form>
  </main>
</template>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
button{
  margin-top: 20px;
}
</style>
