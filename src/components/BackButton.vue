
<template>
  <button @click="goBack" class="back-button">
    Назад
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back(); // Возвращаемся к предыдущему маршруту
    },
  },
};
</script>

<style scoped>
.back-button {
  padding: 0.5rem 1rem; /* Внутренние отступы */
  border: none; /* Убираем границы */
  border-radius: 5px; /* Закругление краев */
  background-color: #007bff; /* Синий фон */
  color: white; /* Белый текст */
  cursor: pointer; /* Указатель мыши */
  transition: all 0.3s ease; /* Плавный переход при наведении */
}

.back-button:hover {
  background-color: #0056b3; /* Темный синий при наведении */
}
</style>
