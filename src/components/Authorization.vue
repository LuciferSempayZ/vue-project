<script setup>
import {reactive, ref, watch} from "vue";

import Form from "@/components/Form.vue";
import FormItem from "@/components/FormItem.vue";
import Button from "@/components/Button.vue"; // Импорт компонента
import router from "@/router/index.js";
import {authorization} from "@/api/methods/auth/authorization.js";
import {useAuthStore} from "@/stores/auth.js";

const { setToken } = useAuthStore()
const enter = ref(''); // Инициализация переменной
const inputData = reactive({
  email: '',
  password: '',
})

const isLoading = ref(false)

const errors = reactive({
  data: {},
  message: '',
});

const successMessage = ref('');

const onSubmit = async () => {
  isLoading.value = true;

  errors.message = '';
  errors.data = {};

  const data = await authorization(inputData.email, inputData.password);

  isLoading.value = false;

  if (data?.code === 401) {
    alert('Неверный пароль');
  }

  if (data?.code === 404) {
    alert('Такой почты не существует');
  }

  setToken?.(data?.token);
  await router.push({ name: 'Profile' });

  alert('Вы успешно вошли в систему');
};

const onInputChange = (field, event) => {
  const value = event.target.value;

  errors.data[field] = [];
  inputData[field] = value;
};
</script>


<template>
  <main>
    <h1>Вход</h1>
    <Form :submit="onSubmit" method="POST">
      <h3 v-if="errors.message">Неправильные данные для входа</h3>
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

        <Button @submit.prevent="onSubmit" @click="enter" type="submit">Войти</Button>
      </template>
    </Form>
  </main>
</template>
<style>
.success-message {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
