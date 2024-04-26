<script setup>

</script>

<template>
  <footer>
    <div class="contacts">
      <h2>Контакты</h2>
      <address>
        <p>Адрес: 123 Main Street, Citytown</p>
        <p>Телефон: (123) 456-7890</p>
      </address>
      <div class="social-media">
        <a href="https://instagram.com/bellapizza">Instagram</a>
        <a href="https://facebook.com/bellapizza">Facebook</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%; /* Занимает всю ширину */
  border: 1px solid;
  border-radius: 30px;
  text-align: center; /* Выравниваем текст по центру */
  background: burlywood;
}
.contacts {
  font-size: 12px;
  color: black;
}
.social-media {
  display: flex;
  justify-content: center; /* Центрируем ссылки на соцсети */
  gap: 1rem; /* Отступ между ссылками на соцсети */
  padding-bottom: 10px;
}
.social-media a {
  color: #000000; /* Белый текст для ссылок на соцсети */
  text-decoration: none; /* Без подчеркивания */
}
.social-media a:hover {
  text-decoration: underline; /* Подчеркивание при наведении */
}
</style>